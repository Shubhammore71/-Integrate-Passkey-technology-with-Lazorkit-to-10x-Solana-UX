# Tutorial 2: Gasless Transactions with Lazorkit

Learn how to send SOL transactions without paying gas fees using Lazorkit's Paymaster service.

## What You'll Learn

- Send gasless SOL transfers
- Configure Paymaster integration
- Sign and submit transactions
- Handle transaction confirmations

## How Gasless Transactions Work

Traditionally, every Solana transaction requires:
1. User must have SOL for rent + fees
2. Fee is deducted from user's account
3. Transaction is processed

With Lazorkit Paymaster:
1. User creates transaction (no SOL needed)
2. Paymaster signs and pays the fee
3. Transaction is processed
4. User pays nothing!

## Step 1: Configure Paymaster

The paymaster is already configured in your provider:
```typescript
<LazorkitProvider
  rpcUrl="https://api.devnet.solana.com"
  portalUrl="https://portal.lazor.sh"
  paymasterUrl="https://kora.devnet.lazorkit.com"  // ← Paymaster config
>
```

## Step 2: Create a Transfer Component
```typescript
'use client';

import { useWallet } from '@lazorkit/wallet';
import { SystemProgram, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { useState } from 'react';

export function SolTransfer() {
  const { signAndSendTransaction, smartWalletPubkey } = useWallet();
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('0.01');
  const [isSending, setIsSending] = useState(false);

  const handleTransfer = async () => {
    if (!smartWalletPubkey) {
      alert('Please connect your wallet first');
      return;
    }

    setIsSending(true);
    try {
      // Create transfer instruction
      const instruction = SystemProgram.transfer({
        fromPubkey: smartWalletPubkey,
        toPubkey: new PublicKey(recipient),
        lamports: parseFloat(amount) * LAMPORTS_PER_SOL,
      });

      // Sign and send (gasless!)
      const signature = await signAndSendTransaction({
        instructions: [instruction],
      });

      console.log('Transaction successful:', signature);
      alert('Transfer successful!');
    } catch (error) {
      console.error('Transfer failed:', error);
      alert('Transfer failed');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        placeholder="Recipient address"
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount (SOL)"
      />
      <button onClick={handleTransfer} disabled={isSending}>
        {isSending ? 'Sending...' : 'Send SOL'}
      </button>
    </div>
  );
}
```

## Step 3: Understanding Transaction Signing

### Method 1: `signAndSendTransaction` (Recommended)

This method handles everything:
- Signs the transaction with your passkey
- Submits to the network
- Returns transaction signature
```typescript
const signature = await signAndSendTransaction({
  instructions: [instruction],
});
```

### Method 2: `signTransaction` (Advanced)

For more control, sign first then send separately:
```typescript
const signedTx = await signTransaction(instruction);
// Do something with signed transaction
// Then submit manually
```

## Step 4: Handle Multiple Instructions

You can batch multiple operations in one transaction:
```typescript
const instructions = [
  // Transfer SOL
  SystemProgram.transfer({
    fromPubkey: smartWalletPubkey,
    toPubkey: recipient,
    lamports: 0.01 * LAMPORTS_PER_SOL,
  }),
  // Add memo
  new TransactionInstruction({
    keys: [],
    programId: new PublicKey('MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr'),
    data: Buffer.from('Hello from Lazorkit!'),
  }),
];

const signature = await signAndSendTransaction({ instructions });
```

## Step 5: View Transaction on Explorer

