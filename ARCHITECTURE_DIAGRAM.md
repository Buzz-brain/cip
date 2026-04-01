# Architecture Diagram

## Component Hierarchy & Data Flow

```
App (src/index.tsx)
  └─ AuthProvider (src/context/AuthContext.tsx)
      └─ BrowserRouter
          └─ Routes
              ├─ Route: /login
              │   └─ Login Component
              │       ├─ Uses: useAuth hook
              │       ├─ Uses: walletUtils
              │       └─ Calls: authAPI functions
              │
              ├─ Route: /executor-dashboard
              │   └─ ProtectedRoute
              │       └─ ExecutorDashboard Component
              │           ├─ Uses: useAuth hook
              │           └─ Shows: user data from context
              │
              ├─ Route: /mediator-dashboard
              │   └─ ProtectedRoute
              │       └─ MediatorDashboard Component
              │
              └─ Route: /enterprise-dashboard
                  └─ ProtectedRoute
                      └─ EnterpriseDashboard Component
```

---

## Module Dependencies

```
Login Component (UI)
  ├─ imports useAuth hook
  │   └─ accesses AuthContext
  │       ├─ uses authAPI functions
  │       │   └─ makes HTTP calls to backend
  │       │       └─ https://xcip.name.ng/auth/*
  │       │
  │       └─ uses localStorage
  │           └─ persists user data
  │
  └─ imports walletUtils
      └─ calls window.ethereum
          └─ MetaMask/Web3 wallet
```

---

## API Call Sequence

```
1. User clicks "Connect Wallet"
   └─ walletUtils.requestWalletConnection()
       └─ window.ethereum.request({ method: "eth_requestAccounts" })
           └─ MetaMask popup appears
               └─ User approves connection
                   └─ Returns: [account_address]

2. User clicks "Sign In"
   ├─ authAPI.getNonce(publicKey)
   │   └─ POST https://xcip.name.ng/auth/nonce?public_key=***
   │       └─ Backend returns: nonce string
   │
   ├─ walletUtils.signMessage(nonce, account)
   │   └─ window.ethereum.request({ method: "personal_sign", params: [nonce, account] })
   │       └─ MetaMask popup appears
   │           └─ User approves signature
   │               └─ Returns: signature string
   │
   ├─ authAPI.login(publicKey, signature, nonce)
   │   └─ POST https://xcip.name.ng/auth/login?public_key=***&signature=***&message=***
   │       └─ Backend returns: token string
   │
   ├─ AuthContext stores: { publicKey, token, userInfo }
   │   └─ context state updated
   │   └─ localStorage updated
   │
   └─ authAPI.getUserInfo(token)
       └─ GET https://xcip.name.ng/auth/user-info
           └─ Headers: Authorization: Bearer ***
               └─ Backend returns: user info object
                   └─ AuthContext.userInfo updated

3. Component redirects to dashboard
   └─ <ProtectedRoute> checks isAuthenticated
       └─ Allows access if user exists
```

---

## State Management Flow

```
AuthContext State:
{
  user: {
    publicKey: "0x1234...",
    token: "eyJhbGc...",
    userInfo: {
      id: "user_123",
      role: "executor",
      full_name: "John Doe",
      country: "Nigeria",
      preferred_chain: "ethereum"
    }
  },
  isAuthenticated: true,
  loading: false,
  error: null
}
  │
  ├─ Persisted to: localStorage.setItem('cip_auth_user', JSON.stringify(user))
  │
  ├─ Available to: All components via useAuth() hook
  │
  └─ Updated by:
      ├─ loginWithWallet() → sets user + token
      ├─ logout() → clears user
      ├─ updateUserInfo() → updates user.userInfo
      └─ fetchUserInfo() → refreshes user.userInfo
```

---

## File Structure

```
src/
├── index.tsx (UPDATED)
│   └─ Wrapped with <AuthProvider>
│
├── lib/
│   ├── api/
│   │   ├── auth.ts (NEW)
│   │   │   ├─ getNonce()
│   │   │   ├─ login()
│   │   │   ├─ getUserInfo()
│   │   │   └─ updateAccountInfo()
│   │   └─ index.ts (NEW)
│   │
│   └── wallet/
│       └── walletUtils.ts (NEW)
│           ├─ requestWalletConnection()
│           ├─ getPublicKey()
│           └─ signMessage()
│
├── context/
│   ├── AuthContext.tsx (NEW)
│   │   ├─ AuthProvider component
│   │   ├─ AuthContext definition
│   │   └─ localStorage integration
│   │
│   ├── useAuth.ts (NEW)
│   │   └─ Custom hook for context access
│   │
│   └── index.ts (NEW)
│       ├─ export AuthProvider
│       ├─ export useAuth
│       └─ export AuthContextType
│
├── components/
│   └── ProtectedRoute.tsx (NEW)
│       └─ Route wrapper for auth-required pages
│
└── screens/
    └── Login/
        └── Login.tsx (UPDATED)
            └─ Now uses wallet-based auth
```

---

## Usage Patterns

### Pattern 1: Simple Auth Check
```typescript
const { isAuthenticated } = useAuth();

if (!isAuthenticated) {
  return <Redirect to="/login" />;
}
```

### Pattern 2: Access User Data
```typescript
const { user } = useAuth();

console.log(user?.publicKey);      // Wallet address
console.log(user?.token);           // JWT token
console.log(user?.userInfo?.role);  // User role
```

### Pattern 3: Perform Auth Action
```typescript
const { loginWithWallet, getNonce } = useAuth();

const nonce = await getNonce(publicKey);
const signature = await signMessage(nonce, account);
await loginWithWallet(publicKey, signature, nonce);
```

### Pattern 4: Handle Errors
```typescript
const { error, clearError } = useAuth();

useEffect(() => {
  if (error) {
    showErrorNotification(error);
    clearError(); // Clear after showing
  }
}, [error]);
```

### Pattern 5: Protected Routes
```typescript
<Routes>
  <Route path="/login" element={<Login />} />
  <Route 
    path="/dashboard" 
    element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
  />
</Routes>
```

---

## Security & Best Practices

✅ **Never store private keys** - Only signatures
✅ **Use HTTPS in production** - Secure token transmission
✅ **Validate tokens on backend** - Don't trust client-side validation
✅ **Use Bearer token format** - Standard JWT format
✅ **localStorage for persistence** - Clear on logout
✅ **Error sanitization** - Don't expose backend details
✅ **Loading states** - Prevent double submissions
✅ **Route protection** - Block unauthorized access

---

## Troubleshooting Quick Reference

| Issue | Cause | Solution |
|-------|-------|----------|
| "useAuth must be used within AuthProvider" | Component outside provider | Check AuthProvider wraps app in index.tsx |
| Login button disabled | No wallet connected | Click "Connect Wallet" first |
| "Wallet not detected" | No Web3 wallet installed | Install MetaMask extension |
| Token not saving | localStorage quota exceeded | Clear cache or use in-memory store |
| API 422 error | Invalid parameter format | Check query param encoding |
| CORS error | Backend CORS not configured | Contact backend team |
| User logged out on refresh | localStorage cleared | Check browser privacy settings |

---
