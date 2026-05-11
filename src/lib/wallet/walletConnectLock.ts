/**
 * WalletConnect Global Connection Lock Manager
 * 
 * Prevents simultaneous WalletConnect connection attempts and manages
 * connection state globally to avoid race conditions on mobile.
 * 
 * This is critical for mobile stability because:
 * - Only ONE WalletConnect modal/session should exist at a time
 * - Multiple attempts can cause core/relayer failures
 * - App switching (browser → wallet → browser) can trigger duplicate connects
 */

export type ConnectionState = 'idle' | 'connecting' | 'connected' | 'error' | 'disconnecting';

interface ConnectionLockState {
  state: ConnectionState;
  sessionId: string | null;
  retryCount: number;
  lastErrorTime: number | null;
  lastError: string | null;
  startTime: number | null;
}

/**
 * Global connection lock - ensures only one WalletConnect session at a time
 */
class WalletConnectLock {
  private static instance: WalletConnectLock;
  
  private state: ConnectionLockState = {
    state: 'idle',
    sessionId: null,
    retryCount: 0,
    lastErrorTime: null,
    lastError: null,
    startTime: null,
  };

  private listeners = new Set<(state: ConnectionLockState) => void>();
  private disconnectPromise: Promise<void> | null = null;
  private disconnectResolve: (() => void) | null = null;

  private constructor() {}

  /**
   * Get singleton instance
   */
  static getInstance(): WalletConnectLock {
    if (!WalletConnectLock.instance) {
      WalletConnectLock.instance = new WalletConnectLock();
    }
    return WalletConnectLock.instance;
  }

  /**
   * Get current connection state
   */
  getState(): Readonly<ConnectionLockState> {
    return Object.freeze({ ...this.state });
  }

  /**
   * Subscribe to state changes
   */
  subscribe(listener: (state: ConnectionLockState) => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  /**
   * Try to acquire connection lock for a new connection attempt
   * Returns true if lock acquired, false if another attempt is in progress
   */
  tryAcquire(): boolean {
    if (this.state.state === 'connecting' || this.state.state === 'connected') {
      console.warn('[WalletConnectLock] ❌ Cannot acquire lock - already in state:', this.state.state);
      return false;
    }

    // Check if we're in backoff/cooldown after error
    if (this.state.state === 'error' && this.state.lastErrorTime) {
      const backoffMs = this.getBackoffMs();
      const timeSinceError = Date.now() - this.state.lastErrorTime;
      if (timeSinceError < backoffMs) {
        console.warn(`[WalletConnectLock] ⏳ In backoff period. Wait ${Math.ceil((backoffMs - timeSinceError) / 1000)}s before retry`);
        return false;
      }
    }

    this.setState('connecting');
    this.state.sessionId = `wc_${Date.now()}_${Math.random()}`;
    this.state.startTime = Date.now();
    this.state.retryCount += 1;

    console.log(`[WalletConnectLock] ✅ Lock acquired. Session: ${this.state.sessionId}, Attempt: ${this.state.retryCount}`);
    return true;
  }

  /**
   * Mark connection as successfully established
   */
  markConnected(): void {
    if (this.state.state !== 'connecting') {
      console.warn('[WalletConnectLock] markConnected called in state:', this.state.state);
    }

    this.setState('connected');
    this.state.lastError = null;
    this.state.lastErrorTime = null;
    this.state.retryCount = 0;

    const duration = this.state.startTime ? Date.now() - this.state.startTime : 0;
    console.log(`[WalletConnectLock] 🎉 Connected in ${duration}ms`);
  }

  /**
   * Mark connection as failed with error
   * Triggers backoff period before retry is allowed
   */
  markError(error: string | Error): void {
    const errorMsg = error instanceof Error ? error.message : String(error);

    this.setState('error');
    this.state.lastError = errorMsg;
    this.state.lastErrorTime = Date.now();

    const backoffMs = this.getBackoffMs();
    console.error(`[WalletConnectLock] ❌ Connection failed: ${errorMsg}`);
    console.log(`[WalletConnectLock] ⏳ Backoff: ${Math.ceil(backoffMs / 1000)}s before retry allowed`);
  }

  /**
   * Start disconnecting
   */
  startDisconnect(): void {
    if (this.state.state === 'disconnecting') return;

    this.setState('disconnecting');
    console.log(`[WalletConnectLock] 🔌 Starting disconnect...`);

    // Create a promise that resolves when disconnect completes
    this.disconnectPromise = new Promise(resolve => {
      this.disconnectResolve = resolve;
    });
  }

  /**
   * Wait for disconnect to complete
   */
  async waitForDisconnect(): Promise<void> {
    if (this.state.state !== 'disconnecting') {
      return;
    }
    if (this.disconnectPromise) {
      await this.disconnectPromise;
    }
  }

  /**
   * Complete disconnect and reset to idle
   */
  completeDisconnect(): void {
    this.setState('idle');
    this.state.sessionId = null;
    this.state.startTime = null;
    this.state.retryCount = 0;

    console.log('[WalletConnectLock] ✅ Disconnect complete - ready for new connection');

    if (this.disconnectResolve) {
      this.disconnectResolve();
      this.disconnectResolve = null;
      this.disconnectPromise = null;
    }
  }

  /**
   * Hard reset to idle state (used for emergency cleanup)
   */
  hardReset(): void {
    console.log('[WalletConnectLock] 🔄 Hard reset - clearing all state');
    this.state = {
      state: 'idle',
      sessionId: null,
      retryCount: 0,
      lastErrorTime: null,
      lastError: null,
      startTime: null,
    };
    this.notifyListeners();

    if (this.disconnectResolve) {
      this.disconnectResolve();
      this.disconnectResolve = null;
      this.disconnectPromise = null;
    }
  }

  /**
   * Is current state idle (can attempt new connection)?
   */
  isIdle(): boolean {
    return this.state.state === 'idle';
  }

  /**
   * Is connection in progress?
   */
  isConnecting(): boolean {
    return this.state.state === 'connecting';
  }

  /**
   * Is currently connected?
   */
  isConnected(): boolean {
    return this.state.state === 'connected';
  }

  /**
   * Get current session ID (for tracking/debugging)
   */
  getSessionId(): string | null {
    return this.state.sessionId;
  }

  /**
   * Get current retry count
   */
  getRetryCount(): number {
    return this.state.retryCount;
  }

  /**
   * Get time in milliseconds to wait before next retry is allowed
   * Exponential backoff: 2s, 4s, 8s, 16s, max 60s
   */
  private getBackoffMs(): number {
    const baseMs = 2000; // 2 seconds
    const maxMs = 60000; // 60 seconds
    const backoff = baseMs * Math.pow(2, Math.max(0, this.state.retryCount - 1));
    return Math.min(backoff, maxMs);
  }

  /**
   * Private: update state and notify listeners
   */
  private setState(newState: ConnectionState): void {
    if (this.state.state === newState) return;
    this.state.state = newState;
    this.notifyListeners();
  }

  /**
   * Private: notify all listeners of state change
   */
  private notifyListeners(): void {
    const frozen = Object.freeze({ ...this.state });
    this.listeners.forEach(listener => {
      try {
        listener(frozen);
      } catch (err) {
        console.error('[WalletConnectLock] Listener error:', err);
      }
    });
  }
}

export const walletConnectLock = WalletConnectLock.getInstance();
