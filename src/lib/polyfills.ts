// src/lib/polyfills.ts
import { Buffer } from 'buffer';

if (typeof window !== 'undefined') {
  // Fix "global is not defined"
  // @ts-ignore
  window.global = window;
  
  // Fix "Buffer is not defined"
  // @ts-ignore
  window.Buffer = window.Buffer || Buffer;

  // Fix "process is not defined" and the "NODE_ENV" type error
  // @ts-ignore
  window.process = {
    ...(window.process || {}),
    env: { 
      NODE_DEBUG: undefined,
      NODE_ENV: process.env.NODE_ENV || 'development' // FIX: Add the missing required property
    },
    version: '',
    nextTick: (cb: any) => setTimeout(cb, 0),
  } as any; // FIX: Cast as any to satisfy strict Type checking
}

export {};