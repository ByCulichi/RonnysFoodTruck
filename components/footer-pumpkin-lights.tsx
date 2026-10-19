import { HalloweenFooterIcon } from "@/components/halloween-footer-icon";

export function FooterPumpkinLights() {
  return <div className="footer-pumpkin-lights" aria-hidden="true">
    <svg className="footer-light-wire" viewBox="0 0 1000 110" preserveAspectRatio="none" fill="none"><path d="M-20 10Q500 155 1020 10" stroke="#9c7950" strokeWidth="1.2" /></svg>
    {Array.from({ length: 13 }, (_, index) => { const point = (index + .5) / 13; return <span className="footer-pumpkin-lamp" key={index} style={{ left: `${point * 100}%`, top: `${15 + 270 * point * (1 - point)}px` }}><HalloweenFooterIcon kind="pumpkin" /></span>; })}
  </div>;
}
