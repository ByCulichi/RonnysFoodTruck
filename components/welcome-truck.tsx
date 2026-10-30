import { useId } from "react";
import type { CinemaSeason } from "@/lib/truck-cinema";
import { activeWelcomeSeason } from "@/lib/welcome-season";

const seasonalColors = {
  halloween: { ribbon: "#713594", accent: "#ffc346", screen: "#18213d" },
  muertos: { ribbon: "#a32979", accent: "#ff9d27", screen: "#4e235a" },
  christmas: { ribbon: "#1d694b", accent: "#ffdc98", screen: "#213c59" },
  newyear: { ribbon: "#2c2037", accent: "#f4cd78", screen: "#26172e" },
  valentines: { ribbon: "#9c284b", accent: "#ffbbd1", screen: "#63283f" },
} as const;

function Wheel({ x, y, back = false }: { x: number; y: number; back?: boolean }) {
  const rx = back ? 39 : 45, ry = back ? 52 : 62;
  return <g transform={`translate(${x} ${y})`}>
    <ellipse rx={rx + 7} ry={ry + 7} fill="#160f18" stroke="#3e2631" strokeWidth="5" />
    <ellipse rx={rx} ry={ry} fill="#25212a" stroke="#100e16" strokeWidth="4" />
    <ellipse rx={rx - 10} ry={ry - 11} fill="#423941" stroke="#68575b" strokeWidth="3" />
    <ellipse rx={rx - 17} ry={ry - 19} fill="#a79a95" stroke="#e7d6bd" strokeWidth="3" />
    <ellipse rx="11" ry="15" fill="#65565b" stroke="#d8c5b2" strokeWidth="3" />
    <path d={`M-9-${ry - 22} 0-${ry - 30} 9-${ry - 22}M-9 ${ry - 22} 0 ${ry - 30} 9 ${ry - 22}`} fill="none" stroke="#eee0cb" strokeWidth="3" />
    {[-1, 1].map(side => <g key={side} fill="#e7d6bd"><ellipse cx={side * 17} cy="-11" rx="3" ry="4" /><ellipse cx={side * 17} cy="11" rx="3" ry="4" /></g>)}
  </g>;
}

function Shake({ x, y, chocolate = false }: { x: number; y: number; chocolate?: boolean }) {
  return <g transform={`translate(${x} ${y})`} stroke="#63312d" strokeWidth="2.5" strokeLinejoin="round">
    <path d="m7 0-3-24h5l5 24" fill="#dd5b62" stroke="#ffe8c6" strokeWidth="2" />
    <path d="M0 1h28l-3 48H4Z" fill={chocolate ? "#94583a" : "#ef8b9f"} />
    <path d="M7 7v32m7-32v35m7-35v32" stroke={chocolate ? "#d39b71" : "#ffd6d4"} strokeWidth="2" />
    <path d="M-2 1q-5-8 2-12-1-10 10-10 2-10 10-5 11 0 9 12 8 6 2 15Z" fill="#fff0d3" />
    <path d="M4-9q11 6 21 0" fill="none" stroke={chocolate ? "#8b4332" : "#dc526f"} />
    <circle cx="15" cy="-22" r="4" fill="#ba343d" strokeWidth="1.5" />
  </g>;
}

function Marigold({ x, y, small = false }: { x: number; y: number; small?: boolean }) {
  return <g transform={`translate(${x} ${y}) scale(${small ? .65 : 1})`} fill="#f7a32b" stroke="#b65520" strokeWidth="1.5">
    {[0, 60, 120].map(angle => <ellipse key={angle} rx="12" ry="5" transform={`rotate(${angle})`} />)}
    <circle r="5" fill="#ffcc44" />
  </g>;
}

