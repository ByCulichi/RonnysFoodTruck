import { useId } from "react";

/** The bacon burger is a local visual prop, without a price or invented offer. */
export function WelcomeBurger() {
  const clothId = `welcome-tablecloth-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const clothDrape = "M11 224Q160 257 309 224L306 263Q301 290 279 291L252 282Q213 312 162 306Q113 314 71 283Q47 299 24 283Q12 276 11 259Z";
  const sesame = [
    [72, 70, -24], [104, 49, 28], [143, 39, -20], [184, 42, 26],
    [224, 59, -24], [254, 83, 20], [121, 78, 16], [164, 62, -27],
    [201, 85, 25], [82, 91, 12], [152, 93, -12], [230, 94, -32],
  ];

  return <g data-roo-part="burger" aria-hidden="true" opacity="0">
    <svg data-burger-art="true" data-burger-kind="tocinera" x="972" y="765" width="314" height="226" viewBox="0 0 320 230" overflow="visible">
      {/* A real support shares the burger's stationary coordinate system. Its
          feet land at y=1230 in Roo's canvas, on the same pavement as his paws. */}
      <g data-welcome-table="true">
        <defs>
          <linearGradient id={`${clothId}-linen`} x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#fff0cb" /><stop offset=".65" stopColor="#f3d8a5" /><stop offset="1" stopColor="#deb77d" />
          </linearGradient>
          <pattern id={`${clothId}-checks`} width="24" height="24" patternUnits="userSpaceOnUse">
            <rect width="12" height="12" fill="#a62d43" /><rect x="12" y="12" width="12" height="12" fill="#a62d43" />
          </pattern>
          <clipPath id={`${clothId}-drape`}><path d={clothDrape} /></clipPath>
        </defs>
        <ellipse data-table-ground-shadow="true" cx="160" cy="473" rx="142" ry="12" fill="#10091b" opacity=".25" />
        <g stroke="#291b25" strokeLinejoin="round" strokeLinecap="round">
          {/* Rear legs and bracing sit behind the wooden tabletop/front legs. */}
          <path d="m77 237-23 226h18l25-224Zm166 0 23 226h-18l-25-224Z" fill="#42313a" strokeWidth="4" />
          <path d="m86 277 153 160m-5-160L81 437" fill="none" stroke="#694735" strokeWidth="10" />
          <path d="M70 393h180" fill="none" stroke="#4d3231" strokeWidth="12" />
          <path d="m55 242-24 231h20l25-230Zm210 0 24 231h-20l-25-230Z" fill="#392531" strokeWidth="5" />
          <path d="m47 469 13-151m213 151-13-151" fill="none" stroke="#765145" strokeWidth="3" />
          <path d="M22 475h36m204 0h36" fill="none" stroke="#231722" strokeWidth="7" />
          {/* The plate rests on this shallow, solid wood surface. */}
          <path d="M9 222h302v17c0 26-302 26-302 0Z" fill="#77402e" strokeWidth="5" />
          <ellipse data-table-surface="true" cx="160" cy="222" rx="151" ry="20" fill="#b87546" strokeWidth="5" />
          <path d="M22 230q138 28 276 0" fill="none" stroke="#e1a763" strokeWidth="3" />
          <path d="M40 219q40-10 74-5m91-1q39-3 69 5" fill="none" stroke="#d59558" strokeWidth="2.5" />
          <circle cx="55" cy="250" r="3.5" fill="#c28b55" stroke="none" />
          <circle cx="265" cy="250" r="3.5" fill="#c28b55" stroke="none" />
        </g>
        {/* The linen follows the round top, then folds over the solid edge.
            A short checked hem echoes the printed menu without hiding the legs. */}
        <g data-tablecloth="true" stroke="#6b3b35" strokeLinejoin="round" strokeLinecap="round">
          <path d={clothDrape} fill={`url(#${clothId}-linen)`} strokeWidth="3.5" />
          <g clipPath={`url(#${clothId}-drape)`}>
            <path d="M8 258Q28 286 70 269Q112 300 161 292Q209 301 251 269Q288 288 310 255L316 315H4Z" fill={`url(#${clothId}-checks)`} stroke="none" />
            <path d="M12 258Q30 278 70 268Q114 295 161 289Q209 296 251 268Q289 280 308 257" fill="none" stroke="#fff0ca" strokeWidth="3" />
            <path d="M42 237Q44 258 52 275M82 244Q79 260 71 282M124 249Q126 273 118 293M194 249Q187 275 192 296M240 243Q243 264 252 281M282 235Q280 258 272 276" fill="none" stroke="#bd8e59" strokeWidth="4" opacity=".55" />
            <path d="M57 242Q57 258 62 270M140 251Q145 273 140 291M215 247Q207 269 211 289M294 235Q294 253 286 269" fill="none" stroke="#fff2d0" strokeWidth="5" opacity=".7" />
          </g>
          <ellipse cx="160" cy="222" rx="151" ry="20" fill="#fff0cd" strokeWidth="3.5" />
          <path d="M17 222Q160 251 303 222" fill="none" stroke="#d5ad76" strokeWidth="3" />
        </g>
      </g>
      <ellipse cx="160" cy="211" rx="139" ry="13" fill="#160e1b" opacity=".16" />
      <g stroke="#382019" strokeWidth="5" strokeLinejoin="round" strokeLinecap="round">
        {/* The shallow plate remains visible around the bottom bun. */}
        <path d="M17 193Q160 172 303 193L294 207Q160 233 26 207Z" fill="#d7a674" />
        <ellipse cx="160" cy="193" rx="143" ry="17" fill="#fff0cb" />
        <ellipse cx="160" cy="192" rx="119" ry="9" fill="#f3d294" stroke="#d5a06a" strokeWidth="2" />

        {/* Golden lower bun and its warm front edge. */}
        <path d="M42 159Q160 146 278 159L276 181C274 205 46 205 44 181Z" fill="#efaa46" />
        <path d="M47 180Q160 195 273 180L271 189Q160 211 49 189Z" fill="#cf7932" stroke="none" />
        <path d="M57 177Q160 188 262 176" fill="none" stroke="#ffd17a" strokeWidth="5" />

        {/* Beef, melted cheese, tomato and crisp lettuce read as separate layers. */}
        <path d="M43 140C35 145 34 153 43 160L58 165L72 162L89 168L106 164L125 169L144 164L163 169L183 163L202 168L221 163L239 166L254 161L271 163C286 158 287 145 277 140Q162 126 43 140Z" fill="#693b25" />
        <path d="M54 148L73 151M96 149L113 153M151 150L169 153M213 148L229 152M253 146L266 149" fill="none" stroke="#9c6240" strokeWidth="3" />
        <path d="M43 128Q158 113 278 128L275 143L240 144L224 153L204 144L181 162L163 144L123 145L108 154L91 143L48 142Z" fill="#ffd055" />
        <path d="M48 116Q159 105 274 116L276 136Q162 150 44 136Z" fill="#e65b36" />
        <path d="M61 133Q156 145 261 132" fill="none" stroke="#ff9862" strokeWidth="4" />
        <path d="M37 103Q31 95 45 94Q56 88 68 95Q82 86 97 95Q111 87 126 94Q143 85 159 94Q176 86 191 94Q207 85 222 94Q240 87 251 95Q268 89 279 99Q295 99 288 111Q301 122 284 126Q272 135 258 126Q244 138 227 127Q212 137 198 127Q181 138 167 127Q149 138 134 127Q117 138 103 126Q88 136 74 125Q58 134 46 123Q29 127 35 113Z" fill="#70a94b" />
        <path d="M52 112L67 115M91 109L108 114M136 110L151 115M181 109L199 114M228 111L246 115M263 109L275 112" fill="none" stroke="#416b35" strokeWidth="3" />

        {/* Two crisp bacon ribbons stay in front of the lettuce and below the bun. */}
        <g data-burger-bacon="true" strokeWidth="3.5">
          <path d="M39 123C62 109 81 134 104 120S145 132 166 119S207 135 229 121S266 132 284 120L282 134C261 148 244 130 224 143S184 129 164 142S125 129 103 142S64 127 41 138Z" fill="#a64931" />
          <path d="M44 127C64 117 83 140 106 125S146 138 167 125S207 141 230 127S265 138 279 127" fill="none" stroke="#f4b58e" strokeWidth="5" />
          <path d="M82 112C103 104 123 124 144 114S181 119 201 108L212 117C189 131 168 120 148 128S105 116 84 124Z" fill="#c56a3c" />
          <path d="M88 116C108 111 126 128 146 119S181 125 203 114" fill="none" stroke="#f6c197" strokeWidth="4" />
        </g>

        {/* A broad rounded dome keeps the burger unmistakably front-facing. */}
        <path d="M34 103C36 54 91 16 160 16C229 16 284 54 286 103Q160 120 34 103Z" fill="#f3ae45" />
        <path d="M49 83C65 49 108 31 159 31C203 31 240 44 263 68C232 49 196 43 159 43C116 43 78 56 49 83Z" fill="#ffce79" stroke="none" />
        <path d="M40 93Q160 108 281 93L283 102Q160 118 37 102Z" fill="#d98a35" stroke="none" />
        {sesame.map(([x, y, angle], index) => <ellipse key={index} cx={x} cy={y} rx="4.2" ry="1.9" transform={`rotate(${angle} ${x} ${y})`} fill="#fff2c5" stroke="#c88338" strokeWidth=".6" />)}
      </g>
    </svg>
  </g>;
}
