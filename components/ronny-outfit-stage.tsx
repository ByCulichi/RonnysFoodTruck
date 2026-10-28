"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { halloweenCostumes, type HalloweenCostume } from "@/lib/ronny-costumes";

// Keep the previous outfit visible until its replacement has decoded.
export function RonnyOutfitStage({ costume, sizes = "(max-width: 600px) 150px, 220px" }: { costume: HalloweenCostume; sizes?: string }) {
  const [ready, setReady] = useState<Set<HalloweenCostume>>(() => new Set());
  const [shown, setShown] = useState(costume);
  useEffect(() => { if (ready.has(costume)) setShown(costume); }, [costume, ready]);

  return <div className="ronny-outfit-stage" aria-busy={!ready.has(costume)} data-visible-outfit={shown}>
    {(Object.keys(halloweenCostumes) as HalloweenCostume[]).map((id) => <Image
      key={id}
      src={halloweenCostumes[id].src}
      alt={id === shown ? halloweenCostumes[id].alt : ""}
      aria-hidden={id !== shown}
      width={1024} height={1536}
      sizes={sizes}
      className={`ronny-outfit-layer${shown === id ? " is-visible" : ""}`}
      onLoad={() => setReady((previous) => previous.has(id) ? previous : new Set([...previous, id]))}
    />)}
    <span className="ronny-outfit-magic" key={shown} aria-hidden="true" />
  </div>;
}
