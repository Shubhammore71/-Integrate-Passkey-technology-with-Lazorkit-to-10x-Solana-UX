Learn how Lazorkit handles session persistence, allowing users to stay connected across page reloads and browser sessions.

## What You'll Learn

- How session persistence works
- Implement auto-reconnection
- Manage wallet state
- Handle session expiration

## How Sessions Work

Unlike traditional wallets that require re-connection on every page load, Lazorkit automatically:

1. **Stores Session Data**: Encrypted session info saved locally
2. **Auto-Reconnects**: On page load, checks for existing session
3. **Validates Credential**: Ensures passkey is still valid
4. **Restores State**: Smart wallet address and account data restored

## Step 1: Understanding Auto-Reconnection

When your app loads, Lazorkit automatically attempts reconnection:

```typescript
export function App() {
  const { isConnected, isConnecting, account } = useWallet();

  useEffect(() => {
    console.log('Connection status:', {
      isConnected,
      isConnecting,
      hasAccount: !!account,
    });
  }, [isConnected, isConnecting, account]);

  if (isConnecting) {
    return <div>Reconnecting wallet...</div>;
  }

  return (
    <div>
      {isConnected ? 'Connected!' : 'Disconnected'}
    </div>
  );
}
Key States:

isConnecting: True during initial reconnection attempt

isConnected: True once wallet is connected

account: Contains wallet data when connected

Step 2: Create Session Status Component
typescript
Copy code
'use client';

import { useWallet } from '@lazorkit/wallet';
import { useEffect, useState } from 'react';

export function SessionStatus() {
  const { isConnected, account } = useWallet();
  const [sessionStart, setSessionStart] = useState<Date | null>(null);
  const [duration, setDuration] = useState('0s');

  useEffect(() => {
    if (isConnected && !sessionStart) {
      setSessionStart(new Date());
    } else if (!isConnected) {
      setSessionStart(null);
      setDuration('0s');
    }
  }, [isConnected]);

  useEffect(() => {
    if (!sessionStart) return;

    const interval = setInterval(() => {
      const now = new Date();
      const diff = Math.floor(
        (now.getTime() - sessionStart.getTime()) / 1000
      );
      setDuration(`${Math.floor(diff / 60)}m ${diff % 60}s`);
    }, 1000);

    return () => clearInterval(interval);
  }, [sessionStart]);

  return (
    <div>
      <h3>Session Status</h3>
      <p>Status: {isConnected ? 'Active' : 'Inactive'}</p>
      {isConnected && (
        <>
          <p>Duration: {duration}</p>
          <p>Credential: {account?.credentialId}</p>
          <p>Started: {sessionStart?.toLocaleString()}</p>
        </>
      )}
    </div>
  );
}
Step 3: Handle Page Reload
Test session persistence:

typescript
Copy code
export function ReloadTest() {
  const { isConnected, smartWalletPubkey } = useWallet();

  return (
    <div>
      <p>Wallet: {smartWalletPubkey?.toString() || 'Not connected'}</p>
      <button onClick={() => window.location.reload()}>
        Reload Page
      </button>
      <p>
        {isConnected 
          ? '✅ Wallet will auto-reconnect after reload!' 
          : '❌ Connect wallet first'}
      </p>
    </div>
  );
}
Expected Behavior:

Connect wallet

Click "Reload Page"

Page reloads

Wallet automatically reconnects

No biometric prompt needed!

Step 4: Implementing Manual Reconnect
Sometimes you need to force a reconnection:

typescript
Copy code
export function ManualReconnect() {
  const { connect, isConnected, isConnecting } = useWallet();
  const [error, setError] = useState<string | null>(null);

  const handleReconnect = async () => {
    setError(null);
    try {
      await connect();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Reconnection failed');
    }
  };

  if (isConnected) {
    return <p>Already connected!</p>;
  }

  return (
    <div>
      <button onClick={handleReconnect} disabled={isConnecting}>
        {isConnecting ? 'Reconnecting...' : 'Reconnect Wallet'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
Step 5: Session Data Management
Access session information:

typescript
Copy code
export function SessionInfo() {
  const { account, smartWalletPubkey } = useWallet();

  return (
    <div>
      <h3>Session Details</h3>
      {account && (
        <>
          <p><strong>Credential ID:</strong></p>
          <code>{account.credentialId}</code>

          <p><strong>Smart Wallet:</strong></p>
          <code>{smartWalletPubkey?.toString()}</code>

          <p><strong>Created:</strong></p>
          <p>{new Date(account.createdAt || Date.now()).toLocaleString()}</p>
        </>
      )}
    </div>
  );
}
Step 6: Handle Session Expiration
Sessions can expire for various reasons:

typescript
Copy code
export function SessionMonitor() {
  const { isConnected, error } = useWallet();
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    if (error?.message.includes('expired') || 
        error?.message.includes('invalid')) {
      setShowWarning(true);
    }
  }, [error]);

  if (showWarning) {
    return (
      <div className="warning">
        <p>⚠️ Your session has expired. Please reconnect.</p>
        <button onClick={() => window.location.reload()}>
          Reconnect
        </button>
      </div>
    );
  }
  return null;
}
Step 7: Cross-Tab Synchronization
Handle wallet state across multiple tabs:

typescript
Copy code
export function CrossTabSync() {
  const { isConnected, disconnect } = useWallet();

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'lazorkit_session' && !e.newValue) {
        window.location.reload();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleDisconnectAll = async () => {
    await disconnect();
    localStorage.removeItem('lazorkit_session');
  };

  return (
    <button onClick={handleDisconnectAll}>
      Disconnect All Tabs
    </button>
  );
}
Testing Session Persistence
Test 1: Page Reload
Connect wallet

Reload page (F5 or Cmd+R)

Expected: Wallet reconnects automatically

Test 2: Close & Reopen Browser
Connect wallet

Close browser completely

Reopen and navigate to app

Expected: Wallet reconnects (may vary by browser)

Test 3: Multiple Tabs
Connect wallet in Tab A

Open app in Tab B

Expected: Both tabs show connected state

Test 4: Disconnect Propagation
Open app in two tabs

Disconnect in Tab A

Expected: Tab B also shows disconnected

Common Issues & Solutions
Issue: Wallet doesn't reconnect after reload
typescript
Copy code
useEffect(() => {
  console.log('Checking session...');
  const hasSession = localStorage.getItem('lazorkit_session');
  console.log('Session exists:', !!hasSession);
}, []);
Issue: "Credential not found" after reconnect
typescript
Copy code
const handleError = (error: Error) => {
  if (error.message.includes('credential')) {
    alert('Passkey not found. Please create a new wallet.');
    localStorage.clear();
  }
};
Issue: Multiple reconnection attempts
typescript
Copy code
const { connect, isConnecting, isConnected } = useWallet();

useEffect(() => {
  if (!isConnected && !isConnecting) {
    connect().catch(console.error);
  }
}, []);
Best Practices
typescript
Copy code
if (isConnecting) return <Spinner />;
if (error) return <ErrorMessage error={error} onRetry={connect} />;
<button onClick={connect}>Reconnect</button>;
const logout = async () => { await disconnect(); localStorage.clear(); sessionStorage.clear(); };
Advanced: Custom Session Storage
typescript
Copy code
import { useEffect } from 'react';
import { useWallet } from '@lazorkit/wallet';

export function CustomSessionManager() {
  const { isConnected, account } = useWallet();

  useEffect(() => {
    if (isConnected && account) {
      const sessionData = {
        walletAddress: account.smartWallet,
        connectedAt: new Date().toISOString(),
        userPreferences: {},
      };
      sessionStorage.setItem('custom_session', JSON.stringify(sessionData));
    }
  }, [isConnected, account]);

  return null;
}
Security Considerations
Never store private keys; Lazorkit handles all key management

Session data is encrypted

Sessions expire automatically after inactivity

Passkeys are device-bound

Next Steps
✅ Passkey wallet creation

✅ Gasless transactions

✅ Session persistence

Explore token swaps, multi-signature transactions, custom program interactions

Complete Code
src/components/features/SessionDemo.tsx

src/hooks/useWalletInfo.ts

Resources
Lazorkit Session Docs

WebAuthn Credential Management

Browser Storage APIs
