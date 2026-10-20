type IconKind = "pumpkin" | "treat" | "pin" | "bat" | "paw";

// Local illustrations: the glow and movement respond to hover/focus.
export function HalloweenFooterIcon({ kind }: { kind: IconKind }) {
  return <svg className={`footer-nav-icon footer-icon-${kind}`} viewBox="0 0 40 40" fill="none" aria-hidden="true" focusable="false">
    {kind === "pumpkin" && <>
      <path d="M19 12q-2-7 5-9l3 3q-6 0-5 7" fill="#9cba6a" stroke="#426046" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M20 12C8 5-1 21 7 31q5 8 13 4 8 4 13-4c8-10-1-26-13-19Z" fill="currentColor" stroke="#bb542d" strokeWidth="1.5" />
      <path d="M15 13q-8 9-2 20m12-20q8 9 2 20" stroke="#a54b29" strokeWidth="1.5" opacity=".6" />
      <g className="footer-pumpkin-light" fill="#49222d">
        <path d="m10 22 7 1-3-7Zm20 0-7 1 3-7ZM18 26l2-4 2 4Z" />
        <path d="m11 28 5 1 2-2 3 3 3-2 5-1q-8 12-18 1Z" />
      </g>
      <path d="M9 16q2-4 5-3" stroke="#ffe3a3" strokeWidth="2" strokeLinecap="round" opacity=".8" />
    </>}
    {kind === "treat" && <>
      <g transform="rotate(-12 19 23)">
        <rect x="5" y="10" width="26" height="26" rx="7" fill="currentColor" stroke="#b96731" strokeWidth="1.5" />
        <path d="M12 15v16m7-16v16m7-16v16M10 18h17M10 25h17" stroke="#a85b32" strokeWidth="2" strokeLinecap="round" />
        <rect x="15" y="18" width="8" height="7" rx="2" fill="#fff0ba" />
      </g>
      <path className="footer-icon-spark" d="m32 3 1.5 4.5L38 9l-4.5 1.5L32 15l-1.5-4.5L26 9l4.5-1.5Z" fill="#ffda8c" />
    </>}
    {kind === "pin" && <>
      <ellipse cx="20" cy="35" rx="9" ry="2" fill="currentColor" opacity=".22" />
      <g className="footer-pin-marker">
        <path d="M32 16c0 9-12 18-12 18S8 25 8 16a12 12 0 0 1 24 0Z" fill="currentColor" stroke="#ba603b" strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="20" cy="16" r="7" fill="#47202f" />
        <path d="m15 16 3-3m4 0 3 3M16 19q4 4 8 0" stroke="#ffe1a0" strokeWidth="2" strokeLinecap="round" />
        <path d="M12 11q2-4 5-4" stroke="#ffe3a3" strokeWidth="2" strokeLinecap="round" opacity=".8" />
      </g>
    </>}
    {kind === "bat" && <>
      <path className="footer-bat-wing footer-bat-wing-left" d="M19 18Q9 7 2 9q1 9 6 17 2-6 6-3l5 7Z" fill="currentColor" stroke="#8150ad" strokeWidth="1.2" strokeLinejoin="round" />
      <path className="footer-bat-wing footer-bat-wing-right" d="M21 18Q31 7 38 9q-1 9-6 17-2-6-6-3l-5 7Z" fill="currentColor" stroke="#8150ad" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="m15 11 4 5h2l4-5v10q3 10-5 13-8-3-5-13Z" fill="#d9adff" stroke="#8150ad" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="m17 21 1 1m4 0 1-1" stroke="#41233c" strokeWidth="2" strokeLinecap="round" />
    </>}
    {kind === "paw" && <g fill="currentColor" stroke="#b65c43" strokeWidth="1.2">
      <ellipse cx="7" cy="16" rx="4" ry="5.5" transform="rotate(-25 7 16)" />
      <ellipse cx="15" cy="9" rx="4" ry="5.5" transform="rotate(-8 15 9)" />
      <ellipse cx="25" cy="9" rx="4" ry="5.5" transform="rotate(8 25 9)" />
      <ellipse cx="33" cy="16" rx="4" ry="5.5" transform="rotate(25 33 16)" />
      <path d="M20 18c5 0 13 10 10 15-3 4-7 0-10 0s-7 4-10 0c-3-5 5-15 10-15Z" />
      <path d="M17 25q3-4 6 0 0 3-3 5-3-2-3-5Z" fill="#ffe2b6" stroke="none" />
    </g>}
  </svg>;
}
