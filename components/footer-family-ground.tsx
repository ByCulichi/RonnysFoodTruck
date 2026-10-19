// Independent scenery keeps the approved PNG intact. Grass crosses the toes;
// the mobile bank continues to the edge of the scene instead of floating.
export function FooterFamilyGround() {
  const bankEdge = Array.from({ length: 50 }, (_, index) => {
    const x = index * 21;
    const y = 150 - x * .13;
    const blade = 11 + (index % 4) * 4;
    return `L${x} ${y}l-3 -${blade} 8 ${blade - 4} 3 -${blade + 4} 4 ${blade + 2} 9 -9`;
  }).join(" ");
  return <>
    <svg className="footer-family-bank" viewBox="0 0 1000 280" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <defs><linearGradient id="footer-bank-shade" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#242020" /><stop offset=".4" stopColor="#191421" /><stop offset="1" stopColor="#191421" stopOpacity="0" /></linearGradient></defs>
      <path d={`M-20 153 ${bankEdge} L1020 280H-20Z`} fill="url(#footer-bank-shade)" />
      <g fill="none" stroke="#71613e" strokeWidth="2" opacity=".5"><path d="m507 92-6-18m9 15 8-22m79 3-2-18m9 17 9-23m81-4 2-18m5 18 9-13m93-12 2-14m7 12 9-15m80-3 4-14" /></g>
    </svg>
    <span className="footer-family-shadow" aria-hidden="true" />
    <svg className="footer-family-ground" viewBox="0 0 380 140" aria-hidden="true" focusable="false">
      <g fill="#25251d" stroke="#74603b" strokeWidth=".8" strokeLinejoin="round">
        <path d="m91 90 6-21 1 17 12-30-4 30 11-11-7 19m9-4 3-29 6 23 5-14 1 21m-2-3 10-28-2 24 12-11-7 18M231 90l7-23 2 17 10-29-1 28 12-12-10 22m10-1 11-27-2 24 11-13-6 20" />
      </g>
      <g fill="none" stroke="#a08847" strokeWidth="1" opacity=".65"><path d="m100 88 7-22m13 25 2-17m120 16 6-23m14 28 9-20" /></g>
      <path d="M219 101q11-10 21-3-8 10-21 3Z" fill="#ad672f" stroke="#593b28" strokeWidth="1" />
    </svg>
  </>;
}
