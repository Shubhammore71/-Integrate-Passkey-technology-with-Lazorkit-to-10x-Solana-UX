# 🚀 Lazorkit Complete Demo - Passkey Wallet for Solana

A comprehensive Next.js application showcasing Lazorkit SDK integration with passkey authentication, gasless transactions, and session persistence on Solana.

![Lazorkit Demo](https://img.shields.io/badge/Solana-Devnet-purple) ![Next.js](https://img.shields.io/badge/Next.js-14-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)

🔗 Live Demo
View the working integration here: https://integrate-passkey-technology-with-l.vercel.app/

## ✨ Features

- 🔐 **Passkey Authentication** - WebAuthn-based wallet creation (no seed phrases!)
- 💸 **Gasless SOL Transfers** - Send SOL without paying transaction fees
- 💧 **Devnet Airdrop** - Request test SOL tokens
- 🔄 **Session Persistence** - Wallet stays connected across page reloads
- 🎨 **Modern UI** - Beautiful, responsive interface with Tailwind CSS
- 📱 **Mobile-Friendly** - Works on all devices

## 🎯 Why This Demo Stands Out

1. **Production-Ready Code Structure** - Well-organized components and hooks
2. **Comprehensive Examples** - Multiple use cases demonstrated
3. **Excellent Documentation** - Clear README and step-by-step tutorials
4. **Best Practices** - TypeScript, error handling, loading states
5. **User Experience Focus** - Smooth animations, toast notifications

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Blockchain**: Solana Web3.js
- **Wallet SDK**: Lazorkit (@lazorkit/wallet)
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Modern browser with WebAuthn support (Chrome, Safari, Edge, Firefox)

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/Shubhammore71/-Integrate-Passkey-technology-with-Lazorkit-to-10x-Solana-UX.git
cd -Integrate-Passkey-technology-with-Lazorkit-to-10x-Solana-UX
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Environment Variables
```bash
cp .env.local.example .env.local
```

The default configuration uses Solana Devnet:
```env
NEXT_PUBLIC_RPC_URL=https://api.devnet.solana.com
NEXT_PUBLIC_PORTAL_URL=https://portal.lazor.sh
NEXT_PUBLIC_PAYMASTER_URL=https://kora.devnet.lazorkit.com
```

### 4. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📖 Step-by-Step Tutorials

This repository includes comprehensive tutorials:

1. **[Tutorial 1: Create Passkey Wallet](tutorials/01-create-passkey-wallet.md)**
   - Learn how to integrate passkey authentication
   - Understand smart wallet creation
   - Handle connection/disconnection

2. **[Tutorial 2: Gasless Transactions](tutorials/02-gasless-transactions.md)**
   - Set up Lazorkit Paymaster
   - Send SOL without gas fees
   - View transactions on Solana Explorer

3. **[Tutorial 3: Session Management](tutorials/03-session-management.md)**
   - Implement session persistence
   - Handle wallet reconnection
   - Manage user state

## 🏗️ Project Structure
```
lazorkit-complete-demo/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with providers
│   │   ├── page.tsx             # Main page
│   │   └── providers.tsx        # Lazorkit & other providers
│   ├── components/
│   │   ├── features/
│   │   │   ├── WalletConnect.tsx
│   │   │   ├── SolTransfer.tsx
│   │   │   ├── TokenAirdrop.tsx
│   │   │   └── SessionDemo.tsx
│   │   └── ui/
│   │       ├── Button.tsx
│   │       └── Card.tsx
│   ├── hooks/
│   │   └── useWalletInfo.ts    # Custom wallet hook
│   ├── config/
│   │   └── constants.ts         # Configuration constants
│   └── lib/
│       └── polyfills.ts         # Browser polyfills
├── tutorials/                    # Step-by-step guides
└── README.md
```

## 🎮 Usage Guide

### Connect Wallet

1. Click "Connect with Passkey" button
2. Your browser will prompt for biometric authentication
3. Approve with Face ID, Touch ID, or your device's security method
4. Your smart wallet is created and connected!

### Request Airdrop

1. Once connected, click "Request 1 SOL"
2. Wait for confirmation (~15 seconds)
3. Your balance will automatically update

### Send Gasless Transaction

1. Enter recipient Solana address
2. Enter amount (e.g., 0.01 SOL)
3. Click "Send SOL"
4. Approve with your biometric
5. Transaction complete - no gas fees paid!

## 🔑 Key Features Explained

### Passkey Authentication

Traditional crypto wallets require users to:
- Memorize 12-24 word seed phrases
- Manage private keys securely
- Risk permanent loss if forgotten

With Lazorkit passkeys:
- ✅ Use your device's biometrics (Face ID, Touch ID)
- ✅ No seed phrases to remember
- ✅ Hardware-backed security
- ✅ Familiar Web2-like experience

### Gasless Transactions

Normally, every Solana transaction requires SOL for fees. With Lazorkit's Paymaster:
- ✅ Transactions are sponsored by the paymaster
- ✅ Users don't need SOL to transact
- ✅ Perfect for onboarding new users
- ✅ Reduces friction significantly

### Session Persistence

Lazorkit automatically:
- ✅ Saves your session securely
- ✅ Reconnects your wallet on page reload
- ✅ Maintains state across browser sessions
- ✅ No need to re-authenticate constantly

## 🧪 Testing
```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📦 Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Shubhammore71/-Integrate-Passkey-technology-with-Lazorkit-to-10x-Solana-UX)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

### Environment Variables for Production
```env
NEXT_PUBLIC_RPC_URL=https://api.devnet.solana.com
NEXT_PUBLIC_PORTAL_URL=https://portal.lazor.sh
NEXT_PUBLIC_PAYMASTER_URL=https://kora.devnet.lazorkit.com
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📚 Resources

- **[Lazorkit Documentation](https://docs.lazorkit.com)** - Official SDK docs
- **[Lazorkit Telegram](https://t.me/lazorkit)** - Community support
- **[Solana Docs](https://docs.solana.com)** - Solana blockchain
- **[Next.js Docs](https://nextjs.org/docs)** - Next.js framework

## 🐛 Troubleshooting

### Common Issues

**Issue**: Passkey popup doesn't appear
- **Solution**: Ensure you're using HTTPS or localhost
- Check browser WebAuthn support

**Issue**: Transaction fails
- **Solution**: Ensure you have SOL balance (request airdrop first)
- Check Solana Devnet status

**Issue**: Build errors
- **Solution**: Delete `node_modules` and `.next`, then reinstall:
```bash
  rm -rf node_modules .next
  npm install
```

## 📄 License

MIT License - feel free to use this code for your own projects!

## 🙏 Acknowledgments

- **Lazorkit Team** - For creating this amazing SDK
- **Solana Foundation** - For the robust blockchain infrastructure
- **Open Source Community** - For all the amazing tools

---

**Built for Lazorkit Bounty 2026** 🏆

Made by Shubham More
