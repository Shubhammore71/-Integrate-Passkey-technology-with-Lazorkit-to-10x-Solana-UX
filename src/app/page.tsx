// src/app/page.tsx
'use client';

import { WalletConnect } from '@/components/features/WalletConnect';
import { SolTransfer } from '@/components/features/SolTransfer';
import { TokenAirdrop } from '@/components/features/TokenAirdrop';
import { SessionDemo } from '@/components/features/SessionDemo';
import { Github, ExternalLink } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">
                🚀 Lazorkit Complete Demo
              </h1>
              <p className="text-gray-400 mt-1">
                Passkey-powered Solana wallet integration
              </p>
            </div>
            <a
              href="https://github.com/Shubhammore71/-Integrate-Passkey-technology-with-Lazorkit-to-10x-Solana-UX"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
            >
              <Github className="w-5 h-5" />
              <span className="hidden sm:inline">View on GitHub</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Web3 UX Made Simple
          </h2>
          <p className="text-xl text-gray-300 mb-6">
            No seed phrases. No extensions. Just your fingerprint or face ID.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
            <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-green-400">Gasless Transactions</span>
            </div>
            <div className="flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2">
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
              <span className="text-blue-400">Passkey Authentication</span>
            </div>
            <div className="flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-2">
              <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></span>
              <span className="text-purple-400">Session Persistence</span>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
          {/* Left Column */}
          <div className="space-y-6">
            <WalletConnect />
            <SessionDemo />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <TokenAirdrop />
            <SolTransfer />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">
            What's Included in This Demo
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="text-3xl mb-4">🔐</div>
              <h4 className="text-lg font-semibold text-white mb-2">
                Passkey Authentication
              </h4>
              <p className="text-gray-400 text-sm">
                Secure wallet creation using WebAuthn. No seed phrases to remember or lose.
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="text-3xl mb-4">💸</div>
              <h4 className="text-lg font-semibold text-white mb-2">
                Gasless Transactions
              </h4>
              <p className="text-gray-400 text-sm">
                Send SOL without paying gas fees. Powered by Lazorkit Paymaster.
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="text-3xl mb-4">🔄</div>
              <h4 className="text-lg font-semibold text-white mb-2">
                Session Persistence
              </h4>
              <p className="text-gray-400 text-sm">
                Your wallet stays connected across page reloads. Seamless UX.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/20 rounded-xl p-8">
          <h3 className="text-2xl font-bold text-white mb-4">
            📚 Learn More
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href="https://docs.lazorkit.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-gray-800/50 hover:bg-gray-800 rounded-lg transition-colors group"
            >
              <ExternalLink className="w-5 h-5 text-blue-400 group-hover:text-blue-300" />
              <div>
                <p className="text-white font-medium">Lazorkit Documentation</p>
                <p className="text-gray-400 text-sm">Complete SDK reference</p>
              </div>
            </a>
            <a
              href="https://t.me/lazorkit"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-gray-800/50 hover:bg-gray-800 rounded-lg transition-colors group"
            >
              <ExternalLink className="w-5 h-5 text-blue-400 group-hover:text-blue-300" />
              <div>
                <p className="text-white font-medium">Join Telegram</p>
                <p className="text-gray-400 text-sm">Get help from the community</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm">
            Built for the Lazorkit Bounty 2025 • Made with ❤️ by the community
          </p>
        </div>
      </footer>
    </main>
  );
}