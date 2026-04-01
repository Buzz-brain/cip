# Testing & Verification Checklist

## Pre-Test Setup

- [ ] Metamask (or Web3 wallet) installed in browser
- [ ] Test wallet account created with some test funds
- [ ] Backend API running at https://xcip.name.ng/docs
- [ ] Frontend dev server running (`npm run dev` or similar)
- [ ] No console errors on app load

---

## Login Flow Testing

### Step 1: Navigate to Login Page
- [ ] Open browser and go to `/login` route
- [ ] See "Connect your wallet..." heading
- [ ] See "Connect Wallet" button
- [ ] No errors in browser console

### Step 2: Connect Wallet
- [ ] Click "Connect Wallet" button
- [ ] Metamask popup appears
- [ ] Select test account
- [ ] Click "Connect" in Metamask
- [ ] Button shows "Connecting..." then changes to account address
- [ ] See green dot and account address like "0x1234...5678"
- [ ] See "Disconnect" option appears

### Step 3: Login with Wallet
- [ ] Click "Sign In" button
- [ ] Metamask popup appears asking to sign message
- [ ] Message should contain the nonce from backend
- [ ] Click "Sign" in Metamask
- [ ] Button shows "Signing in..." then completes
- [ ] No error message appears
- [ ] User is redirected (should call onLoginSuccess)

### Step 4: Verify User Data
- [ ] Open browser DevTools → Console
- [ ] Create test component:
  ```typescript
  import { useAuth } from "../../context/useAuth";
  
  const TestComponent = () => {
    const { user } = useAuth();
    console.log("User:", user);
    return <div>Check console</div>;
  };
  ```
- [ ] See `user` object with `publicKey` and `token`
- [ ] See `userInfo` populated
- [ ] Token should start with "eyJ" (JWT format)

### Step 5: Verify localStorage Persistence
- [ ] In DevTools → Application → Local Storage
- [ ] Look for key: `cip_auth_user`
- [ ] Value should contain publicKey, token, userInfo
- [ ] Refresh page
- [ ] User should still be logged in
- [ ] No reconnect wallet needed

### Step 6: Test Logout
- [ ] Find logout button or add one temporarily:
  ```typescript
  const { logout } = useAuth();
  return <button onClick={logout}>Logout</button>;
  ```
- [ ] Click logout
- [ ] User redirected to login
- [ ] localStorage key should be removed
- [ ] Refresh page
- [ ] Still on login page (not logged in)

---

## API Integration Testing

### Test /auth/nonce
- [ ] In browser console:
  ```typescript
  import * as authAPI from './lib/api/auth';
  authAPI.getNonce('0x1234...your_address')
    .then(nonce => console.log('Nonce:', nonce))
    .catch(err => console.error('Error:', err));
  ```
- [ ] See nonce string returned
- [ ] Different nonce on each call

### Test /auth/login
- [ ] Requires signed message from previous nonce
- [ ] Verify signature is correct:
  ```typescript
  const nonce = await authAPI.getNonce(account);
  const sig = await walletUtils.signMessage(nonce, account);
  const token = await authAPI.login(account, sig, nonce)
    .then(token => console.log('Token:', token))
    .catch(err => console.error('Error:', err));
  ```
- [ ] See token returned

### Test /auth/user-info
- [ ] Requires valid token:
  ```typescript
  authAPI.getUserInfo(token)
    .then(info => console.log('User Info:', info))
    .catch(err => console.error('Error:', err));
  ```
- [ ] See user info object
- [ ] Should include role, name, country fields

### Test /auth/account-info-update
- [ ] Update user profile:
  ```typescript
  authAPI.updateAccountInfo(token, {
    full_name: "Test User",
    country: "Nigeria",
    preferred_chain: "ethereum"
  })
    .then(res => console.log('Updated:', res))
    .catch(err => console.error('Error:', err));
  ```
- [ ] See success response
- [ ] Fetch user-info again to verify update

---

## Component Integration Testing

### Test useAuth Hook
- [ ] Component can import and use hook:
  ```typescript
  import { useAuth } from "../../context/useAuth";
  
  const TestComponent = () => {
    const { user, loading, error, isAuthenticated, logout } = useAuth();
    // Should not throw error
    return <div>Logged in: {isAuthenticated ? 'yes' : 'no'}</div>;
  };
  ```
- [ ] No "useAuth must be used within AuthProvider" error

### Test ProtectedRoute Component
- [ ] Create test route:
  ```typescript
  <Route 
    path="/protected-test" 
    element={<ProtectedRoute><div>Protected Content</div></ProtectedRoute>}
  />
  ```
