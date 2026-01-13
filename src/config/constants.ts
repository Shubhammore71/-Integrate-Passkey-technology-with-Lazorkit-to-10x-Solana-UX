// src/config/constants.ts
// Centralized configuration constants for the Lazorkit + Solana demo app
// All environment-specific values should come from .env files

/**
 * Core Lazorkit & Solana RPC configuration
 */
export const LAZORKIT_CONFIG = {
  /**
   * Solana RPC endpoint
   * @default Devnet public RPC
   */
  rpcUrl: process.env.NEXT_PUBLIC_RPC_URL || 'https://api.devnet.solana.com',

  /**
   * Lazorkit Portal URL (for passkey / wallet connection flows)
   * @default Official devnet portal
   */
  portalUrl: process.env.NEXT_PUBLIC_PORTAL_URL || 'https://portal.lazor.sh',

  /**
   * Lazorkit Paymaster / Gasless relayer endpoint
   * @default Devnet paymaster
   */
  paymasterUrl: process.env.NEXT_PUBLIC_PAYMASTER_URL || 'https://kora.devnet.lazorkit.com',

  /**
   * Chain ID alias (useful for some wallet / dapp connectors)
   */
  chainId: 'solana:devnet' as const,
} as const;

/**
 * Demo / testing addresses
 * NEVER use these in production!
 */
export const DEMO_ADDRESSES = {
  /** Sample recipient wallet for SOL & token transfer demos */
  recipient: '5z8DS1qC1cUoeYVi4FQr3m3dooFGKff61GknfKwQEMhc',

  /** Optional: You can add a second demo wallet if needed */
  // secondaryRecipient: '....',
} as const;

/**
 * Token mint addresses (Devnet)
 */
export const TOKEN_MINTS = {
  /** Official USDC mint on Solana Devnet */
  USDC: 'Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr',

  /** You can add more tokens here later (e.g. USDT, custom SPL tokens) */
  // USDT: '....',
  // LAZOR: '....',
} as const;

/**
 * Solana protocol & economic constants
 */
export const SOLANA_CONSTANTS = {
  /** 1 SOL = 1_000_000_000 lamports */
  LAMPORTS_PER_SOL: 1_000_000_000,

  /** Default compute unit limit for simple transactions */
  DEFAULT_COMPUTE_UNITS: 200_000,

  /** Priority fee estimate in micro-lamports (can be dynamic in real apps) */
  DEFAULT_PRIORITY_FEE_MICRO_LAMPORTS: 100_000,

  /** Typical recent blockhash lifetime (in slots) */
  BLOCKHASH_LIFETIME_SLOTS: 150,
} as const;

/**
 * App-wide feature flags / environment helpers
 */
export const APP_CONFIG = {
  /** Whether we're running in development mode */
  isDev: process.env.NODE_ENV === 'development',

  /** Whether to show debug UI elements and extra logging */
  enableDebugUI: process.env.NEXT_PUBLIC_DEBUG_UI === 'true',

  /** Default slippage tolerance for swaps (if you add Jupiter/Solana swap later) */
  defaultSlippageBps: 50, // 0.5%
} as const;

// ============================================================================
// Convenience exports (pick what you actually need in components)
// ============================================================================

export const {
  rpcUrl,
  portalUrl,
  paymasterUrl,
} = LAZORKIT_CONFIG;

export const { recipient: DEMO_RECIPIENT } = DEMO_ADDRESSES;

export const { USDC: USDC_MINT } = TOKEN_MINTS;

export const { LAMPORTS_PER_SOL } = SOLANA_CONSTANTS;