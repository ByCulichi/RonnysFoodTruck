/** Registered drawings for the articulated welcome, in its 1254-square canvas. */
export type RooBodyPoseName = "rest" | "rise";
export type RooTurnPoseName = "profile" | "back";
export type RooPoseName = RooBodyPoseName | RooTurnPoseName;

type Placement = { x: number; y: number; width: number; height: number };
type HeadPlacement = { x: number; y: number; scale: number };

export const rooPoseArt = {
  rest: {
    src: "/images/ronny/welcome/roo-rest-body.png",
    image: { x: 0, y: 31, width: 1254, height: 1254 },
    cape: { x: 180, y: 810, width: 650, height: 215 },
    clipTop: 400,
  },
  rise: {
    src: "/images/ronny/welcome/roo-rise-body.png",
    image: { x: 0, y: 34, width: 1254, height: 1254 },
    cape: { x: 180, y: 685, width: 650, height: 240 },
    clipTop: 400,
  },
  profile: {
    src: "/images/ronny/welcome/roo-turn-profile.png",
    image: { x: 0, y: 11, width: 1254, height: 1254 },
    cape: { x: 180, y: 690, width: 690, height: 240 },
    head: { x: 840, y: 315, scale: .96 },
    neck: { x: 910, y: 765, scale: .76 },
  },
  back: {
    src: "/images/ronny/welcome/roo-turn-back.png",
    image: { x: 0, y: 16, width: 1254, height: 1254 },
    cape: { x: 345, y: 735, width: 620, height: 270 },
    head: { x: 800, y: 315, scale: .98 },
    neck: { x: 800, y: 770, scale: .85 },
  },
} as const satisfies Record<RooPoseName, {
  src: string;
  image: Placement;
  cape: Placement;
  head?: HeadPlacement;
  neck?: HeadPlacement;
  clipTop?: number;
}>;