- [ ] Navigate to `/protected-test` while NOT logged in
- [ ] Redirected to `/login`
- [ ] Login successfully
- [ ] Navigate to `/protected-test`
- [ ] See "Protected Content"
- [ ] Logout
- [ ] Navigate to `/protected-test`
- [ ] Redirected to `/login` again

### Test Error Handling
- [ ] Disconnect wallet internet temporarily
- [ ] Try to login
- [ ] See error message displayed
- [ ] Error is user-friendly (not raw API errors)
- [ ] Can retry login

---

## Network Request Testing

### Using Browser DevTools Network Tab

- [ ] Open DevTools → Network tab
- [ ] Filter by XHR/Fetch
- [ ] Connect wallet and login
- [ ] See requests to `https://xcip.name.ng/auth/*`:
  - [ ] GET /auth/nonce?public_key=...
  - [ ] POST /auth/login?public_key=...&signature=...&message=...
  - [ ] GET /auth/user-info (with Authorization header)
- [ ] Verify request headers:
  - [ ] `Authorization: Bearer {token}` on user-info request
  - [ ] `Accept: application/json` on all requests
- [ ] Verify response status:
  - [ ] 200 OK on successful requests
  - [ ] 422 on validation errors

---

## Edge Case Testing

### Test Case 1: Invalid Signature
- [ ] Manually modify signature in login:
  ```typescript
  const badSig = "0x" + "0".repeat(130); // Invalid sig
  await authAPI.login(account, badSig, nonce);
  ```
- [ ] See error message
- [ ] Can retry and login correctly

### Test Case 2: Expired Nonce
- [ ] Get nonce, wait, get new nonce
- [ ] Try to login with old nonce
- [ ] Backend should reject with error
- [ ] Error displayed to user

### Test Case 3: Multiple Browser Tabs
- [ ] Open app in 2 tabs
- [ ] Login in tab 1
- [ ] Refresh tab 2
- [ ] User should be logged in (localStorage synced)

### Test Case 4: Switch Accounts
- [ ] Login with account A
- [ ] Logout
- [ ] Login with account B
- [ ] Should work without issues with different publicKey

### Test Case 5: Browser Close & Reopen
- [ ] Login successfully
- [ ] Close all tabs
- [ ] Close browser completely
- [ ] Reopen app
- [ ] User should be logged in (localStorage persists)

---

## Performance Testing

- [ ] Login takes less than 5 seconds
- [ ] No unnecessary API calls
- [ ] Network tab shows only expected requests
- [ ] Memory usage doesn't leak on repeated logins/logouts
- [ ] No console warnings about React

---

## Security Testing

- [ ] Private key never appears in logs
- [ ] Token never appears in URL
- [ ] localStorage not cleared by accident
- [ ] CORS headers working correctly
- [ ] No sensitive data in error messages

---

## Final Verification

- [ ] All files created (no 404s)
- [ ] No TypeScript errors
- [ ] No console errors on app load
- [ ] Can complete login flow start to finish
- [ ] Can logout and login again
- [ ] Session persists on refresh
- [ ] Protected routes work correctly
- [ ] Error messages are user-friendly

---

## Common Issues & Solutions

| Symptom | Likely Cause | Solution |
|---------|-------------|----------|
| 404 on auth API calls | Backend not running | Check https://xcip.name.ng/docs is accessible |
| "Wallet not detected" | MetaMask not installed | Install MetaMask browser extension |
| CORS error in console | Backend CORS not configured | Contact backend team, check AllowOrigins |
| useAuth error | App not wrapped with AuthProvider | Check src/index.tsx |
| Blank error message | API error not caught properly | Check browser console network tab |
| User logged out after refresh | localStorage disabled | Check browser settings |
| Nonce/signature format errors | Wrong parameter encoding | Check auth.ts URL encoding |

---

## Success Criteria

✅ **You know it's working when:**

1. Can successfully connect wallet
2. Can successfully login with signature
3. Token is stored and persisted
4. Can access user info after login
5. Protected routes redirect when not logged in
6. Protected routes work when logged in
7. Logout clears session
8. No console errors
9. All 4 endpoints responding correctly
10. Ready to integrate into dashboards

---

## Next Action Items

After verification passes:

1. [ ] Integrate auth into Executor Dashboard
2. [ ] Integrate auth into Mediator Dashboard
3. [ ] Integrate auth into Enterprise Dashboard
4. [ ] Integrate auth into other role dashboards
5. [ ] Add role detection and routing
6. [ ] Add logout buttons to dashboards
7. [ ] Add profile update components
8. [ ] Add error boundary for better error handling
9. [ ] Test with real backend user data
10. [ ] Deploy to staging environment

---

Good luck! 🚀
