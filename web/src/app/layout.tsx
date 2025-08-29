import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mini‑Market',
  description: 'Next.js frontend for the mini‑market test',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body style={{ fontFamily: 'system-ui, sans-serif', margin: 0 }}>
        {children}
      </body>
    </html>
  );
}
