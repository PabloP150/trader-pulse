import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TraderPulse',
  description: 'SaaS Dashboard para análisis bursátil',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark">
      <body className="min-h-screen bg-background font-sans antialiased text-foreground">
        {children}
      </body>
    </html>
  );
}
