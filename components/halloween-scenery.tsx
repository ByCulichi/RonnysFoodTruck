import { getImageProps } from "next/image";

const scenery = (src: string) => getImageProps({ src, alt: "", fill: true, sizes: "100vw" }).props;
const desktop = scenery("/images/scenes/halloween-night.png");
const mobile = scenery("/images/scenes/halloween-night-mobile.png");

// Art direction only: all text, navigation and characters live outside this picture.
export function HalloweenScenery({ className }: { className: string }) {
  return <picture className={className} aria-hidden="true"><source media="(max-width: 760px)" srcSet={mobile.srcSet} sizes={mobile.sizes} /><img {...desktop} style={{ ...desktop.style, objectFit: "fill" }} /></picture>;
}
