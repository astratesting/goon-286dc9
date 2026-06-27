import type { Metadata } from 'next';
import { Archivo_Black } from 'next/font/google';
import './globals.css';

const archivo = Archivo_Black({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-archivo',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Goon — The Salon Returns',
  description:
    'An exclusive private members club for high-net-worth queer individuals. Old European aristocratic luxury, restored. West Hollywood / Beverly Heights. Applications open.',
  metadataBase: new URL('https://goon.club'),
  openGraph: {
    title: 'Goon — The Salon Returns',
    description:
      'An exclusive private members club. Old European aristocratic luxury, restored for a queer elite.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={archivo.variable}>
      <body>{children}</body>
    </html>
  );
}
