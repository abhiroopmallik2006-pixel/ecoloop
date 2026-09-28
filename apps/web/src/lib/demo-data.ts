import type { Reading, Recommendation, Stream } from '../../../../packages/contracts/src/demo';
export type { Stream, DemoSite } from '../../../../packages/contracts/src/demo';
export const streamInfo: Record<Stream,{label:string;metric:string;unit:string;color:string;icon:'leaf'|'water'|'sun'|'recycle';source:string}> = {
 food:{label:'Food',metric:'Food waste recorded',unit:'kg',color:'green',icon:'leaf',source:'Cafeteria weigh-in'},
 water:{label:'Water',metric:'Water reused',unit:'L',color:'blue',icon:'water',source:'Garden reuse log'},
 energy:{label:'Energy',metric:'Solar generated',unit:'kWh',color:'gold',icon:'sun',source:'Rooftop generation meter'},
 materials:{label:'Materials',metric:'Materials recovered',unit:'kg',color:'purple',icon:'recycle',source:'Confirmed material receipts'}
};
export const readings: Reading[] = [
 {date:'2026-09-22',food:'27.5',water:'1400',energy:'98.4',materials:'32'},
 {date:'2026-09-23',food:'24.0',water:'1800',energy:'116.2',materials:'48'},
 {date:'2026-09-24',food:'23.5',water:'1700',energy:'108.6',materials:'36'},
 {date:'2026-09-25',food:'20.0',water:'2100',energy:'136.5',materials:'58'},
 {date:'2026-09-26',food:'19.5',water:'1600',energy:'122.1',materials:'42'},
 {date:'2026-09-27',food:'18.0',water:'1800',energy:'128.4',materials:'54'},
 {date:'2026-09-28',food:'16.0',water:'2000',energy:'136.0',materials:'56'}
];
export const recommendations: Recommendation[] = [
 {id:'food-plan',stream:'food',kind:'Prevent',title:'Prepare a little less. Serve just enough.',description:'Review tomorrow’s lunch plan before preparation starts.',quantity:'30',unit:'portions',status:'Requires review',reasons:['The four comparable lunch services served 100, 110, 90, and 120 portions.','The baseline median is 105 portions. An illustrative service buffer adds 15 portions.','A current plan of 150 portions leaves a proposed reduction of 30 portions, within the illustrative 20% reduction limit.'],limitation:'Predicted demand is not a guarantee. Confidence interval unavailable: fewer than 20 out-of-sample residuals. A manager must review the service buffer and current attendance.',assignee:'Cafeteria manager'},
 {id:'compost-route',stream:'materials',kind:'Route',title:'Give campus compost its next chapter.',description:'Review a compost handoff to the registered nursery partner.',quantity:'48',unit:'kg',status:'Requires review',reasons:['Demo batch ECO-0042 has 48 kg of measured compost available.','The illustrative nursery partner accepts compost and has sufficient capacity.','This example includes a current simulated quality review; a real handoff needs valid evidence through pickup.'],limitation:'A proposal does not reserve stock or record recovery. Quality, capacity, expiry, and permission must be checked again before a real reservation.',assignee:'Facilities manager'},
 {id:'water-reuse',stream:'water',kind:'Reuse',title:'Check water quality before the next loop.',description:'The garden reuse route needs a renewed quality review.',quantity:'—',unit:'',status:'Blocked',reasons:['Water level readings alone cannot establish suitability for irrigation.','The demo quality review is expired.','Only the site safety lead can establish the approved use and required quality evidence.'],limitation:'Route unavailable. No approval or equipment control is provided. Historic reuse readings remain visible but do not establish current water quality.',assignee:'Site safety lead'}
];
export const passports = [
 {code:'ECO-0042',name:'Garden compost',type:'Compost',quantity:'48',unit:'kg',source:'Campus compost unit',status:'Available',events:[['26 Sep, 09:00','Batch created','48 kg weighed and assigned a passport.'],['27 Sep, 11:30','Quality reviewed','Illustrative checklist approved by a trained reviewer; valid through 30 Sep.'],['28 Sep, 09:00','Route proposed','Nursery handoff suggested. No reservation or receipt recorded.']]},
 {code:'ECO-0041',name:'Segregated cardboard',type:'Cardboard',quantity:'56',unit:'kg',source:'Academic block collection',status:'Received',events:[['28 Sep, 08:00','Batch created','56 kg measured at the collection point.'],['28 Sep, 09:00','Transfer dispatched','Sent to the registered demo recycling partner.'],['28 Sep, 11:00','Receipt confirmed','Partner confirmed 56 kg. A single recovery record was created in the fixture.']]},
 {code:'ECO-0040',name:'Mixed paper',type:'Paper',quantity:'24',unit:'kg',source:'Library collection',status:'Dispatched',events:[['27 Sep, 14:00','Batch created','24 kg recorded.'],['28 Sep, 10:00','Transfer dispatched','Awaiting recipient confirmation. No recovery credit yet.']]}
];
