/** The scarf and cape collar belong to the shoulders, not the nodding face.
 * Both layers reuse exactly the original pixels; their masks overlap slightly
 * so antialiasing cannot open a seam between the two anatomical joints. */
export const rooCollarOutline = "M522 696Q576 684 650 738Q787 790 901 820L948 771Q999 792 979 845L976 879L1000 939L956 929L924 1005L855 1003L817 910Q602 899 521 820Z";

export function RooNeckDefinitions({ id }: { id: string }) {
  return <>
    <mask id={`${id}-face-without-collar`} maskUnits="userSpaceOnUse" x="0" y="0" width="1254" height="1254" style={{ maskType: "luminance" }}>
      <rect width="1254" height="1254" fill="white" />
      <path d={rooCollarOutline} fill="black" />
    </mask>
    <mask id={`${id}-collar-only`} maskUnits="userSpaceOnUse" x="0" y="0" width="1254" height="1254" style={{ maskType: "luminance" }}>
      <path d={rooCollarOutline} fill="white" stroke="white" strokeWidth="8" strokeLinejoin="round" />
    </mask>
    <linearGradient id={`${id}-neck-fur`} x1=".15" y1=".15" x2=".85" y2=".8" gradientUnits="objectBoundingBox">
      <stop stopColor="#e8a146" /><stop offset=".5" stopColor="#f5bd66" /><stop offset="1" stopColor="#ffd88e" />
    </linearGradient>
  </>;
}

/** The neck joins the whole shoulder, including the back below the cape's
 * collar. Keep this behind torso, clothing and jaw: a throat-only patch leaves
 * a triangular opening at the rear when the face nods independently. The wide
 * underlap stays inside their silhouette throughout the walking/head curves. */
export function RooNeckSkin({ id }: { id: string }) {
  return <g data-roo-part="neck-skin" aria-hidden="true" opacity="0">
    <path data-roo-neck-envelope="true" d="M584 720Q658 712 755 754Q809 776 871 788Q930 762 972 778Q1011 795 1038 861L1070 940Q965 993 849 950L660 918Q596 858 584 720Z" fill={`url(#${id}-neck-fur)`} stroke="#44251b" strokeWidth="7" strokeLinejoin="round" />
    <path d="M1004 801Q1016 825 1009 849L1027 841Q1022 873 1009 891L1028 882Q1024 912 1003 930" fill="none" stroke="#edb566" strokeWidth="6" strokeLinecap="round" />
  </g>;
}
