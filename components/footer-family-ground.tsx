// Foreground scenery sits in front of the approved cutout, without altering its PNG.
export function FooterFamilyGround() {
  return <><span className="footer-family-shadow" aria-hidden="true" /><svg className="footer-family-ground" viewBox="0 0 380 140" aria-hidden="true" focusable="false">
    <defs>
      <linearGradient id="footer-ground-pumpkin" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#f4a03c" /><stop offset=".5" stopColor="#b9511c" /><stop offset="1" stopColor="#61261b" /></linearGradient>
    </defs>
    <g transform="translate(286 47)">
      <path d="m26 9 5-10 8 1-8 12" fill="#615129" stroke="#281c21" strokeWidth="2" />
      <path d="M28 12C4-3-9 40 6 52c6 5 12 4 21 3 9 2 17 0 23-4C66 38 53-3 28 12Z" fill="url(#footer-ground-pumpkin)" stroke="#4c241e" strokeWidth="2" />
      <path d="M27 13q-16 17-5 40m8-40q14 16 7 39" fill="none" stroke="#f8b54c" opacity=".35" strokeWidth="2" />
      <path d="m8 30 13 2-9-11Zm40 0-13 2 9-11ZM12 40l9 3 6-4 5 5 11-5-6 11-8 2-10-2Z" fill="#ffe99a" stroke="#57251a" strokeWidth="2" />
    </g>
    <g fill="#19121c" stroke="#19121c" strokeWidth="2" strokeLinecap="round">
      <path d="m26 131-6-23 14 17-3-34 14 31 6-19 1 26m263 4 4-24 7 16 10-31-1 32 15-12-7 21M109 115l-4-12 11 9 1-18 9 20m127 3 6-18 1 13 13-10-8 17" />
      <path d="m69 131 10-31m-2 9-12-6m11 11 11-7m207 27-5-27m2 7 10-7" fill="none" />
    </g>
    <g stroke="#6b3525" strokeWidth="1">
      <path d="M137 103q13-8 23 3-10 12-23-3Z" fill="#c26b30" /><path d="m139 104 15 2" fill="none" />
      <path d="M225 119q12-14 23-5-6 16-23 5Z" fill="#dc8a3e" /><path d="m228 118 14-3" fill="none" />
      <path d="M91 130q12-9 23 0-11 9-23 0Z" fill="#a94a2a" /><path d="m95 130 13 0" fill="none" />
    </g>
  </svg></>;
}
