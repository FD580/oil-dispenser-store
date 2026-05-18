import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Oil Dispenser Store',
  description: 'E-commerce store for customizable oil dispensers',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
