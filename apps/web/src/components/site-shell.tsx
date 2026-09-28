import Link from 'next/link';
import {Brand} from './brand';
import {Icon} from './icon';
export function SiteHeader() { return <header className="site-header wrap"><Brand/><nav aria-label="Main navigation"><Link href="/how-it-works">How it works</Link><Link href="/solutions/campuses">For campuses</Link><Link href="/solutions/rwas">For communities</Link></nav><Link className="button button-dark small" href="/demo">Explore demo <Icon name="arrow" size={16}/></Link></header>; }
export function SiteFooter() { return <footer className="site-footer wrap"><div><Brand/><p>Better resources. Better together.</p></div><div><Link href="/how-it-works">How it works</Link><Link href="/pilot">Pilot program</Link><Link href="/demo">Simulated demo</Link></div><p className="footer-note">EcoLoop AI · Concept & demo<br/>Designed for a more circular tomorrow.</p></footer>; }
