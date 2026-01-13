'use client';

import React, { useEffect } from 'react';
import { LazorkitProvider } from '@lazorkit/wallet';
import { Buffer } from 'buffer';
import { Toaster } from 'react-hot-toast';
import { LAZORKIT_CONFIG } from '@/config/constants';

export function AppProviders({ children }: { children: React.ReactNode }) {
    // Removed the useEffect polyfill from here as it's now in lib/polyfills.ts
    
    return (
      <LazorkitProvider
        rpcUrl={LAZORKIT_CONFIG.rpcUrl}
        portalUrl={LAZORKIT_CONFIG.portalUrl}
        paymasterConfig={{
          paymasterUrl: LAZORKIT_CONFIG.paymasterUrl,
        }}
      >
        <Toaster position="top-right" />
        {children}
      </LazorkitProvider>
    );
  }