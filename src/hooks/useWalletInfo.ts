// src/hooks/useWalletInfo.ts
import { useWallet } from '@lazorkit/wallet';
import { useEffect, useState } from 'react';
import { Connection, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { LAZORKIT_CONFIG } from '@/config/constants';

export function useWalletInfo() {
  const wallet = useWallet();
  const [balance, setBalance] = useState<number | null>(null);
  const [isLoadingBalance, setIsLoadingBalance] = useState(false);

  const fetchBalance = async () => {
    if (!wallet.smartWalletPubkey) {
      setBalance(null);
      return;
    }

    setIsLoadingBalance(true);
    try {
      const connection = new Connection(LAZORKIT_CONFIG.rpcUrl);
      const lamports = await connection.getBalance(wallet.smartWalletPubkey);
      setBalance(lamports / LAMPORTS_PER_SOL);
    } catch (error) {
      console.error('Error fetching balance:', error);
      setBalance(null);
    } finally {
      setIsLoadingBalance(false);
    }
  };

  useEffect(() => {
    if (wallet.isConnected && wallet.smartWalletPubkey) {
      fetchBalance();
    } else {
      setBalance(null);
    }
  }, [wallet.isConnected, wallet.smartWalletPubkey]);

  return {
    ...wallet,
    balance,
    isLoadingBalance,
    refreshBalance: fetchBalance,
  };
}