// src/components/features/SolTransfer.tsx
'use client';

import React, { useState } from 'react';
import { useWalletInfo } from '@/hooks/useWalletInfo';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { SystemProgram, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { Send, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';
import { DEMO_RECIPIENT } from '@/config/constants';

export function SolTransfer() {
    const { signAndSendTransaction, smartWalletPubkey, isConnected, isLoading: isSigning, refreshBalance } = useWalletInfo();
 // Explicitly add <string> to the useState hook
const [recipient, setRecipient] = useState<string>(DEMO_RECIPIENT);
const [amount, setAmount] = useState<string>('0.01');
  const [lastSignature, setLastSignature] = useState<string | null>(null);

  const handleTransfer = async () => {
    if (!smartWalletPubkey) {
      toast.error('Please connect your wallet first');
      return;
    }

    if (!recipient || !amount) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      const recipientPubkey = new PublicKey(recipient);
      const lamports = parseFloat(amount) * LAMPORTS_PER_SOL;

      const instruction = SystemProgram.transfer({
        fromPubkey: smartWalletPubkey,
        toPubkey: recipientPubkey,
        lamports,
      });

      const signature = await signAndSendTransaction({
        instructions: [instruction],
      });

      setLastSignature(signature);
      toast.success('Transfer successful!');
      
      // Refresh balance after transaction
      setTimeout(() => refreshBalance(), 2000);
    } catch (error) {
      console.error('Transfer error:', error);
      toast.error('Transfer failed. Check console for details.');
    }
  };

  if (!isConnected) {
    return (
      <Card title="Gasless SOL Transfer" description="Send SOL without paying gas fees">
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
          <p className="text-sm text-yellow-200">
            ⚠️ Please connect your wallet first to use this feature.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card 
      title="Gasless SOL Transfer" 
      description="Send SOL without paying gas fees (powered by Lazorkit Paymaster)"
    >
      <div className="space-y-4">
        {/* Recipient Address */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Recipient Address
          </label>
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="Enter Solana address"
            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Amount */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Amount (SOL)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.01"
            step="0.01"
            min="0"
            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Info Box */}
        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
          <p className="text-xs text-green-200">
            💡 This transaction is gasless! The Lazorkit Paymaster will cover the transaction fees.
          </p>
        </div>

        {/* Send Button */}
        <Button
          onClick={handleTransfer}
          isLoading={isSigning}
          variant="success"
          size="lg"
          className="w-full"
        >
          <Send className="w-4 h-4 mr-2" />
          {isSigning ? 'Sending...' : 'Send SOL'}
        </Button>

        {/* Transaction Link */}
        {lastSignature && (
          <div className="bg-gray-900 rounded-lg p-3">
            <p className="text-xs text-gray-400 mb-2">Last Transaction:</p>
            <a
              href={`https://explorer.solana.com/tx/${lastSignature}?cluster=devnet`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
            >
              <span className="truncate">{lastSignature}</span>
              <ExternalLink className="w-4 h-4 flex-shrink-0" />
            </a>
          </div>
        )}
      </div>
    </Card>
  );
}