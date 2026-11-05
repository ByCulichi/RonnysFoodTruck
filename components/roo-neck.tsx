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
      <stop stopColor="#eaaa4e" /><stop offset=".5" stopColor="#f9ce83" /><stop offset="1" stopColor="#ffe0a0" />
    </linearGradient>
  </>;
}

/** An underlapping shoulder/neck envelope fills the area a nod reveals. Its
 * lower edge stays under the torso and its upper edge stays under the jaw. */
export function RooNeckSkin({ id }: { id: string }) {
  return <g data-roo-part="neck-skin" aria-hidden="true" opacity="0">
    <path d="M847 913Q857 810 917 753Q967 725 1011 745Q1041 768 1047 816L1068 919Q967 968 847 913Z" fill={`url(#${id}-neck-fur)`} stroke="#44251b" strokeWidth="7" strokeLinejoin="round" />
    <path d="M1004 801Q1016 825 1009 849L1027 841Q1022 873 1009 891L1028 882Q1024 912 1003 930" fill="none" stroke="#edb566" strokeWidth="6" strokeLinecap="round" />
  </g>;
}
