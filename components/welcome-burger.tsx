/** A front-facing, local SVG prop registered beside Roo's nose. */
export function WelcomeBurger() {
  const sesame = [
    [72, 70, -24], [104, 49, 28], [143, 39, -20], [184, 42, 26],
    [224, 59, -24], [254, 83, 20], [121, 78, 16], [164, 62, -27],
    [201, 85, 25], [82, 91, 12], [152, 93, -12], [230, 94, -32],
  ];

  return <g data-roo-part="burger" aria-hidden="true" opacity="0">
    <svg data-burger-art="true" x="972" y="765" width="314" height="226" viewBox="0 0 320 230" overflow="visible">
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

        {/* A broad rounded dome keeps the burger unmistakably front-facing. */}
        <path d="M34 103C36 54 91 16 160 16C229 16 284 54 286 103Q160 120 34 103Z" fill="#f3ae45" />
        <path d="M49 83C65 49 108 31 159 31C203 31 240 44 263 68C232 49 196 43 159 43C116 43 78 56 49 83Z" fill="#ffce79" stroke="none" />
        <path d="M40 93Q160 108 281 93L283 102Q160 118 37 102Z" fill="#d98a35" stroke="none" />
        {sesame.map(([x, y, angle], index) => <ellipse key={index} cx={x} cy={y} rx="4.2" ry="1.9" transform={`rotate(${angle} ${x} ${y})`} fill="#fff2c5" stroke="#c88338" strokeWidth=".6" />)}
      </g>
    </svg>
  </g>;
}
