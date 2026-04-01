// Authentication Integration Guide
// Backend API Integration for CIP Portal

## Overview
This document explains the new authentication system integrated with the CIP Portal backend API.

---

## Architecture

### 1. API Layer (`src/lib/api/auth.ts`)
Handles all HTTP requests to the backend authentication endpoints:
- `getNonce(publicKey)` - Get a nonce for wallet signing
- `login(publicKey, signature, message)` - Login with wallet signature
- `getUserInfo(token)` - Fetch authenticated user info
- `updateAccountInfo(token, data)` - Update user account details

**Base URL:** `https://xcip.name.ng`

---

### 2. Auth Context (`src/context/AuthContext.tsx`)
Global state management for authentication:
- Manages user state (publicKey, token, userInfo)
- Handles loading and error states
- Provides methods for all auth operations
- Persists user session

**State:**
```typescript
interface User {
  publicKey: string;
  token: string;
  userInfo?: any;
}
```

**Methods:**
- `loginWithWallet(publicKey, signature, message)` - Login user
- `getNonce(publicKey)` - Get nonce for signing
- `logout()` - Logout user
- `fetchUserInfo()` - Refresh user data
- `updateUserInfo(data)` - Update account info
- `clearError()` - Clear error messages

---

### 3. Custom Hook (`src/context/useAuth.ts`)
Easy access to auth context from any component:
```typescript
const { user, loading, error, isAuthenticated, loginWithWallet, logout } = useAuth();
```

---

### 4. Wallet Utilities (`src/lib/wallet/walletUtils.ts`)
Web3 wallet operations:
- `getPublicKey()` - Get connected wallet account
- `requestWalletConnection()` - Connect wallet (MetaMask, etc.)
- `signMessage(message, account)` - Sign message with wallet

---

### 5. Login Component (`src/screens/Login/Login.tsx`)
Updated to use wallet-based authentication:
1. User connects wallet
2. Click "Sign In" button
3. Get nonce from backend
4. Sign nonce with wallet
5. Submit signature to login
6. Token stored in context
7. Redirect on success

---

## Usage

### For Login Page
```typescript
import { useAuth } from "../../context/useAuth";
import * as walletUtils from "../../lib/wallet/walletUtils";

const LoginComponent = () => {
  const { loginWithWallet, getNonce, loading, error } = useAuth();
  const [account, setAccount] = useState("");

  const handleLogin = async () => {
    const nonce = await getNonce(account);
    const signature = await walletUtils.signMessage(nonce, account);
    await loginWithWallet(account, signature, nonce);
  };

  return (
    // Your JSX here
  );
};
```

### For Protected Components
```typescript
import { useAuth } from "../../context/useAuth";

const ProtectedComponent = () => {
  const { user, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return <div>Please login first</div>;
  }

  return (
    <div>
      <p>Welcome, {user?.publicKey}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};
```

### For Updating User Info
```typescript
const { updateUserInfo, loading, error } = useAuth();

const handleProfileUpdate = async () => {
  try {
    await updateUserInfo({
      full_name: "John Doe",
      country: "Nigeria",
      preferred_chain: "ethereum"
    });
    console.log("Profile updated!");
  } catch (err) {
    console.error("Update failed:", err);
  }
};
```

---

## Flow Diagram

```
1. User → Connect Wallet
   ↓
2. Get Public Key from Wallet
   ↓
3. Send Public Key → Backend GET /auth/nonce
   ↓
4. Receive Nonce
   ↓
5. Sign Nonce with Wallet
   ↓
6. Send (Public Key, Signature, Nonce) → Backend POST /auth/login
   ↓
7. Receive Token
   ↓
8. Store Token in Context
   ↓
9. Redirect to Dashboard
```

---

## Token Management

The token returned from `/auth/login` is automatically:
1. Stored in `user.token`
2. Attached to all authenticated requests via `Authorization: Bearer {token}` header
3. Cleared on logout

---

## Error Handling

All operations include error handling:
```typescript
const { error, clearError } = useAuth();

if (error) {
  return <div className="error">{error}</div>;
}

// Clear errors when needed
clearError();
```

---

## Adding Auth to New Pages

1. Import the hook:
   ```typescript
   import { useAuth } from "../../context/useAuth";
   ```

2. Use in component:
   ```typescript
   const { isAuthenticated, user, logout } = useAuth();
   ```

3. Check authentication:
   ```typescript
   if (!isAuthenticated) {
     return <Redirect to="/login" />;
   }
   ```

---

## Backend Endpoints Reference

### POST /auth/nonce
- **Purpose:** Get nonce for wallet signing
- **Params:** public_key (query)
- **Response:** string (nonce)

### POST /auth/login
- **Purpose:** Login with wallet
- **Params:** public_key, signature, message (all query params)
- **Response:** string (token)

### GET /auth/user-info
- **Purpose:** Get user info
- **Auth:** Required (Bearer token)
- **Response:** User info object

### PATCH /auth/account-info-update
- **Purpose:** Update user info
- **Auth:** Required (Bearer token)
- **Body:** { full_name?, country?, preferred_chain? }
- **Response:** string (confirmation)

---

## File Structure

```
src/
├── lib/
│   ├── api/
│   │   ├── auth.ts          ← API functions
│   │   └── index.ts         ← Exports
│   └── wallet/
│       └── walletUtils.ts   ← Wallet operations
├── context/
│   ├── AuthContext.tsx      ← Context + Provider
│   ├── useAuth.ts           ← Custom hook
│   └── index.ts             ← Exports
└── screens/
    └── Login/
        └── Login.tsx        ← Login UI
```

---

## Next Steps

1. ✅ **Done:** API utility layer
2. ✅ **Done:** Auth context & provider
3. ✅ **Done:** Custom hook
4. ✅ **Done:** Wallet utilities
5. ✅ **Done:** Login component integration
6. ✅ **Done:** App-level provider setup
7. **TODO:** Integrate auth checks in role-specific dashboards
8. **TODO:** Add role-based routing
9. **TODO:** Add persistent session storage (localStorage)
10. **TODO:** Add refresh token logic if backend supports it

---

## Testing

Test the flow manually:
1. Navigate to `/login` (or wherever Login is mounted)
2. Click "Connect Wallet"
3. Approve wallet connection
4. Click "Sign In"
5. Approve message signing in wallet
6. Check console for token in `useAuth()` hook
7. Test `/auth/user-info` call

---

## Troubleshooting

**"Wallet not detected"**
- Install MetaMask or similar Web3 wallet extension

**"Login failed"**
- Check backend API is running at `https://xcip.name.ng/docs`
- Check public key, signature, or nonce format
- Check browser console for detailed error

**"useAuth must be used within an AuthProvider"**
- Ensure AuthProvider wraps your component in the app tree
- Check `src/index.tsx` has AuthProvider wrapping BrowserRouter

---

## Security Notes

- Tokens are stored in memory (context state) - they'll be lost on page refresh
- For persistent login, store token in localStorage (add in future)
- Never store private keys - only signatures
- CORS should be configured on backend
- Use HTTPS in production

---
