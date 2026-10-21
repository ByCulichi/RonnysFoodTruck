import type { ReactNode } from "react";

// A keyed leaf turns only when its page changes; controls stay outside the animation.
export function MenuLeaf({ children, direction = "next" }: { children: ReactNode; direction?: "next" | "previous" }) {
  return <div className="menu-leaf" data-direction={direction}>{children}<span className="menu-leaf-sheen" aria-hidden="true" /></div>;
}
