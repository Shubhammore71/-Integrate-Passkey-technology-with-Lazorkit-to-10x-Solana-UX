// src/lib/polyfills.ts
import { Buffer } from 'buffer';

if (typeof window !== 'undefined') {
  // Fix "global is not defined"
  // @ts-ignore
  window.global = window;
  
  // Fix "Buffer is not defined" (Define it here, not just in useEffect)
  // @ts-ignore
  window.Buffer = Buffer;

  // Fix "process is not defined" (Commonly needed by Solana/Crypto libs)
  // @ts-ignore
  window.process = {
    ...(window.process || {}),
    env: { NODE_DEBUG: undefined },
    version: '',
    nextTick: (cb: any) => setTimeout(cb, 0),
  };
}

export {};