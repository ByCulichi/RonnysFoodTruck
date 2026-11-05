"use client";

import { useId } from "react";
import type { CinemaSeason } from "@/lib/truck-cinema";
import { coherentTurnArtwork, coherentTurnTransform, framesForSeason } from "@/lib/roo-coherent-turn";

// Positive source-pixel windows on the canonical outward drawing. The neckline
// overlaps underneath the independent live collar; face, ears and paws are out.
const capeWindows: Record<CinemaSeason, readonly string[]> = {
  halloween: ["M120 157Q106 154 94 162Q82 172 72 188Q63 200 63 206L66 210Q74 212 78 209Q94 216 111 207Q123 201 132 192L154 190L145 187Q126 183 120 170Q117 163 120 157Z"],
  muertos: ["M122 156Q107 152 94 162Q82 173 72 189Q63 201 63 207L67 211Q74 212 78 210Q95 217 112 208Q124 202 133 193L155 190L146 187Q126 183 120 170Q117 162 122 156Z"],
  christmas: ["M120 155Q105 154 94 162Q83 170 72 183L65 190Q57 187 57 198Q57 208 70 214Q89 223 121 223Q153 224 171 207L183 192L174 188Q150 187 136 175Q125 167 120 155Z"],
  newyear: ["M120 157Q106 154 94 162Q82 173 72 188Q63 200 63 206L66 210Q75 213 79 210Q95 217 112 208Q124 202 133 193L155 190L146 187Q126 183 120 170Q117 163 120 157Z"],
  valentines: [
    "M120 157Q106 154 94 162Q82 173 72 188Q63 200 63 206L66 210Q75 213 79 210Q95 217 112 208Q124 202 133 193L155 190L146 187Q126 183 120 170Q117 163 120 157Z",
    "M98 145Q105 142 113 146Q123 144 134 155Q143 156 156 169L160 178Q151 183 143 178Q127 181 116 171Q104 168 101 159Z",
    "M216 160Q222 156 223 164L217 171L219 175Q217 182 207 185L202 179Z",
  ],
};

// Optional hat extraction for future outfit composition. The live navbar keeps
// its existing face pipeline; these windows never include an entire head image.
const hatWindows: Record<CinemaSeason, readonly string[]> = {
  halloween: [
    "M67 42Q68 31 79 38Q86 46 106 24Q128 6 150 17Q171 26 187 46L195 57L201 82Q171 76 141 96L132 83Q109 66 94 65Q70 71 67 42Z",
    "M140 95Q169 78 196 87Q217 94 231 111Q241 123 220 130L212 114Q198 98 176 98Q158 97 145 104Z",
  ],
  muertos: ["M49 94Q47 76 79 59Q104 47 126 48Q137 18 153 18Q171 17 187 35L200 48Q224 61 230 78Q238 87 224 94L201 100Q181 91 164 93L143 102L129 90Q112 81 99 78L95 70Q77 59 67 70L65 98L72 110Q54 108 49 99Z"],
  christmas: [
    "M91 35Q113 12 139 17Q161 23 176 43L178 57Q150 55 133 67L128 77L110 71L95 57Z",
    "M130 68Q153 53 179 57Q194 61 197 78L194 86Q168 80 143 96L136 85Z",
    "M58 36Q68 19 83 23Q101 25 104 43Q107 57 90 66Q71 73 58 59Q48 47 58 36Z",
  ],
  newyear: [
    "M102 35Q132 12 172 24L187 33L189 67L140 84Q126 71 113 69Z",
    "M138 83Q169 65 200 68Q218 69 222 79L205 91Q171 86 147 102L140 94Z",
  ],
  valentines: [
    "M66 42Q67 31 79 38Q86 46 106 25Q129 7 151 19Q172 27 188 46L199 58L202 81Q172 77 142 97L132 83Q111 68 95 66Q70 71 66 42Z",
    "M140 96Q170 80 197 88Q220 96 232 113Q239 125 219 131L211 115Q196 100 176 99Q159 98 145 105Z",
  ],
};

type CostumeProps = { season: CinemaSeason; sourceId?: string; offset?: { x: number; y: number } };

function ConnectedPixels({ season, sourceId, offset, paths, part }: CostumeProps & { paths: readonly string[]; part: "cape" | "hat" }) {
  const id = `roo-connected-${part}-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const sheet = coherentTurnArtwork[season].outward;
  const frame = framesForSeason(season)[0];
  // The canonical drawing is the third column in row one on every outward
  // sheet. Registration already accounts for its absolute source coordinates.
  const cellX = Math.round(sheet.width / 2);
  return <g data-connected-costume={part} data-connected-costume-season={season} transform={offset ? `translate(${offset.x} ${offset.y})` : undefined} aria-hidden="true">
    <defs>
      <clipPath id={`${id}-window`}>{paths.map((path, index) => <path key={index} d={path} transform={`translate(${cellX} 0)`} />)}</clipPath>
      {!sourceId && <image id={`${id}-source`} data-roo-motion-cel="outward" width={sheet.width} height={sheet.height} preserveAspectRatio="none" />}
    </defs>
    <g transform={coherentTurnTransform(frame)}><use href={`#${sourceId || `${id}-source`}`} clipPath={`url(#${id}-window)`} /></g>
  </g>;
}

/** Reuse a single parent-owned outward image for every rise/standing cape. */
export function ConnectedClothes(props: CostumeProps & { part?: "cape" }) {
  return <ConnectedPixels {...props} part="cape" paths={capeWindows[props.season]} />;
}

export function ConnectedHat(props: CostumeProps) {
  return <ConnectedPixels {...props} part="hat" paths={hatWindows[props.season]} />;
}
