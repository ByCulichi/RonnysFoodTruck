import "./muertos-market-scene.css";

const petals = [0, 45, 90, 135, 180, 225, 270, 315];

function Marigold({ x, y, size = 1 }: { x: number; y: number; size?: number }) {
  return <g transform={`translate(${x} ${y}) scale(${size})`}>
    <path d="M0-34C8-43 21-32 19-24C32-29 42-14 33-7C44-1 38 17 28 17C32 30 16 40 8 31C2 43-15 38-16 28C-30 33-40 17-31 9C-43 3-38-14-28-16C-32-29-15-40-8-31C-5-37-2-37 0-34Z" fill="#dc701c" />
    {petals.map(angle => <ellipse key={angle} rx="9" ry="16" cy="-13" transform={`rotate(${angle})`} fill="#f8a52b" stroke="#e18321" strokeWidth="1.2" />)}
    <circle r="10" fill="#ffc954" />
    <path d="M-6-2q6-8 12 0M-5 4q5-6 10 0" fill="none" stroke="#df8d22" strokeWidth="2" strokeLinecap="round" />
  </g>;
}

function FlowerBranch() {
  return <svg viewBox="0 0 180 360" fill="none" focusable="false">
    <path d="M15 354C59 297 13 231 69 167S88 47 153 9" stroke="#8e6d38" strokeWidth="3" />
    <path d="M46 279C1 281 5 251 5 251C34 248 49 259 46 279ZM52 224C85 220 100 195 100 195C68 188 51 201 52 224ZM83 124C44 127 44 99 44 99C72 93 87 102 83 124ZM100 69C135 70 149 47 149 47C122 38 103 48 100 69Z" fill="#647044" />
    <Marigold x={45} y={285} size={1.1} />
    <Marigold x={79} y={180} size={.8} />
    <Marigold x={111} y={64} />
    <path d="m121 295 9 4-5 12-7-5Zm-35 35 8-4 7 11-9 4ZM21 141l8-5 8 9-8 7Z" fill="#f9a333" />
  </svg>;
}

function PaperFlag({ x, y, color, angle }: { x: number; y: number; color: string; angle: number }) {
  return <g transform={`translate(${x} ${y}) rotate(${angle})`}>
    <path fillRule="evenodd" fill={color} d="M-38 0h76v60l-9-6-10 6-9-6-10 6-9-6-10 6-10-6-9 6Z M0 12l7 10-7 9-7-9Z M-17 24l10 7-10 7-10-7Z M17 24l10 7-10 7-10-7Z M0 33l7 9-7 9-7-9Z M-29 8h8v6h-8Z M21 8h8v6h-8Z M-29 44h8v6h-8Z M21 44h8v6h-8Z" />
    <path d="M-33 4h66" stroke="#ffe0a0" strokeOpacity=".45" strokeWidth="1.5" />
  </g>;
}

/** November decoration only. Every shape is static, local and outside the
 * content flow; campaign art, characters and controls remain independent. */
export function MuertosMarketScene({ className = "" }: { className?: string }) {
  return <div className={`muertos-market-decoration ${className}`} data-season-decoration="muertos" aria-hidden="true">
    <svg className="muertos-papel-canopy" viewBox="0 0 1600 190" preserveAspectRatio="xMidYMin slice" fill="none" focusable="false">
      <path d="M-20 12Q400 142 800 40Q1200 142 1620 12" stroke="#c69862" strokeWidth="2" />
      <PaperFlag x={80} y={39} color="#d99025" angle={9} />
      <PaperFlag x={260} y={67} color="#8c486e" angle={5} />
      <PaperFlag x={440} y={80} color="#dd9a31" angle={0} />
      <PaperFlag x={620} y={68} color="#ad4661" angle={-7} />
      <PaperFlag x={800} y={41} color="#a05ba0" angle={0} />
      <PaperFlag x={980} y={68} color="#dd9a31" angle={7} />
      <PaperFlag x={1160} y={80} color="#ad4661" angle={0} />
      <PaperFlag x={1340} y={67} color="#a05ba0" angle={-5} />
      <PaperFlag x={1520} y={39} color="#d99025" angle={-9} />
    </svg>
    <div className="muertos-flower-branch muertos-flowers-one"><FlowerBranch /></div>
    <div className="muertos-flower-branch muertos-flowers-two"><FlowerBranch /></div>
    <div className="muertos-flower-branch muertos-flowers-three"><FlowerBranch /></div>
    <div className="muertos-flower-branch muertos-flowers-four"><FlowerBranch /></div>
    <svg className="muertos-ofrenda-candles" viewBox="0 0 200 120" fill="none" focusable="false">
      <ellipse cx="100" cy="107" rx="90" ry="11" fill="#d8933e" opacity=".13" />
      <path d="M40 106V49h28v57ZM86 106V72h28v34ZM132 106V34h28v72Z" fill="#edc88e" />
      <path d="M47 49v13q5 8 8 0V49M139 34v13q5 10 9 0V34" stroke="#fff0c3" strokeWidth="3" />
      <path d="M54 46C34 37 52 19 55 13C58 26 69 38 54 46ZM100 69C85 61 98 49 100 43C104 53 112 63 100 69ZM146 31C129 24 144 9 147 3C150 14 160 26 146 31Z" fill="#ffb746" />
      <path d="M53 40q-4-7 2-14q6 9-2 14ZM99 64q-3-5 2-10q5 7-2 10ZM145 25q-3-5 2-12q6 8-2 12Z" fill="#fff0b0" />
    </svg>
  </div>;
}
