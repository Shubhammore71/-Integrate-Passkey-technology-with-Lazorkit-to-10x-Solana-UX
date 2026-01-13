// src/components/features/WalletConnect.tsx
'use client';

import React from 'react';
import { useWalletInfo } from '@/hooks/useWalletInfo';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Wallet, LogOut, Copy, Check, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';

export function WalletConnect() {
  const { 
    isConnected, 
    isConnecting, 
    connect, 
    disconnect, 
    smartWalletPubkey,
    balance,
    isLoadingBalance,
    refreshBalance,
  } = useWalletInfo();
  
  const [copied, setCopied] = React.useState(false);

  const handleConnect = async () => {
    try {
      await connect();
      toast.success('Wallet connected successfully!');
    } catch (error) {
      console.error('Connection error:', error);
      toast.error('Failed to connect wallet');
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnect();
      toast.success('Wallet disconnected');
    } catch (error) {
      console.error('Disconnect error:', error);
      toast.error('Failed to disconnect wallet');
    }
  };

  const copyAddress = () => {
    if (smartWalletPubkey) {
      navigator.clipboard.writeText(smartWalletPubkey.toString());
      setCopied(true);
      toast.success('Address copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!isConnected) {
    return (
      <Card 
        title="Connect Your Wallet"
        description="Create a new passkey wallet or connect with an existing one"
      >
        <div className="space-y-4">
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <p className="text-sm text-blue-200">
              ✨ No seed phrases required! Your wallet is secured by your device's biometrics (Face ID, Touch ID, or Windows Hello).
            </p>
          </div>
          <Button
            onClick={handleConnect}
            isLoading={isConnecting}
            variant="primary"
            size="lg"
            className="w-full"
          >
            <Wallet className="w-5 h-5 mr-2" />
            {isConnecting ? 'Connecting...' : 'Connect with Passkey'}
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card title="Wallet Connected" description="Your smart wallet details">
      <div className="space-y-4">
        {/* Wallet Address */}
        <div className="bg-gray-900 rounded-lg p-4">
          <label className="text-sm text-gray-400 block mb-2">Smart Wallet Address</label>
          <div className="flex items-center gap-2">
            <code className="text-sm text-green-400 flex-1 truncate">
              {smartWalletPubkey?.toString()}
            </code>
            <button
              onClick={copyAddress}
              className="p-2 hover:bg-gray-700 rounded transition-colors"
              title="Copy address"
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-400" />
              ) : (
                <Copy className="w-4 h-4 text-gray-400" />
              )}
            </button>
          </div>
        </div>

        {/* Balance */}
        <div className="bg-gray-900 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm text-gray-400">Balance</label>
            <button
              onClick={refreshBalance}
              disabled={isLoadingBalance}
              className="p-1 hover:bg-gray-700 rounded transition-colors disabled:opacity-50"
              title="Refresh balance"
            >
              <RefreshCw className={`w-4 h-4 text-gray-400 ${isLoadingBalance ? 'animate-spin' : ''}`} />
            </button>
          </div>
          <p className="text-2xl font-bold text-white">
            {isLoadingBalance ? (
              <span className="text-gray-500">Loading...</span>
            ) : (
              `${balance?.toFixed(4) || '0.0000'} SOL`
            )}
          </p>
        </div>

        {/* Disconnect Button */}
        <Button
          onClick={handleDisconnect}
          variant="danger"
          size="md"
          className="w-full"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Disconnect
        </Button>
      </div>
    </Card>
  );
}