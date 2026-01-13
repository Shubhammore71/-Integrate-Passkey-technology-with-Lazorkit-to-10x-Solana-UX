// src/components/features/TokenAirdrop.tsx
'use client';

import React, { useState } from 'react';
import { useWalletInfo } from '@/hooks/useWalletInfo';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Connection, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { Coins, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';
import { LAZORKIT_CONFIG } from '@/config/constants';

export function TokenAirdrop() {
  const { smartWalletPubkey, isConnected, refreshBalance } = useWalletInfo();
  const [isRequesting, setIsRequesting] = useState(false);
  const [lastSignature, setLastSignature] = useState<string | null>(null);

  const requestAirdrop = async () => {
    if (!smartWalletPubkey) {
      toast.error('Please connect your wallet first');
      return;
    }

    setIsRequesting(true);
    try {
      const connection = new Connection(LAZORKIT_CONFIG.rpcUrl);
      const signature = await connection.requestAirdrop(
        smartWalletPubkey,
        1 * LAMPORTS_PER_SOL
      );

      await connection.confirmTransaction(signature);
      setLastSignature(signature);
      toast.success('Airdrop successful! You received 1 SOL');
      
      // Refresh balance after airdrop
      setTimeout(() => refreshBalance(), 2000);
    } catch (error) {
      console.error('Airdrop error:', error);
      toast.error('Airdrop failed. You may have reached the rate limit.');
    } finally {
      setIsRequesting(false);
    }
  };

  if (!isConnected) {
    return (
      <Card title="Request Devnet Airdrop" description="Get test SOL for development">
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
          <p className="text-sm text-yellow-200">
            ⚠️ Please connect your wallet first to request an airdrop.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card 
      title="Request Devnet Airdrop" 
      description="Get 1 SOL for testing on Devnet"
    >
      <div className="space-y-4">
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
          <p className="text-sm text-blue-200">
            💧 Request test SOL tokens to try out the demo features. You can request up to 2 SOL per day on Devnet.
          </p>
        </div>

        <Button
          onClick={requestAirdrop}
          isLoading={isRequesting}
          variant="primary"
          size="lg"
          className="w-full"
        >
          <Coins className="w-4 h-4 mr-2" />
          {isRequesting ? 'Requesting...' : 'Request 1 SOL'}
        </Button>

        {lastSignature && (
          <div className="bg-gray-900 rounded-lg p-3">
            <p className="text-xs text-gray-400 mb-2">Last Airdrop Transaction:</p>
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