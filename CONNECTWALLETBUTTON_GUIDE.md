// ConnectWalletButton Usage Guide
// Reusable wallet connection and authentication component

## Location
`src/components/ConnectWalletButton.tsx`

---

## What It Does

The ConnectWalletButton component provides:
- ✅ Wallet connection (MetaMask/Web3)
- ✅ Wallet-based login flow
- ✅ Display of connected wallet address
- ✅ User info dropdown with logout
- ✅ Loading and error states
- ✅ Responsive design with variants

---

## Usage

### Basic Usage
```typescript
import { ConnectWalletButton } from "../../components/ConnectWalletButton";

export const MyComponent = () => {
  return (
    <header>
      <ConnectWalletButton />
    </header>
  );
};
```

### With Options
```typescript
<ConnectWalletButton 
  variant="default"          // "default" | "outline" | "ghost"
  showAddress={true}         // Show wallet address when logged in
  compact={false}            // Shorter text for compact spaces
  onLoginSuccess={() => {    // Callback after successful login
    navigate("/dashboard");
  }}
/>
```

### Variants

#### Default (Orange button)
```typescript
<ConnectWalletButton variant="default" />
// Output: Orange button with wallet icon and text
```

#### Outline (Bordered)
```typescript
<ConnectWalletButton variant="outline" />
// Output: Bordered button with orange text
```

#### Ghost (Minimal)
```typescript
<ConnectWalletButton variant="ghost" />
// Output: Minimal button, text only
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | "default" \| "outline" \| "ghost" | "default" | Button style |
| `showAddress` | boolean | true | Show wallet address when logged in |
| `compact` | boolean | false | Use compact text (shorter labels) |
| `onLoginSuccess` | function | undefined | Callback after successful login |

---

## Component States

### Not Authenticated - Connect Wallet Button
```
┌─────────────────────────┐
│ 🔌 Connect Wallet       │
└─────────────────────────┘
```
Clicking shows MetaMask popup to connect wallet.

### Wallet Connected - Login State
```
┌──────────────────────────┐
│ 🔌 0xcb99...7778         │  +  [Sign In]
└──────────────────────────┘
```
Wallet connected, ready to sign in.

### Authenticated - User Info
```
┌──────────────────────────┐
│ 🔌 0xcb99...7778         │
└──────────────────────────┘
    ▼ Click to expand
    
  ┌──────────────────────┐
  │ Connected Account    │
  │ 0xcb99...7778        │
  ├──────────────────────┤
  │ Name                 │
  │ John Doe             │
  ├──────────────────────┤
  │ 🚪 Logout            │
  └──────────────────────┘
```
Click wallet address to show dropdown menu with user info and logout.

---

## Where It's Used

### Updated Locations
- ✅ Onboarding Step One (`/onboarding/step-one`)
- ✅ Profile Setup Form (`/profile-setup`)
- ✅ Dashboard (`/dashboard`)
- ✅ Administrative Dashboard (`/administrative-dashboard`)
- ✅ Plan Creation Flow - Select Assets (`/select-assets`)
- ✅ Guardian Approval (`/guardian-approval`)

### How It's Used
Instead of:
```typescript
<Button onClick={() => navigate("/connect-wallet")}>
  Connect Wallet
</Button>
```

Now it's:
```typescript
<ConnectWalletButton variant="default" showAddress={true} />
```

---

## Features

### 1. Automatic Login Flow
```
Click Button 
  → Connect Wallet 
    → Sign Nonce 
      → Get Token 
        → Display User Info
```

### 2. Error Handling
```typescript
// Errors are displayed in the component
// User sees readable error messages
// No need to handle errors separately
```

### 3. User Dropdown
```typescript
// When logged in, clicking shows:
// - Connected wallet address
// - User name (if set)
// - Logout button
```

### 4. Loading States
```typescript
// Shows "Connecting..." while connecting wallet
// Shows "Signing..." while signing message
// Shows "Sign In" while submitting login
```

---

## Integration Example

### Before (Old Way)
```typescript
// OnboardingFlow/StepOne.tsx

<Button
  onClick={() => navigate("/connect-wallet")}
  className="gap-2 rounded-lg bg-[#ff6600] px-4 py-[7px]"
>
  <img src={connectWallet} alt="Wallet" />
  <span>Connect Wallet</span>
</Button>
```

### After (New Way)
```typescript
// OnboardingFlow/StepOne.tsx
import { ConnectWalletButton } from "../../components/ConnectWalletButton";

<ConnectWalletButton 
  variant="default"
  showAddress={true}
  onLoginSuccess={() => navigate("/onboarding/step-two")}
/>
```

---

## Styling

### Custom Styling
If you need to customize the appearance:

```typescript
<div className="custom-wrapper">
  <ConnectWalletButton variant="outline" compact={true} />
</div>
```

The component uses Tailwind CSS classes, so you can adjust spacing, sizing, etc. with wrapper divs.

---

## Benefits

✅ **DRY (Don't Repeat Yourself)**
- Single component used everywhere
- No duplicate logic

✅ **Consistency**
- Same behavior across all pages
- Unified user experience

✅ **Maintainability**
- Change behavior in one place
- All pages updated automatically

✅ **Scalability**
- Easy to add new pages with wallet auth
- Easy to modify wallet logic

✅ **Better UX**
- User can login from anywhere
- Consistent error handling
- Automatic user info display

---

## Troubleshooting

### Button not showing address after login?
```typescript
// Make sure showAddress is true:
<ConnectWalletButton showAddress={true} />
```

### Dropdown menu not opening?
```typescript
// The dropdown opens when clicking the wallet address
// Only visible when user is authenticated
```

### onLoginSuccess not firing?
```typescript
// Make sure callback is defined:
onLoginSuccess={() => {
  console.log("Login successful!");
  navigate("/dashboard");
}}
```

### Component styles not matching?
```typescript
// Try adjusting the variant:
<ConnectWalletButton variant="default" />  // Orange button
<ConnectWalletButton variant="outline" />  // Bordered
<ConnectWalletButton variant="ghost" />    // Minimal
```

---

## Future Enhancements

Potential improvements:
- [ ] Support for multiple wallet providers (currently MetaMask only)
- [ ] Wallet balance display
- [ ] Multiple account support
- [ ] Custom user menu items
- [ ] Toast notifications for errors
- [ ] Session timeout warnings

---

## Related Files

- Auth Context: `src/context/AuthContext.tsx`
- Auth Hook: `src/context/useAuth.ts`
- Wallet Utils: `src/lib/wallet/walletUtils.ts`
- API Layer: `src/lib/api/auth.ts`
- Protected Routes: `src/components/ProtectedRoute.tsx`

---
