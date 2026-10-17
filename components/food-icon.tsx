export type FoodKind = "Todo" | "Crepas" | "Malteadas" | "Banderillas" | "Hot dogs" | "Hamburguesas" | "Waffles" | "Postres" | "Snacks" | "Café" | "Frappés" | "ICE";

/** Local illustrations keep the menu independent of icon or image APIs. */
export function FoodIcon({ kind, className = "" }: { kind: FoodKind; className?: string }) {
  return <svg className={`food-icon ${className}`} viewBox="0 0 48 48" fill="none" stroke="#542817" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {kind === "Crepas" ? <>
      <path d="m8 12 17 31 15-31Z" fill="#efad51" /><path d="m12 13 13 24 9-24" fill="#ffe0a0" />
      <path d="M9 13c6-9 24-9 30 0-8 7-22 7-30 0Z" fill="#f9e9ca" /><path d="m15 9 4 8 6-5-4-6Z" fill="#f35b60" /><path d="m29 8-3 8 8-2-1-7Z" fill="#f35b60" /><path d="m18 23 12 4m-9 2 7 2" stroke="#793f2d" />
    </> : (kind === "Malteadas" || kind === "Frappés" || kind === "ICE") ? <>
      <path d="m28 12 5-9h6" stroke="#f67e9b" strokeWidth="3" /><path d="M13 20h23l-4 20H17Z" fill="#f4a5bb" /><path d="M13 20c-4-4 1-8 5-7-1-8 12-9 13-2 6-1 10 4 5 9Z" fill="#fff2d9" /><circle cx="24" cy="8" r="3" fill="#ee4e53" /><path d="M24 41v4m-7 0h14m-11-21 1 12m7-12-1 12" />
    </> : kind === "Banderillas" ? <>
      <path d="m13 41 7-12" stroke="#daa85d" strokeWidth="4" /><rect x="17" y="3" width="16" height="32" rx="8" transform="rotate(25 25 19)" fill="#efb552" /><path d="m25 8 5 6-9 3 6 6-8 3" stroke="#d94c38" strokeWidth="3" />
    </> : kind === "Hot dogs" ? <>
      <path d="M9 18c-5 0-8 14 0 16l28-4c8-2 6-15 0-16Z" fill="#efb75d" /><path d="m10 24 26-4" stroke="#c94e36" strokeWidth="9" /><path d="m10 23 5 4 4-6 5 4 4-6 6 3" stroke="#ffdf6d" strokeWidth="2.5" />
    </> : kind === "Hamburguesas" ? <>
      <path d="M6 20C6 2 42 2 42 20Z" fill="#eeb15a" /><path d="m15 12 2-1m7 3 2-1m6-2 2 1" stroke="#fff1c6" /><path d="M7 24h34" stroke="#82ac64" strokeWidth="6" /><path d="M8 30h32" stroke="#7e4030" strokeWidth="7" /><path d="m12 27 11 8 9-8" fill="#ffd568" /><path d="M6 36h36c0 10-36 10-36 0Z" fill="#eeb15a" />
    </> : kind === "Waffles" ? <>
      <circle cx="24" cy="24" r="17" fill="#eeb35a" /><path d="M15 11v26m9-30v34m9-30v26M11 15h26M7 24h34M11 33h26" stroke="#ad6c30" /><path d="m23 15 8 2-2 8-8-2Z" fill="#ffe0a0" /><circle cx="34" cy="34" r="5" fill="#ed6570" />
    </> : kind === "Café" ? <>
      <path d="M9 20h26v16c0 12-26 12-26 0Z" fill="#ffe6bd" /><path d="M35 22c15-3 13 15 0 11M8 44h29" /><path d="M16 15c-5-6 5-6 0-12m10 12c-5-6 5-6 0-12" stroke="#d5ab79" />
    </> : kind === "Snacks" ? <>
      <path d="m12 9 3 17m6-21 1 20m8-19-2 20m10-17-6 18" stroke="#f7c766" strokeWidth="5" /><path d="m9 23 5 20h20l5-20Z" fill="#e75b48" /><path d="m20 28 1 10m7-10-1 10" stroke="#ffe3a2" />
    </> : kind === "Postres" ? <>
      <path d="M9 28h31L28 42H19Z" fill="#f4b9bf" /><path d="M11 27c-7-9 5-17 12-9 0-15 18-12 17-2 9 6 0 14 0 14" fill="#fff0d4" /><path d="M22 12c-1-7 9-7 9 0" fill="#ef6471" /><path d="m27 7 4-4" />
    </> : <>
      <path d="M4 17h40v23H4Z" fill="#e65b46" /><path d="M9 12h20v14H9Z" fill="#ffd07d" /><path d="M32 21h8v10h-8Z" fill="#ffd07d" /><path d="M7 9h22v5H7Z" fill="#f6e3bb" /><circle cx="13" cy="40" r="5" fill="#62402f" /><circle cx="36" cy="40" r="5" fill="#62402f" />
    </>}
  </svg>;
}
