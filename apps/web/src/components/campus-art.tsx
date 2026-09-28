export function CampusArt() {
  return <svg className="campus-art" viewBox="0 0 620 520" role="img" aria-labelledby="campus-title campus-desc"><title id="campus-title">A connected circular campus</title><desc id="campus-desc">An illustrative campus links rooftop solar, a cafeteria, a water tank, a garden, and resource collection through a circular loop.</desc>
  <defs><linearGradient id="ground" x2="0" y2="1"><stop stopColor="#dae9ba"/><stop offset="1" stopColor="#bed29a"/></linearGradient><linearGradient id="wall" x2="1" y2="0"><stop stopColor="#f6f4df"/><stop offset="1" stopColor="#d4d6c1"/></linearGradient><linearGradient id="tree" x2="1" y2="1"><stop stopColor="#7d9e45"/><stop offset="1" stopColor="#395d31"/></linearGradient><filter id="shadow"><feGaussianBlur stdDeviation="11"/></filter><pattern id="solar" width="27" height="20" patternUnits="userSpaceOnUse"><rect width="27" height="20" fill="#244c48"/><path d="M0 0h27v20H0Z" fill="none" stroke="#7ca6a1" strokeWidth="1.3"/></pattern></defs>
  <ellipse cx="312" cy="433" rx="231" ry="45" fill="#436139" opacity=".13" filter="url(#shadow)"/>
  <path d="m53 330 250-151 264 147v28L312 509 53 357Z" fill="#a9bd8a"/><path d="m53 330 250-151 264 147-255 155Z" fill="url(#ground)"/>
  <path d="m89 330 214-123 226 123-217 125Z" fill="none" stroke="#eff1d8" strokeWidth="27" strokeLinejoin="round"/>
  <path d="M162 405c72 51 204 35 278-32M133 303c37-65 159-95 255-63" fill="none" stroke="#477647" strokeWidth="3" strokeDasharray="7 7"/>
  <path d="m425 371 19-3-9 16m-60-151 17 8-20 6" fill="none" stroke="#477647" strokeWidth="3" strokeLinecap="round"/>
  <g><path d="m162 221 143-81 136 80v119l-143 81-136-81Z" fill="#bec7ae"/><path d="m162 221 136 78v121l-136-81Z" fill="url(#wall)"/><path d="m298 299 143-79v119l-143 81Z" fill="#b7c0ab"/><path d="m151 216 153-87 149 86-155 89Z" fill="#f6f4e3"/><path d="m166 215 138-77 133 77-139 79Z" fill="#d9dfcc"/>
  <path d="m206 205 92-52 94 54-94 53Z" fill="#244c48"/><path d="m206 205 92-52 94 54-94 53Z" fill="url(#solar)"/>
  <path d="m206 205 92 55v9l-92-55Zm92 55 94-53v9l-94 53Z" fill="#173d35"/>
  {[0,1,2,3].map(i=><g key={i}><path d={`m${181+i*27} ${254+i*15.4} 17 10v28l-17-10Z`} fill="#5a7a67"/><path d={`m${181+i*27} ${258+i*15.4} 17 10`} stroke="#9ab5a0"/></g>)}
  {[0,1,2,3].map(i=><path key={i} d={`m${316+i*28} ${304-i*16} 18-10v28l-18 10Z`} fill="#486f5c"/>)}
  <path d="m250 353 26 15v40l-26-15Z" fill="#365742"/><path d="m168 310 58 34v9l-58-34Z" fill="#f7f6e6"/>
  <text x="213" y="328" fill="#47704e" fontSize="10" fontWeight="700" transform="rotate(30 213 328)">ECOLOOP CAMPUS</text></g>
  <g transform="translate(109 292)"><path d="m0 15 28-16 27 16v40L28 72 0 55Z" fill="#a9c9c5"/><ellipse cx="28" cy="14" rx="28" ry="16" fill="#d3e7df"/><path d="M0 15v27c0 21 55 21 55 0V15" fill="#accbc3"/><ellipse cx="28" cy="40" rx="27" ry="15" fill="#719f98"/><path d="M0 40v16c0 21 55 21 55 0V40c0 20-55 20-55 0" fill="#7aaba3"/><path d="M9 17v31" stroke="#f6faf0" strokeWidth="4" opacity=".7"/></g>
  <g><path d="m365 410 59-34 62 34-59 35Z" fill="#557240"/><path d="m373 410 51-29 53 29-50 30Z" fill="#6f7143"/>{[0,1,2].map(i=><g key={i}><path d={`m${383+i*16} ${414+i*9} 43-25`} stroke="#b5c68c" strokeWidth="4"/>{[0,1,2,3].map(j=><ellipse key={j} cx={386+i*16+j*10} cy={408+i*9-j*5.8} rx="6" ry="8" fill={i===1?'#85a656':'#426b3b'}/>)}</g>)}</g>
  {[[104,249,1],[472,294,1.1],[484,363,.8],[179,415,.7],[385,186,.75],[146,211,.7],[336,444,.65]].map(([x,y,s],i)=><g key={i} transform={`translate(${x} ${y}) scale(${s})`}><ellipse cy="37" rx="23" ry="10" fill="#52723c" opacity=".18"/><path d="M0 3v34" stroke="#697243" strokeWidth="6"/><ellipse cy="-10" rx="24" ry="36" fill="url(#tree)"/><ellipse cx="-9" cy="-17" rx="13" ry="25" fill="#90ae56" opacity=".5"/></g>)}
  <g transform="translate(248 438)"><path d="m0 0 15-8 14 8v23l-14 8L0 23Z" fill="#4d7650"/><path d="m0 0 15-8 14 8-14 8Z" fill="#87a76a"/><path d="m33-19 15-8 14 8v23L48 12 33 4Z" fill="#be9e54"/><path d="m33-19 15-8 14 8-14 8Z" fill="#e0c477"/></g>
  <g fill="#476544"><circle cx="537" cy="242" r="3"/><circle cx="81" cy="192" r="4"/><circle cx="438" cy="138" r="3"/></g>
  </svg>;
}
