// src/components/features/SessionDemo.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useWalletInfo } from '@/hooks/useWalletInfo';
import { Card } from '@/components/ui/Card';
import { Clock, CheckCircle, XCircle } from 'lucide-react';

export function SessionDemo() {
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
  }, [isConnected]);

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
    <Card 
      title="Session Persistence" 
      description="Your wallet session persists across page reloads"
    >
      <div className="space-y-4">
        {/* Connection Status */}
        <div className="flex items-center justify-between bg-gray-900 rounded-lg p-4">
          <div className="flex items-center gap-3">
            {isConnected ? (
              <CheckCircle className="w-5 h-5 text-green-400" />
            ) : (
              <XCircle className="w-5 h-5 text-red-400" />
            )}
            <div>
              <p className="text-sm font-medium text-white">
                {isConnected ? 'Connected' : 'Disconnected'}
              </p>
              <p className="text-xs text-gray-400">
                {isConnected ? 'Session is active' : 'No active session'}
              </p>
            </div>
          </div>
          {isConnected && (
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <Clock className="w-4 h-4" />
              {sessionDuration}
            </div>
          )}
        </div>

        {/* Session Info */}
        {isConnected && account && (
          <div className="bg-gray-900 rounded-lg p-4 space-y-3">
            <div>
              <p className="text-xs text-gray-400 mb-1">Credential ID</p>
              <p className="text-sm text-gray-200 font-mono break-all">
                {account.credentialId || 'N/A'}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Session Started</p>
              <p className="text-sm text-gray-200">
                {sessionStartTime?.toLocaleString() || 'N/A'}
              </p>
            </div>
          </div>
        )}

        {/* Feature Explanation */}
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
          <p className="text-sm text-blue-200">
            ✨ Try refreshing the page! Your wallet connection persists automatically thanks to Lazorkit's session management.
          </p>
        </div>
      </div>
    </Card>
  );
}