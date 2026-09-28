export type Stream = 'food' | 'water' | 'energy' | 'materials';
export type DemoSite = 'campus' | 'community';
export interface Reading { date: string; food: string; water: string; energy: string; materials: string; }
export interface Recommendation { id: string; stream: Stream; kind: 'Prevent' | 'Reuse' | 'Route'; title: string; description: string; quantity: string; unit: string; status: 'Requires review' | 'Blocked'; reasons: string[]; limitation: string; assignee: string; }
