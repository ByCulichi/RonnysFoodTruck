export const rooWelcomeArt = {
  src: "/images/ronny/welcome/roo-four-paws.png",
  bark: "/images/ronny/welcome/roo-bark.png",
  width: 1254,
  height: 1254,
  head: { left: 244, top: 0, size: 1010 },
} as const;

// Registered in the source canvas. The final avatar retains the same head,
// hat, ears and bandana as the articulated character, without a second logo.
export const rooHeadOutline = [[244, 0], [1254, 0], [1254, 790], [1088, 800], [1020, 826], [1004, 920], [973, 971], [928, 942], [906, 1004], [858, 999], [825, 945], [802, 902], [780, 873], [690, 839], [618, 806], [552, 779], [510, 714], [453, 665], [420, 600], [356, 530], [350, 400], [244, 350]];
export const rooHeadMask = `polygon(${rooHeadOutline.map(([x, y]) => `${x / rooWelcomeArt.width * 100}% ${y / rooWelcomeArt.height * 100}%`).join(",")})`;
export const rooFullMask = `polygon(${rooHeadOutline.map((_, index) => index === 0 ? "-10% -10%" : index === 1 ? "110% -10%" : index < 10 ? "110% 110%" : "-10% 110%").join(",")})`;
