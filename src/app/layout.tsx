import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProviders } from "./providers";
import '@/lib/polyfills';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lazorkit Complete Demo - Passkey Wallet for Solana",
  description: "Complete demo showcasing Lazorkit SDK integration with Next.js - Passkey authentication, gasless transactions, and more",
  keywords: ["Solana", "Lazorkit", "Passkey", "Web3", "Wallet", "Gasless Transactions"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-900`}>
        <AppProviders>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
