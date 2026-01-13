'use client';

import React, { useEffect } from 'react';
import { LazorkitProvider } from '@lazorkit/wallet';
import { Buffer } from 'buffer';
import { Toaster } from 'react-hot-toast';
import { LAZORKIT_CONFIG } from '@/config/constants';

export function AppProviders({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Buffer polyfill for browser (safe, only runs client-side)
    if (typeof window !== 'undefined' && !window.Buffer) {
      window.Buffer = Buffer;
    }
  }, []);

  return (
    <LazorkitProvider
      rpcUrl={LAZORKIT_CONFIG.rpcUrl}
      portalUrl={LAZORKIT_CONFIG.portalUrl}
      paymasterConfig={{
        paymasterUrl: LAZORKIT_CONFIG.paymasterUrl,
        // Optional: add more paymaster options here later if needed
        // e.g. feeToken: 'USDC', sponsoredOperations: [...]
      }}
    >
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1f2937',
            color: '#fff',
            border: '1px solid #374151',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
      {children}
    </LazorkitProvider>
  );
}