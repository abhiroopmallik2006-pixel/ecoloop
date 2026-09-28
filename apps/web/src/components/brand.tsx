import Link from 'next/link';
export function Brand({light = false}: {light?: boolean}) {
 return <Link href="/" className={`brand ${light ? 'brand-light' : ''}`} aria-label="EcoLoop AI home"><svg width="34" height="34" viewBox="0 0 40 40" fill="none" aria-hidden="true"><path d="M29 11A13 13 0 1 0 32 26" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/><path d="M18 23C18 12 27 6 36 7c0 10-6 18-16 17" fill="currentColor"/><path d="m17 27 12-12" stroke="var(--brand-cutout,#f7f9f3)" strokeWidth="2" strokeLinecap="round"/></svg><span>eco<span className="brand-loop">loop</span><sup>AI</sup></span></Link>;
}
