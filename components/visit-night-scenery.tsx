function StreetLamp({ className }: { className: string }) {
  return <svg className={className} viewBox="0 0 100 350" fill="none"><path d="M48 74v260m-18 2h36M24 75h52L66 21H34ZM27 18h46L50 3Z" stroke="#4a3657" strokeWidth="6" strokeLinejoin="round" /><path className="visit-lamp-light" d="M37 28h26l9 42H28Z" fill="#ffc66d" /><path d="M49 27v45" stroke="#5f4253" strokeWidth="4" /><path d="M38 334h23v14H38Z" fill="#3a2b48" /></svg>;
}

// An illustrative city scene, separate from the real map and the footer's forest.
export function VisitNightScenery() {
  return <div className="visit-night-scenery" aria-hidden="true">
    <svg className="visit-city-silhouette" viewBox="0 0 1600 350" preserveAspectRatio="none" fill="none"><path d="M0 350V154l50-39 48 34V88l65-50 65 50v101l54-36 55 42v61l84-40 60 27v107Zm1600 0V94l-51-33-51 33v79l-59-48-66 48v-91l-67-46-60 50v153l-60-47-71 47v111Z" fill="#211a35" /><path d="M0 350V241l90-49 81 49v109Zm1600 0V255l-90-61-93 61v95Z" fill="#2b1c3a" /><path d="M0 344h1600" stroke="#8a5e853b" strokeWidth="12" /><g fill="#ad7b7250"><path d="M137 102h17v25h-17zm28 0h17v25h-17zm-28 41h17v25h-17zm28 0h17v25h-17zM1238 107h17v25h-17zm29 0h17v25h-17zm-29 42h17v25h-17zm29 0h17v25h-17zM1532 116h15v23h-15zm25 0h15v23h-15zM39 181h15v24H39zm27 0h15v24H66z" /></g></svg>
    <svg className="visit-night-moon" viewBox="0 0 100 100" fill="none"><path d="M66 9A43 43 0 1 0 91 73 38 38 0 0 1 66 9Z" fill="#b298e1" /><path d="m21 21-6-7-1 8C8 18 3 17 0 18l9 13q5-5 12 5 7-10 12-5l9-13q-10 0-15 4l-1-8Z" fill="#181325" transform="translate(33 44) scale(.9)" /></svg>
    <StreetLamp className="visit-street-lamp lamp-left" /><StreetLamp className="visit-street-lamp lamp-right" />
  </div>;
}
