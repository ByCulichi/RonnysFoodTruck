import type { CinemaSeason } from "@/lib/truck-cinema";

type SeasonProps = { season: CinemaSeason };

// These paths are registered to the original 1254-square walking artwork.
// Only the wizard's hat and cape change; the actual ears/face/muzzle/neck scarf
// remain the original raster and continue moving with their existing joints.
const leftEar = "M365 284Q369 232 414 252Q527 297 634 412L596 485Q566 550 536 575Q502 606 470 568Q390 500 365 420Z";
const rightEar = "M1017 310Q1091 225 1196 181Q1237 158 1234 222Q1255 353 1190 465Q1155 471 1112 412Z";
const face = "M592 488Q660 412 804 391Q951 365 1039 451Q1106 500 1087 615L1092 705H581L571 628Q573 543 592 488Z";
const cape = "M137 890Q182 790 294 727Q407 663 536 722L669 850Q449 973 137 890Z";

export function WelcomeCostumeDefinitions({ id, season }: SeasonProps & { id: string }) {
  return <>
    <mask id={`${id}-costume-head`} maskUnits="userSpaceOnUse" x="0" y="0" width="1254" height="1254" style={{ maskType: "luminance" }}>
      <rect width="1254" height="1254" fill="white" />
      {season !== "halloween" && <>
        <rect width="1254" height="700" fill="black" />
        <path d={leftEar} fill="white" /><path d={rightEar} fill="white" /><path d={face} fill="white" />
      </>}
    </mask>
    <mask id={`${id}-costume-body`} maskUnits="userSpaceOnUse" x="0" y="0" width="1254" height="1254" style={{ maskType: "luminance" }}>
      <rect width="1254" height="1254" fill="white" />
      {season !== "halloween" && <path d={cape} fill="black" />}
    </mask>
  </>;
}

