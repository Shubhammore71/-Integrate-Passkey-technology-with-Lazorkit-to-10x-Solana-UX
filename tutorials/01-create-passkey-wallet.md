# Tutorial 1: Create a Passkey Wallet

Learn how to integrate passkey authentication with Lazorkit SDK and create a smart wallet on Solana without seed phrases.

## What You'll Learn

- Set up Lazorkit Provider
- Implement passkey wallet creation
- Handle wallet connection states
- Display wallet information

## Prerequisites

- Basic React/Next.js knowledge
- Understanding of Solana basics
- WebAuthn-capable browser

## Step 1: Set Up the Provider

First, wrap your app with `LazorkitProvider`:
```typescript
// src/app/providers.tsx
'use client';

import { LazorkitProvider } from '@lazorkit/wallet';
import { Buffer } from 'buffer';
import { useEffect } from 'react';

export function AppProviders({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window !== 'undefined' && !window.Buffer) {
      window.Buffer = Buffer;
    }
  }, []);

  return (
    <LazorkitProvider
      rpcUrl="https://api.devnet.solana.com"
      portalUrl="https://portal.lazor.sh"
      paymasterUrl="https://kora.devnet.lazorkit.com"
    >
      {children}
    </LazorkitProvider>
  );
}
```

**What's happening here?**

- `rpcUrl`: Solana RPC endpoint (we use Devnet for testing)
- `portalUrl`: Lazorkit's portal for passkey operations
- `paymasterUrl`: Paymaster service for gasless transactions
- `Buffer` polyfill: Required for Solana libraries in browser

## Step 2: Create Wallet Connection Component
```typescript
// src/components/WalletConnect.tsx
'use client';

import { useWallet } from '@lazorkit/wallet';
import { useState } from 'react';

export function WalletConnect() {
  const { 
    connect, 
    disconnect, 
    isConnected, 
    isConnecting,
    smartWalletPubkey 
  } = useWallet();

  const handleConnect = async () => {
    try {
      await connect();
      console.log('Wallet connected!');
    } catch (error) {
      console.error('Connection failed:', error);
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnect();
      console.log('Wallet disconnected');
    } catch (error) {
      console.error('Disconnect failed:', error);
    }
  };

  if (isConnected) {
    return (
      <div>
        <p>Connected: {smartWalletPubkey?.toString()}</p>
        <button onClick={handleDisconnect}>Disconnect</button>
      </div>
    );
  }

  return (
    <button onClick={handleConnect} disabled={isConnecting}>
      {isConnecting ? 'Connecting...' : 'Connect Wallet'}
    </button>
  );
}
```

**Key Points:**

- `useWallet()` hook provides all wallet functionality
- `connect()` triggers the passkey flow
- `isConnected` boolean indicates connection status
- `smartWalletPubkey` is your wallet's public key

## Step 3: Understanding the Connection Flow

When a user clicks "Connect Wallet":

1. **Passkey Creation** (First-time users):
   - Browser prompts for biometric authentication
   - Device creates a new passkey credential
   - Credential is bound to your device's secure enclave
   - Smart wallet is deployed on Solana

2. **Passkey Sign-In** (Returning users):
   - Browser prompts for biometric authentication
   - Existing passkey is used to authenticate
   - Smart wallet is retrieved
   - Session is established

## Step 4: Add Enhanced Features

Let's add balance checking and better UI:
```typescript
import { useEffect, useState } from 'react';
import { Connection, LAMPORTS_PER_SOL } from '@solana/web3.js';

export function EnhancedWalletConnect() {
  const wallet = useWallet();
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    if (wallet.smartWalletPubkey && wallet.isConnected) {
      fetchBalance();
    }
  }, [wallet.smartWalletPubkey, wallet.isConnected]);

  const fetchBalance = async () => {
    if (!wallet.smartWalletPubkey) return;

    const connection = new Connection('https://api.devnet.solana.com');
    const lamports = await connection.getBalance(wallet.smartWalletPubkey);
    setBalance(lamports / LAMPORTS_PER_SOL);
  };

  // ... rest of the component
}
```

## Step 5: Error Handling

Always handle potential errors:
```typescript
const handleConnect = async () => {
  try {
    await connect();
  } catch (error) {
    if (error instanceof Error) {
      // User cancelled the passkey prompt
      if (error.message.includes('abort')) {
        console.log('User cancelled authentication');
      } 
      // Browser doesn't support WebAuthn
      else if (error.message.includes('not supported')) {
        alert('Your browser doesn\'t support passkeys');
      }
      // Other errors
      else {
        console.error('Connection error:', error);
      }
    }
  }
};
```

## Common Issues & Solutions

### Issue: "Buffer is not defined"

**Solution**: Add Buffer polyfill before importing Lazorkit
```typescript
import { Buffer } from 'buffer';
if (typeof window !== 'undefined') {
  window.Buffer = Buffer;
}
```

### Issue: Passkey popup doesn't appear

**Solutions**:
- Ensure you're on HTTPS or localhost
- Check browser console for errors
- Verify WebAuthn support: `navigator.credentials.create`

### Issue: Connection succeeds but no wallet address

**Solution**: Wait for the connection to fully complete:
```typescript
const handleConnect = async () => {
  const result = await connect();
  console.log('Smart Wallet:', result.smartWallet);
};
```

## Testing Your Integration

1. **First Connection**:
   - Click "Connect Wallet"
   - Biometric prompt appears
   - Authenticate
   - Wallet address displays

2. **Reload Page**:
   - Wallet should auto-reconnect
   - No need to re-authenticate

3. **Disconnect & Reconnect**:
   - Disconnect wallet
   - Connect again
   - Should use existing passkey

## Next Steps

Now that you have wallet connection working:
- ✅ Proceed to Tutorial 2: Gasless Transactions
- ✅ Learn how to send SOL without fees
- ✅ Explore multi-instruction transactions

## Complete Code Example

See the full implementation in:
- `src/components/features/WalletConnect.tsx`
- `src/hooks/useWalletInfo.ts`

## Resources

- [Lazorkit Docs](https://docs.lazorkit.com)
- [WebAuthn Guide](https://webauthn.guide)
- [Solana Web3.js](https://solana-labs.github.io/solana-web3.js)
