import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProviders } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lazorkit Complete Demo - Passkey Wallet for Solana",
  description: "Complete demo showcasing Lazorkit SDK integration",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* INJECT POLYFILLS IMMEDIATELY */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.global = window;
              window.process = { env: {} };
              var exports = {};
            `,
          }}
        />
      </head>
      <body className={`${inter.className} bg-gray-900`}>
        <AppProviders>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}