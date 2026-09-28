import Link from 'next/link';
import {SiteHeader, SiteFooter} from '@/components/site-shell';
export default function NotFound() {return <><SiteHeader/><main id="main" className="wrap prose-page"><p className="eyebrow">404 · OFF THE LOOP</p><h1>Let’s get you back<br/>to a better place.</h1><p>This page does not exist. Explore the EcoLoop workflow or return to the demo.</p><Link className="button button-dark" href="/">Back to home →</Link></main><SiteFooter/></>}
