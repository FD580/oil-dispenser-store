import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'NestCraft — Custom Kitchen & Home',
  description: 'Premium customizable kitchenware and home goods.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">{children}</body>
    </html>
  );
}