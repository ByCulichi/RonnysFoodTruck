import { MapPin } from "lucide-react";

/** Original schematic streets; no real place, coordinates or external map. */
export function VisitMapPlaceholder() {
  return <div className="visit-map-placeholder" role="img" aria-label="Mapa ilustrado sin ubicación real; ubicación próximamente">
    <svg viewBox="0 0 600 380" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="600" height="380" fill="#e9e7dc" />
      <g fill="#d7dacf" stroke="#c5cbbc" strokeWidth="2">
        <rect x="23" y="20" width="117" height="63" rx="10" /><rect x="166" y="20" width="145" height="63" rx="10" />
        <rect x="337" y="20" width="105" height="63" rx="10" /><rect x="468" y="20" width="109" height="63" rx="10" />
        <rect x="23" y="109" width="117" height="116" rx="10" /><rect x="166" y="109" width="145" height="116" rx="10" />
        <rect x="337" y="109" width="105" height="116" rx="10" /><rect x="468" y="109" width="109" height="116" rx="10" />
        <rect x="23" y="251" width="117" height="109" rx="10" /><rect x="166" y="251" width="145" height="109" rx="10" />
        <rect x="337" y="251" width="105" height="109" rx="10" /><rect x="468" y="251" width="109" height="109" rx="10" />
      </g>
      <path d="M-35 302 632 55" fill="none" stroke="#d5bb8b" strokeWidth="40" />
      <path d="M-35 302 632 55" fill="none" stroke="#fff5d9" strokeWidth="29" />
      <g fill="none" stroke="#fbfaf4" strokeWidth="19"><path d="M153-10v400M324-10v400M455-10v400M-10 96h620M-10 238h620" /></g>
      <g fill="#b4c8a1" opacity=".85"><circle cx="65" cy="148" r="15" /><circle cx="95" cy="179" r="21" /><circle cx="516" cy="300" r="22" /><circle cx="548" cy="321" r="15" /></g>
      <ellipse cx="302" cy="211" rx="42" ry="13" fill="#5a314431" />
      <path d="M302 214s-41-40-41-68a41 41 0 0 1 82 0c0 28-41 68-41 68Z" fill="#a8313d" stroke="#ffe3a7" strokeWidth="5" />
      <circle cx="302" cy="147" r="24" fill="#fff1cd" />
      <g fill="#b47838"><ellipse cx="302" cy="154" rx="11" ry="8" /><ellipse cx="287" cy="143" rx="4" ry="6" transform="rotate(-22 287 143)" /><ellipse cx="297" cy="136" rx="4" ry="6" /><ellipse cx="308" cy="136" rx="4" ry="6" /><ellipse cx="318" cy="143" rx="4" ry="6" transform="rotate(22 318 143)" /></g>
    </svg>
    <span className="visit-map-placeholder-label"><MapPin size={18} aria-hidden="true" />Ubicación próximamente</span>
  </div>;
}
