import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
 title: { default: 'EcoLoop AI — Circular Resource Management for Communities', template: '%s | EcoLoop AI' },
 description: 'Predict surplus. Put resources to better use. Explore a proposed circular resource platform for food, water, energy, and materials.',
 robots: { index: false, follow: false }
};
export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) { return <html lang="en"><body><a className="skip-link" href="#main">Skip to content</a>{children}</body></html>; }
