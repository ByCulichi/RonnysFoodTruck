type IconKind = "pumpkin" | "spider" | "bat" | "ghost" | "paw";

export function HalloweenFooterIcon({ kind }: { kind: IconKind }) {
  return <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" focusable="false">
    {kind === "pumpkin" && <><path d="m16 8 2-5 4 1-4 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" /><path d="M16 9C5 4-3 23 8 28c3 2 5 0 8 1 3-1 5 1 8-1C35 23 27 4 16 9Z" fill="currentColor" /><path d="m8 16 5 1-3-4Zm16 0-5 1 3-4Zm-14 6 4 2 2-2 2 2 4-2-2 5h-8Z" fill="#2c1637" /></>}
    {kind === "spider" && <g stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M16 1v10M10 14 5 8M10 17 2 14M10 21 2 23M11 24l-6 6M22 14l5-6M22 17l8-3M22 21l8 2M21 24l6 6" /><ellipse cx="16" cy="20" rx="7" ry="9" fill="currentColor" /><path d="M14 17v1m4-1v1" stroke="#2c1637" /></g>}
    {kind === "bat" && <path d="m16 12-3-6-1 6C7 7 3 5 0 5c2 6 4 14 7 16 2-4 5-2 9 6 4-8 7-10 9-6 3-2 5-10 7-16-3 0-7 2-12 7l-1-6-3 6Z" fill="currentColor" />}
    {kind === "ghost" && <><path d="M6 15a10 10 0 0 1 20 0v14l-5-3-5 3-5-3-5 3Z" fill="currentColor" /><ellipse cx="12" cy="16" rx="2" ry="3" fill="#2c1637" /><ellipse cx="20" cy="16" rx="2" ry="3" fill="#2c1637" /><path d="M13 22q3 3 6 0" stroke="#2c1637" strokeWidth="2" strokeLinecap="round" /></>}
    {kind === "paw" && <g fill="currentColor"><ellipse cx="6" cy="13" rx="3.4" ry="5" transform="rotate(-25 6 13)" /><ellipse cx="13" cy="7" rx="3.4" ry="5" /><ellipse cx="21" cy="8" rx="3.4" ry="5" transform="rotate(15 21 8)" /><ellipse cx="27" cy="15" rx="3.4" ry="5" transform="rotate(30 27 15)" /><path d="M16 15c4 0 11 8 8 12-3 3-5-1-8-1s-5 4-8 1c-3-4 4-12 8-12Z" /></g>}
  </svg>;
}
