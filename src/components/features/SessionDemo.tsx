'use client';

import React, { useEffect, useState } from 'react';
import { useWalletInfo } from '@/hooks/useWalletInfo';
import { Card } from '@/components/ui/Card';
import { Clock, CheckCircle, XCircle } from 'lucide-react';

export function SessionDemo() {
  // FIX: Changed 'account' to 'smartWalletPubkey'
  const { isConnected, smartWalletPubkey } = useWalletInfo();
  const [sessionStartTime, setSessionStartTime] = useState<Date | null>(null);
  const [sessionDuration, setSessionDuration] = useState<string>('0s');

  useEffect(() => {
    if (isConnected && !sessionStartTime) {
      setSessionStartTime(new Date());
    } else if (!isConnected) {
      setSessionStartTime(null);
      setSessionDuration('0s');
    }
  }, [isConnected, sessionStartTime]);

  useEffect(() => {
    if (!sessionStartTime) return;

    const interval = setInterval(() => {
      const now = new Date();
      const diff = Math.floor((now.getTime() - sessionStartTime.getTime()) / 1000);
      const minutes = Math.floor(diff / 60);
      const seconds = diff % 60;
      setSessionDuration(minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`);
    }, 1000);

    return () => clearInterval(interval);
  }, [sessionStartTime]);

  return (
    <Card title="Session Persistence" description="Your wallet session persists across page reloads">
      <div className="space-y-4">
        <div className="flex items-center justify-between bg-gray-900 rounded-lg p-4">
          <div className="flex items-center gap-3">
            {isConnected ? <CheckCircle className="w-5 h-5 text-green-400" /> : <XCircle className="w-5 h-5 text-red-400" />}
            <div>
              <p className="text-sm font-medium text-white">{isConnected ? 'Connected' : 'Disconnected'}</p>
              <p className="text-xs text-gray-400">{isConnected ? 'Session is active' : 'No active session'}</p>
            </div>
          </div>
          {isConnected && <div className="flex items-center gap-2 text-sm text-gray-300"><Clock className="w-4 h-4" />{sessionDuration}</div>}
        </div>

        {/* FIX: Use smartWalletPubkey and remove .credentialId */}
        {isConnected && smartWalletPubkey && (
          <div className="bg-gray-900 rounded-lg p-4 space-y-3">
            <div>
              <p className="text-xs text-gray-400 mb-1">Smart Wallet Address</p>
              <p className="text-sm text-gray-200 font-mono break-all">{smartWalletPubkey.toString()}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Session Started</p>
              <p className="text-sm text-gray-200">{sessionStartTime?.toLocaleString() || 'N/A'}</p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}