After a successful transaction:
```typescript
const signature = await signAndSendTransaction({
  instructions: [instruction],
});

// Construct explorer URL
const explorerUrl = `https://explorer.solana.com/tx/${signature}?cluster=devnet`;
console.log('View transaction:', explorerUrl);
```

## Step 6: Add Loading States

Improve UX with proper loading indicators:
```typescript
export function ImprovedTransfer() {
  const [isSigning, setIsSigning] = useState(false);
  const [signature, setSignature] = useState<string | null>(null);

  const handleTransfer = async () => {
    setIsSigning(true);
    setSignature(null);

    try {
      const sig = await signAndSendTransaction({ instructions });
      setSignature(sig);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSigning(false);
    }
  };

  return (
    <>
      <button disabled={isSigning}>
        {isSigning ? 'Processing...' : 'Send'}
      </button>
      {signature && (
        <a href={`https://explorer.solana.com/tx/${signature}?cluster=devnet`}>
          View Transaction
        </a>
      )}
    </>
  );
}
```

## Step 7: Error Handling

Handle common transaction errors:
```typescript
try {
  await signAndSendTransaction({ instructions });
} catch (error) {
  if (error instanceof Error) {
    // Insufficient balance
    if (error.message.includes('insufficient funds')) {
      alert('Insufficient balance. Request an airdrop first!');
    }
    // Invalid recipient
    else if (error.message.includes('invalid')) {
      alert('Invalid recipient address');
    }
    // User rejected signature
    else if (error.message.includes('rejected')) {
      alert('Transaction cancelled');
    }
    // Other errors
    else {
      console.error('Transaction error:', error);
      alert('Transaction failed. See console for details.');
    }
  }
}
```

## Testing Gasless Transactions

### Test 1: Simple Transfer
```typescript
// Send 0.01 SOL
const instruction = SystemProgram.transfer({
  fromPubkey: smartWalletPubkey,
  toPubkey: new PublicKey('RECIPIENT_ADDRESS'),
  lamports: 0.01 * LAMPORTS_PER_SOL,
});
```

### Test 2: Verify No Fee Deduction

1. Note your balance before transaction
2. Send 0.01 SOL
3. Check balance after
4. Should decrease by exactly 0.01 (no extra fee!)

### Test 3: Multiple Transactions

Send several transactions in a row to verify:
- Each is gasless
- No rate limiting
- Paymaster keeps sponsoring

## Common Issues & Solutions

### Issue: "Transaction failed to send"

**Possible causes**:
- RPC node issues → Try again
- Network congestion → Wait and retry
- Invalid instruction → Check your code

### Issue: "Insufficient balance for rent exemption"

**Solution**: Ensure recipient account has minimum SOL for rent:
```typescript
const minBalance = await connection.getMinimumBalanceForRentExemption(0);
if (amount * LAMPORTS_PER_SOL < minBalance) {
  alert(`Minimum amount is ${minBalance / LAMPORTS_PER_SOL} SOL`);
}
```

### Issue: Transaction succeeds but balance doesn't update

**Solution**: Add a delay before refreshing:
```typescript
await signAndSendTransaction({ instructions });
setTimeout(() => refreshBalance(), 2000);  // Wait 2 seconds
```

## Advanced: Custom Token Transfers

To transfer SPL tokens (like USDC):
```typescript
import { 
  getAssociatedTokenAddress, 
  createTransferInstruction 
} from '@solana/spl-token';

// Get token accounts
const sourceAta = await getAssociatedTokenAddress(
  tokenMint,
  smartWalletPubkey
);

const destAta = await getAssociatedTokenAddress(
  tokenMint,
  recipientPubkey
);

// Create transfer instruction
const instruction = createTransferInstruction(
  sourceAta,
  destAta,
  smartWalletPubkey,
  amount * (10 ** decimals)
);

// Send gasless!
await signAndSendTransaction({ instructions: [instruction] });
```

## Next Steps

- ✅ Tutorial 3: Session Management
- ✅ Explore token swaps
- ✅ Build multi-step workflows

## Complete Code

See full implementation:
- `src/components/features/SolTransfer.tsx`
- `src/hooks/useWalletInfo.ts`

## Resources

- [Solana Transaction Guide](https://docs.solana.com/developing/programming-model/transactions)
- [System Program](https://docs.rs/solana-program/latest/solana_program/system_instruction)
- [Lazorkit Paymaster](https://docs.lazorkit.com)