function Marigold({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return <g transform={`translate(${x} ${y}) scale(${scale})`}>
    {[0, 45, 90, 135].map(angle => <ellipse key={angle} rx="25" ry="11" transform={`rotate(${angle})`} fill="#ed9427" stroke="#79351b" strokeWidth="2" />)}
    <circle r="12" fill="#ffbf37" stroke="#9b5122" strokeWidth="2" />
  </g>;
}

/** The source hat hid these few fur pixels; put them behind the original face. */
export function WelcomeHeadUnderlay({ season }: SeasonProps) {
  if (season === "halloween") return null;
  return <g data-welcome-head-underlay={season} fill="#e7a147" stroke="#3b1b16" strokeWidth="7" strokeLinejoin="round">
    <path d="M577 574Q565 430 733 367Q921 317 1064 438Q1097 476 1102 515L1082 524Q1043 440 938 407Q780 365 650 442Q615 483 592 574Z" stroke="none" />
    <path d="M537 567Q564 543 596 479L621 463Q591 528 587 596L565 618Q551 590 537 567Z" stroke="none" />
    <path d="M1084 404Q1135 434 1185 463Q1154 492 1110 519L1091 512Q1089 458 1084 404Z" stroke="none" />
    <path d="M1185 463Q1154 492 1110 519" fill="none" />
  </g>;
}

export function WelcomeHeadCostume({ season }: SeasonProps) {
  if (season === "halloween") return null;
  return <g data-welcome-head-costume={season} stroke="#3b1b16" strokeWidth="9" strokeLinejoin="round" strokeLinecap="round">
    {season === "christmas" ? <>
      <path d="M640 355Q648 172 776 114Q900 70 1014 138Q1093 190 1105 297L1047 323Q1013 220 963 214Q908 208 877 318Z" fill="#be2f42" />
      <path d="M658 333Q847 267 1033 357L1026 432Q845 359 643 415Q611 386 658 333Z" fill="#fff1d8" />
      <path d="M667 349Q839 304 1014 369M674 391Q834 351 1014 410" fill="none" stroke="#e4cda7" strokeWidth="5" />
      <path d="M1071 283Q1080 256 1110 269Q1144 267 1149 301Q1170 328 1145 350Q1133 380 1103 368Q1072 372 1068 343Q1046 319 1071 283Z" fill="#fff2dc" />
    </> : season === "muertos" ? <>
      <path d="M645 332Q659 224 722 178Q770 144 818 151Q891 154 951 221L995 342Z" fill="#22202a" />
      <path d="M669 300Q826 263 965 316L974 346Q810 297 655 342Z" fill="#78508b" strokeWidth="5" />
      <path d="M489 380Q628 291 824 302Q1020 304 1110 412Q1065 458 984 456Q752 357 555 441Q495 436 489 380Z" fill="#22202a" />
      <path d="M516 384Q728 293 1077 407M536 413Q731 338 1032 436" fill="none" stroke="#e8c58b" strokeWidth="6" />
      {[590, 675, 764, 854, 944, 1027].map((x, index) => <path key={x} d={`M${x} ${index < 3 ? 376 - index * 9 : 350 + (index - 3) * 19}q-12-19-22-5m22 5q11-24 23-14`} fill="none" stroke="#e8c58b" strokeWidth="4" />)}
      <Marigold x={929} y={307} scale={1.25} /><Marigold x={979} y={333} scale={.85} />
    </> : season === "newyear" ? <>
      <path d="M650 326L678 111Q802 63 916 132L949 337Z" fill="#211c25" />
      <path d="M668 264Q802 238 937 290L944 328Q807 276 659 304Z" fill="#d5a14c" strokeWidth="5" />
      <path d="M556 352Q803 273 1049 401L1036 445Q813 355 556 403Z" fill="#25202b" />
      <path d="M575 374Q806 309 1025 420" fill="none" stroke="#d5ab64" strokeWidth="5" />
      <path d="m831 167 10 22 25 3-19 16 5 25-22-13-21 13 5-25-20-16 25-3Z" fill="#f6cd78" strokeWidth="4" />
    </> : <>
      <path d="M629 336Q626 220 717 177Q850 112 987 219Q1047 269 1059 354L1009 410Q812 340 629 387Z" fill="#9f2443" />
      <path d="M644 360Q829 299 1030 378L1018 424Q815 357 637 407Z" fill="#6b1f36" />
      <path d="M910 248C890 213 840 232 851 267Q861 292 909 315Q955 291 965 265C977 232 929 212 910 248Z" fill="#f3bd70" strokeWidth="5" />
      <path d="M661 305Q687 228 751 214" fill="none" stroke="#cd546b" strokeWidth="8" />
    </>}
  </g>;
}

export function WelcomeBodyCostume({ season }: SeasonProps) {
  if (season === "halloween") return null;
  const fabric = season === "christmas" ? "#b92e42" : season === "valentines" ? "#8e2340" : "#23202a";
  const edge = season === "christmas" ? "#fff0d5" : season === "valentines" ? "#f1c185" : "#e2be7e";
  return <g data-welcome-body-costume={season} stroke="#3b1c1c" strokeWidth="8" strokeLinejoin="round" strokeLinecap="round">
    {season === "valentines" && <g fill="#fff0d3" stroke="#b37f58" strokeWidth="5">
      <path d="M531 778Q419 760 392 675Q415 683 435 692Q393 649 406 603Q464 637 481 674Q472 613 510 590Q555 679 572 733Z" />
      <path d="M559 760Q624 683 648 619Q678 645 666 689Q698 668 717 682Q683 754 604 792Z" />
      <path d="M433 656Q455 714 538 759M483 643Q506 713 551 748M651 662Q618 727 574 759" fill="none" stroke="#e1be91" strokeWidth="4" />
    </g>}
    <path d={cape} fill={fabric} />
    <path d="M157 883Q357 949 648 845" fill="none" stroke={edge} strokeWidth={season === "christmas" ? 24 : 8} />
    <path d="M290 760Q396 712 536 756M249 840Q418 894 585 827" fill="none" stroke={season === "christmas" ? "#da5360" : season === "valentines" ? "#b94b60" : "#4d414e"} strokeWidth="8" />
    {season === "christmas" ? <>
      <path d="M195 842Q403 922 620 813L633 843Q396 955 178 870Z" fill="#30252e" strokeWidth="5" />
      <path d="m393 878 54-5 4 33-54 6Z" fill="#e9b660" strokeWidth="5" /><path d="m408 884 23-2 2 15-23 3Z" fill="#392836" stroke="none" />
      <circle cx="596" cy="790" r="15" fill="#f4cd77" strokeWidth="4" />
    </> : season === "muertos" ? <>
      <path d="M218 864q27-34 53-12m14-42q15 30 1 54m52-88q27 32 6 60m51-78q25 29 12 56m51-51q14 27-2 45m59-26q8 19-6 37" fill="none" stroke="#e1be7f" strokeWidth="5" />
      <Marigold x={514} y={759} scale={1.05} />
    </> : season === "newyear" ? <>
      <path d="M503 737L558 767 532 828 479 809Z" fill="#fff0ce" strokeWidth="5" />
      <path d="m520 772-31-16 4 38 30-8 27 20 13-32-33 5Z" fill="#ddb361" strokeWidth="4" />
      <circle cx="447" cy="824" r="7" fill="#e8c489" strokeWidth="3" /><circle cx="401" cy="846" r="7" fill="#e8c489" strokeWidth="3" />
    </> : <>
      <path d="M329 796C316 775 286 787 292 807Q298 826 329 839Q359 821 365 805C371 784 342 774 329 796Z" fill="#efb7c2" strokeWidth="4" />
      <path d="M468 794C460 781 443 788 447 802Q452 813 470 822Q489 811 491 800C494 787 477 781 468 794Z" fill="#eac27e" strokeWidth="3" />
    </>}
  </g>;
}
