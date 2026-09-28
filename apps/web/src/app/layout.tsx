import type { Metadata } from 'next';
import './globals.css';
import './theme.css';
export const metadata: Metadata = {
 title: { default: 'EcoLoop AI — Circular Resource Management for Communities', template: '%s | EcoLoop AI' },
 description: 'Predict surplus. Put resources to better use. Explore a proposed circular resource platform for food, water, energy, and materials.',
 robots: { index: false, follow: false }
};
const themeInit = `(()=>{let theme='dark';try{if(localStorage.getItem('ecoloop-theme')==='light')theme='light'}catch{}document.documentElement.dataset.theme=theme})()`;
export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) { return <html lang="en" data-theme="dark" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{__html:themeInit}}/></head><body><a className="skip-link" href="#main">Skip to content</a>{children}</body></html>; }
