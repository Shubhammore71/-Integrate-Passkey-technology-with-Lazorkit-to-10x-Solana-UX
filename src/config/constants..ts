// src/config/constants.ts

export const LAZORKIT_CONFIG = {
    rpcUrl: process.env.NEXT_PUBLIC_RPC_URL || 'https://api.devnet.solana.com',
    portalUrl: process.env.NEXT_PUBLIC_PORTAL_URL || 'https://portal.lazor.sh',
    paymasterUrl: process.env.NEXT_PUBLIC_PAYMASTER_URL || 'https://kora.devnet.lazorkit.com',
  };
  
  // Sample recipient address for demos (replace with your own)
  export const DEMO_RECIPIENT = '5z8DS1qC1cUoeYVi4FQr3m3dooFGKff61GknfKwQEMhc';
  
  // USDC Token Mint on Devnet
  export const USDC_MINT = 'Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr';
  
  // Common Solana constants
  export const LAMPORTS_PER_SOL = 1_000_000_000;