function Heart({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return <path transform={`translate(${x} ${y}) scale(${scale})`} d="M0 10C-5 4-17-3-17-12c0-13 13-16 17-6 4-10 17-7 17 6C17-3 5 4 0 10Z" fill="#f49bb8" stroke="#9d3252" strokeWidth="2" />;
}

/** Original vector truck, drawn from the approved illustration rather than a location photo. */
export function WelcomeTruck({ season = activeWelcomeSeason }: { season?: CinemaSeason }) {
  const id = `welcome-truck-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const colors = seasonalColors[season];
  const christmas = season === "christmas";
  return <svg className="roo-welcome-truck" viewBox="0 0 1000 600" data-truck-season={season} aria-hidden="true" focusable="false">
    <defs>
      <linearGradient id={`${id}-red`} x1="0" y1="0" x2=".2" y2="1"><stop stopColor="#fa4737" /><stop offset=".46" stopColor="#d51d25" /><stop offset="1" stopColor="#921d27" /></linearGradient>
      <linearGradient id={`${id}-hood`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#ff7146" /><stop offset=".45" stopColor="#dd2828" /><stop offset="1" stopColor="#9d1a29" /></linearGradient>
      <linearGradient id={`${id}-glass`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#293649" /><stop offset=".48" stopColor="#5b4546" /><stop offset="1" stopColor="#171f31" /></linearGradient>
      <linearGradient id={`${id}-steel`} x1="0" y1="0" x2="0" y2="1"><stop stopColor="#efe4d0" /><stop offset=".25" stopColor="#b6aba3" /><stop offset=".55" stopColor="#736d76" /><stop offset="1" stopColor="#d8c3ae" /></linearGradient>
      <linearGradient id={`${id}-interior`} x1="0" y1="0" x2="0" y2="1"><stop stopColor="#ffdb73" /><stop offset=".55" stopColor="#e99c39" /><stop offset="1" stopColor="#a9562c" /></linearGradient>
      <radialGradient id={`${id}-lamp`}><stop stopColor="#fff1b4" /><stop offset=".45" stopColor="#ffd16b" stopOpacity=".55" /><stop offset="1" stopColor="#ffbf5c" stopOpacity="0" /></radialGradient>
    </defs>
    <ellipse cx="479" cy="540" rx="432" ry="29" fill="#080713" opacity=".42" />
    <ellipse cx="258" cy="553" rx="90" ry="11" fill="#e5a45d" opacity=".12" />
    <ellipse cx="789" cy="532" rx="77" ry="9" fill="#e5a45d" opacity=".12" />

    {/* The serving side meets the cab face at the left-front wheel. */}
    <g stroke="#4c1d28" strokeWidth="5" strokeLinejoin="round" strokeLinecap="round">
      <path d="M299 103 866 153q28 3 29 33v291l-542 35-46-39Z" fill={`url(#${id}-red)`} />
      <path d="M85 337 148 179 294 117l61 5v389L59 478 38 399Z" fill={`url(#${id}-hood)`} />
      <path d="m144 139 149-55 564 44 38 33-544-42-177 54Z" fill="#f74232" />
      <path d="m173 174 180-55 541 42v22l-542-44-192 55Z" fill="#ba2027" />
      <path d="m160 158 191-54 517 43" fill="none" stroke="#ffb05c" strokeWidth="4" />
      <path d="m511 99 8-25 86 7 17 27" fill={`url(#${id}-steel)`} strokeWidth="4" />
      <path d="m533 88 53 5m-55 3 58 5" stroke="#504450" strokeWidth="3" />
      {/* Windshield, door, mirrors and wipers retain the step-van shape. */}
      <path d="m154 193 72-23-20 139-112 24Z" fill={`url(#${id}-glass)`} stroke="#79282e" strokeWidth="8" />
      <path d="m237 168 63-19v139l-83 18Z" fill={`url(#${id}-glass)`} stroke="#79282e" strokeWidth="8" />
      <path d="m166 195 29-10-59 126-25 5Zm88-20 26-8-43 120-13 3Z" fill="#c3a9a0" opacity=".14" stroke="none" />
      <path d="m99 323 75-18 27 5m20-14 47-10 22 4" fill="none" stroke="#201e2b" strokeWidth="6" />
      <path d="M326 154 366 162v213l-45-4Z" fill="#c2292b" />
      <path d="m330 173 26 4v126l-27-4Z" fill={`url(#${id}-glass)`} stroke="#2d2633" strokeWidth="4" />
      <path d="m335 180 7 1v107l-7-2" fill="#d0b7a5" opacity=".2" stroke="none" />
      <path d="M351 319v20" stroke="#d5c2ab" strokeWidth="6" />
      <path d="m311 190-14-4v109l15 3" fill="none" stroke="#d7bfa9" strokeWidth="4" />
      <path d="m295 200-12-4v40l12 3Zm0 57-12-3v36l12 3Z" fill={`url(#${id}-steel)`} stroke="#34303b" strokeWidth="3" />
      {/* Open yellow service window and stainless counter. */}
      <path d="m382 183 477 38v184l-477-31Z" fill="#8c3328" strokeWidth="7" />
      <path d="m390 194 459 36v159l-459-30Z" fill={`url(#${id}-interior)`} stroke="#e39a48" strokeWidth="4" />
      <path d="m373 180 491 39 30-9-497-47Z" fill="#e3402c" />
      <path d="m377 185 487 39" stroke="#ffc876" strokeWidth="6" />
      <path d="m393 202 12 144m428-108-5 138" stroke="#542c2b" strokeWidth="4" />
      <path d="m391 365 467 30 18 13-493-31Z" fill={`url(#${id}-steel)`} stroke="#66505a" strokeWidth="4" />
      <path d="m385 378 486 31-7 14-474-33Z" fill="#73544b" strokeWidth="3" />
      <path d="m409 391-12 30m437 0 14 23" stroke="#29232f" strokeWidth="5" />
      {/* Lower red panels, steps, grille and warm headlamps. */}
      <path d="m69 342 153-31 81 18 9 96-251 23Z" fill={`url(#${id}-hood)`} />
      <path d="m224 330 73-15 10 103-66 17Z" fill="#cf282a" />
      <path d="m57 357 91-15 2 93-96 7Z" fill="#302735" stroke={`url(#${id}-steel)`} strokeWidth="7" />
      {[360, 376, 392, 408, 424].map(y => <path key={y} d={`m67 ${y} 72-10`} stroke="#baa798" strokeWidth="4" />)}
      <path d="m163 339 43-8 6 103-42 7Z" fill="#d32c2d" />
      <path d="m237 350 44-8m-42 20 43-8m-42 20 42-8" stroke="#f6bb76" strokeWidth="4" />
      <path d="m39 449 263-17 3 30-265 18Z" fill={`url(#${id}-steel)`} stroke="#7a6466" strokeWidth="4" />
      <path d="m364 474 503-29v21l-500 32Z" fill="#d97947" strokeWidth="3" />
      <path d="m468 425 139 9v43l-139-8Z" fill="#bd232d" stroke="#e5523b" strokeWidth="3" />
      <path d="m370 433 53 4v46l-53-4Z" fill="#663c3e" />
      <path d="m376 445 38 3m-39 10 39 3m-39 9 38 2" stroke="#bd9f8b" strokeWidth="3" />
      <circle cx="41" cy="391" r="35" fill={`url(#${id}-lamp)`} stroke="none" />
      <circle cx="187" cy="377" r="37" fill={`url(#${id}-lamp)`} stroke="none" />
      <ellipse cx="42" cy="391" rx="12" ry="22" fill="#ffdc82" stroke="#e5a65f" strokeWidth="3" />
      <ellipse cx="187" cy="377" rx="16" ry="25" fill="#ffe9a5" stroke="#e5a65f" strokeWidth="3" />
      <path d="m26 428 20-2v9l-20 1Zm151-15 20-2v10l-20 2Z" fill="#e88b36" strokeWidth="3" />
    </g>
    <path d="M251 494q-8-91 55-98 65-2 60 100" fill="#7b2029" stroke="#f04a36" strokeWidth="6" />
    <path d="M736 480q-4-81 44-85 53-3 51 76" fill="#781f28" stroke="#ef4a35" strokeWidth="5" />
    <Wheel x={307} y={474} /><Wheel x={782} y={456} back />

    {/* All food and the tiny screen are local vectors; there is no second Roo. */}
    <g transform="translate(405 213) skewY(4)">
      <path d="M0 0h420" stroke="#71402b" strokeWidth="3" />
      {[24, 87, 154, 221, 288, 354, 410].map((x, index) => <g key={x}>
        <path d={`M${x} 0v${[9, 17, 20, 21, 17, 11, 4][index]}`} stroke="#754025" strokeWidth="2" />
        <ellipse cx={x} cy={[16, 24, 27, 28, 24, 18, 11][index]} rx="7" ry="10" fill="#ffdf82" />
        <ellipse cx={x - 2} cy={[14, 22, 25, 26, 22, 16, 9][index]} rx="2" ry="5" fill="#fff3bd" />
      </g>)}
      <path d="M23 63h62v63H23Z" fill="#8c5c3f" stroke="#d69a56" strokeWidth="3" />
      {[77, 88, 99, 110].map(y => <path key={y} d={`M31 ${y}h45`} stroke="#d2a469" strokeWidth="3" />)}
      <rect x="105" y="38" width="103" height="61" rx="4" fill="#35252f" stroke="#d2a267" strokeWidth="4" />
      <rect x="112" y="44" width="89" height="47" rx="2" fill={colors.screen} />
      <path d="M150 100v10m-12 0h34" stroke="#674438" strokeWidth="4" />
      {season === "halloween" && <g fill="#e0e9d0"><circle cx="133" cy="59" r="9" fill="#e9d8a0" /><path d="M164 88V72q0-13 10-13t10 13v16l-6-4-5 4-5-4Z" /><circle cx="170" cy="70" r="1.7" fill="#384254" /><circle cx="178" cy="70" r="1.7" fill="#384254" /></g>}
      {season === "muertos" && <g fill="#f6b53a"><circle cx="128" cy="73" r="6" /><circle cx="144" cy="66" r="6" /><circle cx="159" cy="73" r="6" /><circle cx="175" cy="66" r="6" /><path d="M122 82h62v3h-62Z" /></g>}
      {christmas && <g fill="#ebf3df"><path d="m156 49-19 28h13l-10 9h34l-10-9h13Z" fill="#65a184" /><circle cx="126" cy="56" r="2" /><circle cx="188" cy="63" r="2" /><circle cx="177" cy="82" r="2" /></g>}
      {season === "newyear" && <g stroke="#efd28c" strokeWidth="2" fill="none"><circle cx="156" cy="68" r="16" /><path d="M156 55v13l7-8m-31-9-4-5m52 8 6-5m-54 35-5 4m54-5 5 4" /></g>}
      {season === "valentines" && <><Heart x={140} y={70} scale={.45} /><Heart x={172} y={70} scale={.45} /></>}
      <g stroke="#8e4b27" strokeWidth="2" fill="#e9a23c">
        {[0, 1, 2].map(i => <g key={i} transform={`translate(${81 + i * 31} ${133 - i * 8})`}><rect width="27" height="22" rx="4" />{[7, 14, 21].map(x => <path key={x} d={`M${x} 4v14`} stroke="#aa5e29" strokeWidth="1.5" />)}<path d="M3 8h21M3 15h21" stroke="#aa5e29" strokeWidth="1.5" /></g>)}
      </g>
      <Shake x={215} y={101} /><Shake x={251} y={102} chocolate /><Shake x={288} y={104} />
      <g transform="translate(332 107) rotate(10)" stroke="#8f4027" strokeWidth="2.5" strokeLinejoin="round">
        <path d="M0 16q1-17 11-18 15 0 18 51-4 14-14 7Z" fill="#edb360" />
        <path d="M8 6q8 4 13 43" fill="none" stroke="#af412b" strokeWidth="9" strokeLinecap="round" />
        <path d="m8 7 8 6-7 7 10 6-7 8 10 7-6 7" fill="none" stroke="#ffcf49" strokeWidth="3" />
      </g>
      <g transform="translate(369 112) rotate(13)" stroke="#8f4027" strokeWidth="2.5" strokeLinejoin="round"><path d="M0 15q2-15 11-16 15 0 18 47-4 13-14 7Z" fill="#edb360" /><path d="M8 6q8 4 13 37" fill="none" stroke="#af412b" strokeWidth="9" strokeLinecap="round" /><path d="m8 7 8 6-7 7 10 6-7 8 10 7" fill="none" stroke="#ffcf49" strokeWidth="3" /></g>
    </g>

    {/* Decorations follow the explicit campaign, never the visitor's clock. */}
    <path d="m380 191 467 37" fill="none" stroke={colors.ribbon} strokeWidth="5" />
    {season === "halloween" && <g fill="#24152a" stroke="#602138" strokeWidth="1.5"><path d="m466 225-14-8-12 7-13-17 3 28 15-2 8 8 9-8 16 6 4-24Z" /><path d="m637 240-14-8-12 7-13-17 3 28 15-2 8 8 9-8 16 6 4-24Z" /><path d="m784 254-14-8-12 7-13-17 3 28 15-2 8 8 9-8 16 6 4-24Z" /></g>}
    {season === "muertos" && <>{[400, 443, 486, 530, 575, 620, 666, 711, 757, 803, 845].map((x, i) => <Marigold key={x} x={x} y={194 + i * 3.4} small />)}<Marigold x={441} y={425} /><Marigold x={464} y={441} small /><Marigold x={842} y={444} /></>}
    {christmas && <>
      <path d="m178 142 171-54 507 44" fill="none" stroke="#e3ece6" strokeWidth="11" strokeLinecap="round" />
      <path d="m383 185 464 36" fill="none" stroke="#246e4b" strokeWidth="13" />
      {[423, 489, 556, 624, 691, 759, 827].map((x, i) => <circle key={x} cx={x} cy={190 + i * 5.1} r="5" fill="#e74e4e" stroke="#ffb391" strokeWidth="1.5" />)}
      <path d="m536 192-19-13-4 11 18 7-18 9 6 9 17-18 15 16 8-10-18-8 20-5-2-12Z" fill="#cf3d43" stroke="#7b2735" strokeWidth="2" />
    </>}
    {season === "newyear" && <g fill="#efcb77" stroke="#61402c" strokeWidth="1.5">{[430, 504, 578, 652, 726, 800].map((x, i) => <path key={x} transform={`translate(${x} ${216 + i * 5.7}) scale(.75)`} d="m0-14 4 9 10 1-8 7 3 11-9-6-9 6 3-11-8-7 10-1Z" />)}<path d="m459 430 5 11 12 1-9 8 3 12-11-7-10 7 3-12-9-8 12-1Z" /></g>}
    {season === "valentines" && <>{[433, 513, 593, 673, 753, 833].map((x, i) => <Heart key={x} x={x} y={222 + i * 6} scale={.6} />)}<Heart x={460} y={438} scale={.8} /><Heart x={844} y={443} scale={.65} /></>}
    <path d="m104 524 135 10m134-2 149 6m101-13 124-5" stroke={colors.accent} strokeWidth="4" strokeLinecap="round" opacity=".12" />
  </svg>;
}
