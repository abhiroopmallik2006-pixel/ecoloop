import {Suspense} from 'react';
import {Dashboard} from '@/components/dashboard';
export async function generateMetadata({searchParams}:{searchParams:Promise<Record<string,string|string[]|undefined>>}){
 const params=await searchParams;
 const views:Record<string,string>={overview:'Overview',autopilot:'Circularity engine',resources:'Resource passports',points:'GreenPoints',hub:'Connected hub',reports:'Reports',notifications:'Notifications',food:'Food',water:'Water',energy:'Energy',materials:'Materials'};
 const view=typeof params.view==='string'&&Object.hasOwn(views,params.view)?views[params.view]:'Overview';
 const site=params.site==='community'?'Demo Community':'Demo Campus';
 return {title:`${view} · ${site}`,robots:{index:false,follow:false}};
}
export default function Demo(){return <Suspense fallback={<main id="main" className="wrap prose-page"><h1>Loading the simulated workspace…</h1></main>}><Dashboard/></Suspense>}
