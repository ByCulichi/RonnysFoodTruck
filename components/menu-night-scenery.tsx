import "./menu-night-scenery.css";

function Lantern({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <ellipse cy="10" rx="30" ry="28" fill="#ffa43c" opacity=".07" />
    <ellipse cy="10" rx="19" ry="18" fill="#ffa43c" opacity=".1" />
    <path d="M0-14V-4" stroke="#cda174" strokeWidth="1.5" />
    <path d="M0-3C-17-10-24 18-10 25q5 3 10 1 5 2 10-1C24 18 17-10 0-3Z" fill="#d9772f" stroke="#ffd28a" strokeWidth="1.2" />
    <path d="M-7 0q-7 11-1 22M7 0q7 11 1 22" stroke="#a64c2f" strokeWidth="1.2" />
    <g fill="#ffe5a0"><path d="m-12 9 8 1-3-6Zm24 0-8 1 3-6ZM-3 13l3-4 3 4Z" /><path d="m-10 16 5 1 2-2 4 3 3-3 6 1q-9 12-20 0Z" /></g>
  </g>;
}

function MarketStall({ drinks = false }: { drinks?: boolean }) {
  const id = drinks ? "drinks" : "waffles";
  return <svg className={`menu-market-stall menu-market-stall-${id}`} viewBox="0 0 360 640" fill="none" focusable="false">
    <defs>
      <linearGradient id={`menu-stall-${id}`} x1="180" y1="150" x2="180" y2="580" gradientUnits="userSpaceOnUse"><stop stopColor="#4c284b" /><stop offset="1" stopColor="#181124" /></linearGradient>
      <radialGradient id={`menu-window-${id}`}><stop stopColor="#ffcb77" stopOpacity=".35" /><stop offset="1" stopColor="#e88b40" stopOpacity="0" /></radialGradient>
    </defs>
    <path d="M31 611q-24-167 6-344l-12-64 23 21-3-122 18 47 15-109 16 86 31-31-24 58 5 50-35 63-8 130 23 78-21 139Z" fill="#100c20" stroke="#9b6384" strokeOpacity=".4" />
    <path d="m62 354-37-45-18-66m69 229 39-46 20-57M53 205l-28-35-13-47" stroke="#84536c" strokeOpacity=".45" strokeWidth="3" />
    <path d="M306 190v360m-4-346q-12-42-38-17" stroke="#a67d69" strokeWidth="4" strokeLinecap="round" />
    <Lantern x={264} y={198} scale={1.15} />
    <path d="M92 323h209v230H92Z" fill={`url(#menu-stall-${id})`} stroke="#a7736c" strokeWidth="2" />
    <ellipse cx="193" cy="366" rx="125" ry="128" fill={`url(#menu-window-${id})`} />
    <path d="m73 323 40-78h167l39 78Z" fill="#42223f" stroke="#c28d83" strokeWidth="2" />
    <path d="m114 245-20 78h37l10-78Zm59 0-3 78h37l-4-78Zm60 0 11 78h37l-20-78Z" fill={drinks ? "#765285" : "#a55143"} />
    <path d="M73 323q10 19 20 0 10 19 20 0 10 19 20 0 10 19 20 0 10 19 20 0 10 19 20 0 10 19 20 0 10 19 20 0 10 19 20 0 10 19 20 0 10 19 20 0 10 19 20 0" fill="#ac6c55" stroke="#e0a77a" strokeWidth="1.5" />
    <path d="M112 354h169v97H112Z" fill="#160e24" stroke="#bd8a67" strokeWidth="2" />
    <path d="M113 355h167v24H113Z" fill="#e9b36d" opacity=".12" />
    {[127, 160, 194, 227, 264].map((x) => <g key={x}><path d={`M${x} 332v11`} stroke="#c58f63" /><circle cx={x} cy="347" r="4" fill="#ffe0a1" /><circle cx={x} cy="347" r="10" fill="#ffd27a" opacity=".1" /></g>)}
    <g transform="translate(128 390)" stroke="#542817" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {drinks ? <><path d="m28 12 5-9h6" stroke="#f67e9b" strokeWidth="3" /><path d="M13 20h23l-4 20H17Z" fill="#f4a5bb" /><path d="M13 20c-4-4 1-8 5-7-1-8 12-9 13-2 6-1 10 4 5 9Z" fill="#fff2d9" /><circle cx="24" cy="8" r="3" fill="#ee4e53" /></> : <><circle cx="24" cy="24" r="17" fill="#eeb35a" /><path d="M15 11v26m9-30v34m9-30v26M11 15h26M7 24h34M11 33h26" stroke="#ad6c30" /><path d="m23 15 8 2-2 8-8-2Z" fill="#ffe0a0" /><circle cx="34" cy="34" r="5" fill="#ed6570" /></>}
    </g>
    <g transform="translate(205 392)" stroke="#542817" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {drinks ? <><path d="M9 20h26v16c0 12-26 12-26 0Z" fill="#ffe6bd" /><path d="M35 22c15-3 13 15 0 11M8 44h29" /><path d="M16 15c-5-6 5-6 0-12m10 12c-5-6 5-6 0-12" stroke="#d5ab79" /></> : <><path d="M6 20C6 2 42 2 42 20Z" fill="#eeb15a" /><path d="M7 24h34" stroke="#82ac64" strokeWidth="6" /><path d="M8 30h32" stroke="#7e4030" strokeWidth="7" /><path d="m12 27 11 8 9-8" fill="#ffd568" /><path d="M6 36h36c0 10-36 10-36 0Z" fill="#eeb15a" /></>}
    </g>
    <path d="M84 452h226v16H84Z" fill="#996744" stroke="#e0a77a" strokeWidth="1.5" />
    <path d="M109 484h174v49H109Z" fill="#22142d" stroke="#a67462" />
    <path d="M118 491h156m-156 8h156m-156 8h156m-156 8h156m-156 8h156" stroke="#89576a" strokeOpacity=".4" />
    <path d="M101 552v20m187-20v20" stroke="#9c7464" strokeWidth="7" />
    <ellipse cx="198" cy="585" rx="140" ry="27" fill="#0d0a19" opacity=".7" />
    <Lantern x={104} y={554} scale={1.35} /><Lantern x={287} y={563} scale={.85} />
    <path d="m144 577 12-7 17 6-14 3-5 11-2-10Zm82 24 11-8 17 7-12 3-5 8-2-8Z" fill="#c28c52" opacity=".6" />
    <path d="M42 611 35 563l21 31 1-54 16 56 19-25-5 41m226 0 9-51 5 33 19-40-9 58" stroke="#69604a" strokeWidth="3" strokeLinecap="round" />
  </svg>;
}

// Static, local SVG scenery. Movement remains in the shared, pausable atmosphere.
export function MenuNightScenery() {
  return <div className="menu-night-scenery" aria-hidden="true">
    <svg className="menu-lantern-canopy" viewBox="0 0 1600 200" preserveAspectRatio="none" fill="none" focusable="false">
      <path d="M-20 5Q400 195 800 44Q1200 195 1620 5" stroke="#d1a27a" strokeWidth="1.5" strokeOpacity=".6" />
      {[45, 175, 310, 445, 580, 715, 885, 1020, 1155, 1290, 1425, 1555].map((x, index) => <Lantern key={x} x={x} y={[34, 75, 102, 111, 101, 71, 71, 101, 111, 102, 75, 34][index]} scale={index % 3 === 0 ? 1.1 : .8} />)}
    </svg>
    <MarketStall />
    <MarketStall drinks />
    <svg className="menu-market-ground" viewBox="0 0 1600 260" preserveAspectRatio="none" fill="none" focusable="false">
      <path d="M0 112Q200 42 400 155T800 146Q1100 34 1300 143T1600 107V260H0Z" fill="#120e22" />
      <path d="M0 155q170-70 340 18t340 4q210-75 420-7t500-15" stroke="#9c5f7644" strokeWidth="2" />
      {[45, 140, 256, 1380, 1470, 1550].map((x, i) => <g key={x} transform={`translate(${x} ${175 + (i % 3) * 15})`}><path d="m-15 5 12-10 18 10-13 3-5 11-2-10Z" fill="#c0874f" opacity=".5" /><path d="m21 23 9-6 14 4-10 4-2 9-3-8Z" fill="#97566b" opacity=".5" /></g>)}
    </svg>
  </div>;
}
