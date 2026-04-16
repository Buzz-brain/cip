# DataProtector SDK Integration Guide

## Overview
**DataProtector** is an iExec SDK that simplifies secure data management by providing tools for:
- **Encrypting data** and recording ownership on smart contracts
- **Controlling access** to protected data
- **Granting/Revoking access** to specific users and applications
- **Processing data in TEE** (Trusted Execution Environment - Intel SGX)

## Key Components

### DataProtector Core
The foundational module providing:
- Data encryption with confidentiality and traceability
- Access control management
- Smart contract-based ownership tracking

## Installation

```bash
npm install @iexec/dataprotector
```

**Note:** This is an ESM package. Your project must use ESM too.

## How It Works

### 1. **Protect Data** (protectData)
- User encrypts their sensitive data (e.g., estate documents, beneficiary info)
- Data ownership is recorded on smart contract
- Only the owner can grant access to others
- Returns a `protectedDataAddress` (unique identifier for the protected data)

### 2. **Grant Access** (grantAccess)
- Owner grants a specific user access to protected data
- Owner specifies:
  - **User address**: Who can access the data
  - **iApp (iExec Dapp)**: Which application can process the data
  - **Number of accesses**: How many times the user can access (e.g., 1, 5, unlimited)
- Owner must sign a transaction on blockchain
- User can now access the data within the specified limits

### 3. **Revoke Access** (revokeAccess)
- Owner can remove user access anytime
- User loses access immediately
- Requires blockchain transaction signature

### 4. **Process Protected Data** (processProtectedData)
- Authorized users request to process protected data
- Data is decrypted only within TEE (Trusted Execution Environment)
- Application processes data securely
- Processed results returned without exposing raw data

## Integration Points for Your App

### For Estate/Inheritance Planning:

1. **Profile/Document Storage**
   - When user saves sensitive documents (will, trust documents, assets info)
   - Encrypt with `protectData()`
   - Store `protectedDataAddress` in database

2. **Beneficiary Management**
   - When owner adds beneficiaries and wants them to access specific info
   - Use `grantAccess()` to grant access to beneficiary's wallet address
   - Set access limits (how many times they can view)

3. **Executor Setup**
   - When owner assigns executors
   - Grant executors access to protected documents via `grantAccess()`
   - Executors can access documents in TEE for processing

4. **Guardian Recovery**
   - Guardian data encrypted with `protectData()`
   - Limited access grants via `grantAccess()`
   - Only accessible by recovery process

5. **Document Verification (Executor)**
   - Executors process protected documents in TEE
   - Use `processProtectedData()` to verify authenticity
   - Results processed securely without exposing original documents

## SDK Instantiation

### With Web3 Provider (For Writing/Transactions)
```typescript
import { IExecDataProtectorCore } from '@iexec/dataprotector';

const web3Provider = window.ethereum;
const dataProtectorCore = new IExecDataProtectorCore(web3Provider);
```

### Read-Only (For Reading Protected Data)
```typescript
import { IExecDataProtectorCore } from '@iexec/dataprotector';

const dataProtectorCore = new IExecDataProtectorCore();
```

## Key Methods (API)

| Method | Purpose | Requires Signing | Use Case |
|--------|---------|-----------------|----------|
| `protectData()` | Encrypt and store data on blockchain | Yes | Protect documents, sensitive info |
| `grantAccess()` | Give user access to protected data | Yes | Share with beneficiaries, executors |
| `revokeAccess()` | Remove user access | Yes | Revoke executor permissions |
| `processProtectedData()` | Process data securely in TEE | Yes | Analyze documents securely |
| `getProtectedData()` | Fetch protected data metadata | No | View ownership, access info |

## Suggested Implementation Flow

### 1. Create Service Module
```
src/lib/api/dataProtector.ts
```
- Initialize DataProtector SDK
- Implement wrapper functions for each API call
- Handle blockchain transactions

### 2. Update Auth Context
- Store user's protected data references
- Track which protected documents user has access to

### 3. Create Data Protection Hooks
```
src/lib/hooks/useDataProtector.ts
```
- `useProtectData()` - Encrypt documents
- `useGrantAccess()` - Share documents with others
- `useRevokeAccess()` - Remove access

### 4. Update Components
- **Profile Setup**: Protect stored documents
- **Beneficiary Management**: Grant access to beneficiaries
- **Executor Assignment**: Grant executor access
- **Document Viewer**: Load and display protected documents

### 5. Create Protected Data UI
- View protected documents list
- Grant/revoke access controls
- Access logs (who accessed what, when)

## Next Steps

1. **Review Full API Documentation**
   - Check `protectData()` method signature
   - Check `grantAccess()` method signature
   - Check `processProtectedData()` method signature

2. **Set Up Development**
   - Install package
   - Create data protection service module
   - Test with sandbox

3. **Implement Core Features**
   - Document protection on profile save
   - Access grants on beneficiary/executor assignment
   - Access revocation on role removal

4. **Testing**
   - Use CodeSandbox provided by iExec
   - Test on iExec testnet

## Important Notes

- **TEE Processing**: Data processed only in Intel SGX Trusted Execution Environment
- **Blockchain Required**: All operations require blockchain transactions
- **Gas Fees**: Will incur gas costs for protection, granting, revoking
- **Access Control**: Granular control - specify exact number of accesses per user
- **Experimental**: TDX (Intel Trusted Domain Extensions) available but experimental

---

**Documentation**: https://docs.iex.ec/references/dataProtector
**Sandbox**: https://codesandbox.io/p/github/iExecBlockchainComputing/dataprotector-sandbox/main
