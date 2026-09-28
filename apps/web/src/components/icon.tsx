export type IconName = 'arrow' | 'leaf' | 'water' | 'sun' | 'recycle' | 'grid' | 'spark' | 'box' | 'award' | 'sensor' | 'chart' | 'bell' | 'chevron' | 'check' | 'download' | 'close' | 'menu' | 'search' | 'clock' | 'building' | 'info' | 'external';
const paths: Record<IconName, React.ReactNode> = {
  arrow: <><path d="M4 12h15m-6-6 6 6-6 6" /></>,
  leaf: <><path d="M20 4c-8-1-15 2-15 9a6 6 0 0 0 6 6c7 0 9-7 9-15Z" /><path d="M4 21 15 10M9 16v-5m0 5h5" /></>,
  water: <><path d="M12 3c-3 5-7 8-7 12a7 7 0 0 0 14 0c0-4-4-7-7-12Z" /><path d="M9 16c0 2 1 3 3 3" /></>,
  sun: <><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" /></>,
  recycle: <><path d="m8 5 3-3 3 3m-3-3v5m6 1 4 1 1 4m-1-4-4 3M7 20l-4-1-1-4m1 4 4-3M8 7 5 12m8-6 5 9m-1 4H9" /></>,
  grid: <><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></>,
  spark: <><path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3Z"/><path d="m20 2 1 3 2 1"/></>,
  box: <><path d="m12 3 9 5v9l-9 5-9-5V8l9-5Zm0 9 9-4m-9 4L3 8m9 4v10M7 5l10 6"/></>,
  award: <><circle cx="12" cy="9" r="6"/><path d="m8 14-2 8 6-3 6 3-2-8m-4-8v6m-3-3h6"/></>,
  sensor: <><rect x="7" y="7" width="10" height="10" rx="2"/><path d="M4 8a9 9 0 0 0 0 8m16-8a9 9 0 0 1 0 8M1 5a14 14 0 0 0 0 14M23 5a14 14 0 0 1 0 14"/><circle cx="12" cy="12" r="1"/></>,
  chart: <><path d="M4 3v18h18M8 16v-5m5 5V7m5 9V4"/></>,
  bell: <><path d="M5 16h14l-2-3V9a5 5 0 0 0-10 0v4l-2 3Zm5 4h4"/></>,
  chevron: <path d="m9 5 7 7-7 7"/>,
  check: <path d="m5 12 4 4L19 6"/>,
  download: <path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5"/>,
  close: <path d="m6 6 12 12M6 18 18 6"/>,
  menu: <path d="M4 6h16M4 12h16M4 18h16"/>,
  search: <><circle cx="10" cy="10" r="6"/><path d="m15 15 6 6"/></>,
  clock: <><circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/></>,
  building: <><path d="M4 21V5l10-2v18m0-13h6v13M2 21h20M8 7h2m-2 4h2m-2 4h2m7-3h1m-1 4h1"/></>,
  info: <><circle cx="12" cy="12" r="9"/><path d="M12 11v6m0-10v1"/></>,
  external: <path d="M14 3h7v7m0-7L10 14M10 4H4v16h16v-6"/>
};
export function Icon({name, size = 20, className = ''}: {name: IconName; size?: number; className?: string}) {
  return <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}
