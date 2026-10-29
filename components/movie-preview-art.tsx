import { useId } from "react";
import type { CinemaSeason } from "@/lib/truck-cinema";

// Original, local vector vignettes. No footage, video player or remote assets.
export function MoviePreviewArt({ season }: { season: CinemaSeason }) {
  const id = useId().replace(/:/g, "");
  const night = `${id}-night`, glow = `${id}-glow`, water = `${id}-water`;
  return <svg className="truck-movie-art" viewBox="0 0 640 360" aria-hidden="true">
    <defs>
      <linearGradient id={night} x2="0" y2="1"><stop stopColor={season === "valentines" ? "#351025" : season === "muertos" ? "#24104d" : "#071b36"} /><stop offset="1" stopColor={season === "valentines" ? "#8f355d" : season === "muertos" ? "#9b3165" : "#25618a"} /></linearGradient>
      <radialGradient id={glow}><stop stopColor={season === "valentines" ? "#ffd5df" : "#ffeeb0"} /><stop offset="1" stopColor={season === "valentines" ? "#f294b9" : "#ffb52e"} stopOpacity="0" /></radialGradient>
      <linearGradient id={water} x2="0" y2="1"><stop stopColor="#1d577b" /><stop offset="1" stopColor="#071829" /></linearGradient>
    </defs>
    <g className="cinema-camera">
      <path fill={`url(#${night})`} d="M-30-20h700v400H-30z" />
      {season === "halloween" ? <>
        <circle cx="140" cy="84" r="64" fill="#adcbd3" opacity=".12" /><circle cx="140" cy="84" r="35" fill="#d4e5dd" />
        <path d="M0 206 48 190l50 16 43-21 60 19 48-14 70 17 65-25 85 21 61-8 110 21v55H0Z" fill="#071725" />
        <path d="M0 233h640v127H0Z" fill={`url(#${water})`} />
        <g fill="#10231d"><path d="m56 99-43 113h90Zm28 45-33 89h67Zm209-56-47 127h93Zm-71 67-30 79h68Z" /><path d="M46 176h17v77H46ZM286 177h16v73h-16Z" /></g>
        <path d="M92 218v-45l62-35 66 34v46Z" fill="#442f30" /><path d="m76 176 78-54 82 54Z" fill="#141b23" /><path d="M113 177h27v27h-27ZM166 177h26v27h-26Z" fill="#ffd484" /><path d="M93 222h128" stroke="#e9be68" strokeWidth="3" opacity=".4" />
        <g className="cinema-mist" fill="none" stroke="#b1d2d4" opacity=".24"><path d="M-20 262q85-17 170 0t180 0 190 0 180 0M15 283q90-16 180 0t190 0 190 0" strokeWidth="8" /><path d="M70 311h180m-120 17h115m-88-79h130" strokeWidth="2" /></g>
        <path d="M352 360v-57q-5-61 48-86l35-7 73 8q61 22 78 142Z" fill="#1a2325" /><path d="m408 218 40 53-43 88m85-135-42 47 51 89" fill="none" stroke="#44504b" strokeWidth="6" />
        <g className="cinema-mask"><path d="M393 114q-3-58 64-58t66 58l-7 88q-19 43-59 43t-59-43Z" fill="#a89478" stroke="#141e25" strokeWidth="9" /><path d="M401 110q-3-46 56-47t58 47l-8 86q-15 34-50 35t-49-35Z" fill="#e1d4ad" /><path d="m416 116 28 7-7 22-24-6Zm55 7 29-7 3 23-25 6Z" fill="#16222a" /><path d="m441 91 16 9 15-9-15 24Zm-25 65 14 3-10 19Zm79 0-14 3 10 19Z" fill="#9d3e33" />{[[439,175],[457,169],[476,175],[435,194],[455,190],[476,194],[448,213],[466,213]].map(([x,y])=><circle key={`${x}-${y}`} cx={x} cy={y} r="4.5" fill="#36413c" />)}</g>
        <path d="m20-10 27 370m-7-270 49-51m-55 94L-5 94M610-10l-26 370m14-224 49-61m-42-1-40-36" stroke="#071119" strokeWidth="19" />
      </> : season === "muertos" ? <>
        <circle cx="340" cy="145" r="190" fill={`url(#${glow})`} opacity=".3" />
        <g fill="#46225e">{[30,80,130,185,240,295,350].map((x,i)=><g key={x}><path d={`M${x} 230v-${75+i%3*22}h44v${75+i%3*22}Z`} /><path d={`m${x-5} ${155-i%3*22} 27-28 27 28Z`} /><path d={`M${x+10} ${180-i%3*22}h9v16h-9Zm18 0h8v16h-8Z`} fill="#ffcf68" /></g>)}</g>
        <path d="M-40 365q210-175 490-108" fill="none" stroke="#9b3821" strokeWidth="79" /><path d="M-40 365q210-175 490-108" fill="none" stroke="#f6a329" strokeWidth="58" /><path d="M-40 365q210-175 490-108" fill="none" stroke="#ffce4e" strokeWidth="4" strokeDasharray="4 14" />
        <path d="M0 35q300 115 640-2" fill="none" stroke="#ffce7e" strokeWidth="3" />{[60,145,230,315,400,485,570].map((x,i)=><path key={x} d={`M${x} ${49+Math.sin(x/200)*30}v40h48v-40Z`} fill={['#e74f83','#ffb53b','#8bb8a1'][i%3]} opacity=".9" />)}
        <g className="cinema-guitar" transform="translate(413 72) rotate(16)"><path d="M34 121q-47-23-60 19-6 24 14 43-41 17-35 57 6 49 60 50 56 2 65-43 7-39-31-62 20-18 15-40-7-30-28-24Z" fill="#f8eccd" stroke="#cf9652" strokeWidth="6" /><path d="M7 135V31h25v104" fill="#b77b43" stroke="#ffdda1" strokeWidth="5" /><path d="M1 15h35v36H1Z" fill="#f8eccd" stroke="#cf9652" strokeWidth="3" /><circle cx="17" cy="183" r="21" fill="#74305b" /><circle cx="17" cy="183" r="13" fill="#241b38" /><path d="M-6 242h47" stroke="#74305b" strokeWidth="10" /><path d="M10 30v218m6-218v218m6-218v218m6-218v218" stroke="#d4b98a" strokeWidth="1.5" /><path d="M-14 221q30 20 64 0m-48-75q15-12 31 0" fill="none" stroke="#b94967" strokeWidth="4" /></g>
        <g className="cinema-petals" fill="#ffc852">{[[80,130],[150,110],[270,190],[355,96],[590,182],[230,48],[540,280],[100,260]].map(([x,y])=><path key={x} d={`M${x} ${y}q12-19 18-3-7 18-18 3Z`} />)}</g>
        <g transform="translate(115 197)"><path d="M-28 29v-25q0-37 38-37t38 37v25l-15 6v21h-45V35Z" fill="#fff0d0" /><circle cx="-2" cy="7" r="12" fill="#9f3e86" /><circle cx="25" cy="7" r="12" fill="#9f3e86" /><path d="m8 25 5-9 5 9M-5 40h35" stroke="#a63465" strokeWidth="4" fill="none" /></g>
      </> : season === "valentines" ? <>
        <circle cx="320" cy="175" r="190" fill={`url(#${glow})`} opacity=".38" />
        <path d="M0 292q165-35 320-4t320 0v72H0Z" fill="#43182e" />
        <ellipse cx="320" cy="300" rx="225" ry="23" fill="#260e20" opacity=".5" />
        <g className="cinema-hearts" fill="#f5a4c4">
          {[[74,120,.8],[137,52,.55],[315,70,1],[507,60,.65],[565,150,.8],[323,220,.6]].map(([x,y,scale]) => <path key={`${x}-${y}`} transform={`translate(${x} ${y}) scale(${scale})`} d="M0 12C-8 3-31-8-31-25c0-24 24-29 31-12 7-17 31-12 31 12C31-8 8 3 0 12Z" />)}
        </g>
        <g transform="translate(157 114)">
          <path d="m69 30-9-79h26" fill="none" stroke="#ffe4b1" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 47h116l-18 139q-38 25-80 0Z" fill="#f4a3b7" stroke="#ffe5d9" strokeWidth="5" />
          <path d="m34 67 11 109m20-109 2 113m25-113-7 109m24-109-13 108" stroke="#ffd2d8" strokeWidth="6" opacity=".85" />
          <ellipse cx="70" cy="47" rx="58" ry="13" fill="#ffe1e4" />
          <path d="M16 38q-12-23 11-32-8-24 18-26 1-24 28-15 25-12 31 13 28 1 23 24 23 13 4 36Z" fill="#fff2da" stroke="#eac5be" strokeWidth="3" />
          <path d="M39 10q29 11 59 0M51-9q22 8 41 1" fill="none" stroke="#d16b8d" strokeWidth="6" strokeLinecap="round" />
          <circle cx="75" cy="-30" r="12" fill="#b92f55" /><path d="M77-39q2-15 14-19" fill="none" stroke="#88a06d" strokeWidth="4" strokeLinecap="round" />
          <path d="M58 193h24v20h27v11H31v-11h27Z" fill="#f7d6cf" />
        </g>
        <g transform="translate(347 114)">
          <path d="m79 27 14-78h26" fill="none" stroke="#f6b7ce" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 47h116l-18 139q-38 25-80 0Z" fill="#ecd0a8" stroke="#ffe9ce" strokeWidth="5" />
          <path d="m34 67 11 109m20-109 2 113m25-113-7 109m24-109-13 108" stroke="#fff0da" strokeWidth="6" opacity=".85" />
          <ellipse cx="70" cy="47" rx="58" ry="13" fill="#f9e8cb" />
          <path d="M16 38q-12-23 11-32-8-24 18-26 1-24 28-15 25-12 31 13 28 1 23 24 23 13 4 36Z" fill="#fff2da" stroke="#dfc1a1" strokeWidth="3" />
          <path d="M38 10q29 11 61 0M51-9q22 8 41 1" fill="none" stroke="#a47154" strokeWidth="6" strokeLinecap="round" />
          <circle cx="74" cy="-30" r="12" fill="#b92f55" /><path d="M76-39q2-15 14-19" fill="none" stroke="#88a06d" strokeWidth="4" strokeLinecap="round" />
          <path d="M58 193h24v20h27v11H31v-11h27Z" fill="#f7d6cf" />
        </g>
      </> : season === "newyear" ? <>
        <path d="M-30-20h700v400H-30Z" fill="#201428" />
        <circle cx="325" cy="155" r="185" fill={`url(#${glow})`} opacity=".3" />
        <path d="M0 290V180h47v55h36v-83h61v74h39v-39h52v103h62V157h57v86h35v-40h55v87h39V169h64v59h39v-31h54v163H0Z" fill="#110e1a" />
        <g fill="#efc47b" opacity=".65">{[20,95,118,197,311,340,400,490,525,582].map((x,i)=><path key={x} d={`M${x} ${227+i%3*14}h7v12h-7Zm0 26h7v12h-7Z`} />)}</g>
        <g className="cinema-fireworks" stroke="#ffdb8b" fill="none" strokeLinecap="round" strokeWidth="5">
          <path d="M112 74V32m0 112v-35M77 76H34m155 0h-43M85 49 58 22m84 81 28 28M85 103l-26 28m84-82 27-27" />
          <path d="M531 102V66m0 104v-35m-32-30h-38m141 0h-38m-55-23-27-27m74 74 27 27m-74-27-27 27m74-74 27-27" stroke="#d9b2ec" />
        </g>
        <circle cx="322" cy="131" r="83" fill="#392437" stroke="#f4c97b" strokeWidth="7" />
        <circle cx="322" cy="131" r="70" fill="#f9e4ad" />
        <g stroke="#866036" strokeWidth="5"><path d="M322 68v12m0 102v12m-63-63h12m102 0h12M277 86l8 8m74 74 8 8m-90 0 8-8m74-74 8-8" /></g>
        <path d="M322 131V86m0 45 25-20" fill="none" stroke="#452c36" strokeWidth="8" strokeLinecap="round" />
        <circle cx="322" cy="131" r="7" fill="#c68a3f" />
        <text x="320" y="285" textAnchor="middle" fill="#ffe3a1" stroke="#3a2332" strokeWidth="2" paintOrder="stroke" fontFamily="Georgia, serif" fontSize="86" fontWeight="bold">2027</text>
      </> : <>
        <circle cx="195" cy="100" r="130" fill={`url(#${glow})`} opacity=".4" />
        <path d="M0 255h640v105H0Z" fill="#9dc1d8" /><path d="M0 273q160-25 325 16t315-5v76H0Z" fill="#d5e7ea" />
        <g fill="#152945" stroke="#233b50" strokeWidth="5"><path d="M28 249V110h108v139ZM155 253V70h98v183ZM485 256V90h110v166Z" /><path d="m15 110 65-57 65 57m0-40 59-52 57 52m209 20 70-62 66 62" /></g>
        <g fill="#ffd58d"><path d="M48 136h25v38H48Zm43 0h25v38H91ZM49 198h25v33H49Zm43 0h25v33H92ZM176 100h24v40h-24Zm32 0h24v40h-24ZM176 163h24v40h-24Zm32 0h24v40h-24ZM503 119h26v40h-26Zm43 0h26v40h-26ZM504 194h26v41h-26Zm43 0h26v41h-26Z" /></g>
        <g className="cinema-ghost" fill="#d8f2df"><path d="M269 168q-8-57 28-57t25 57q-10 29 15 50-25 16-42-5-15 16-39 7 29-22 13-52Z" opacity=".9" /><circle cx="287" cy="145" r="4" fill="#487d81" /><circle cx="306" cy="145" r="4" fill="#487d81" /></g>
        <g transform="translate(388 170)"><path d="M-37 137v-72q-8-39 31-43 42 3 42 43v72Z" fill="#315e96" stroke="#172c42" strokeWidth="5" /><path d="m-21 27 16 32 18-31" fill="#d14442" /><path d="M-25 3q-12-39 17-42 37 0 40 35l-10 27-32-1Z" fill="#f1e4c8" /><path d="m-18 11 52-3-4 13-42 1Z" fill="#e4ae54" /><path d="M-35-25h72v-13H25v-43H-23v43h-12Z" fill="#101e35" /><path d="M-22-44h47v9h-47Z" fill="#a63b4d" /><path d="M33 70q28-25 28 15v57" fill="none" stroke="#b48755" strokeWidth="8" /><circle cx="2" cy="-9" r="10" fill="none" stroke="#94673e" strokeWidth="3" /><path d="M-25 142h29m8 0h28" stroke="#182d47" strokeWidth="12" /></g>
        <g className="cinema-snow" fill="#f1f6ec">{[[40,20],[130,82],[230,30],[327,42],[452,14],[530,60],[602,15],[60,180],[298,260],[570,230],[170,235],[475,156]].map(([x,y])=><circle key={x} cx={x} cy={y} r="3.5" />)}</g>
      </>}
    </g>
    <path d="M0 315h640v45H0Z" fill="#080d1d" opacity=".65" />
  </svg>;
}
