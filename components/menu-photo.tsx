import Image from "next/image";
import type { CSSProperties } from "react";
import { menuPhotoUrl, type MenuPhoto as MenuPhotoData } from "@/lib/menu";
import "./menu-photo.css";

/** Frame the original photo; embedded phone-capture bars stay outside the view. */
export function MenuPhoto({ photo, sizes, alt = photo.alt }: { photo: MenuPhotoData; sizes: string; alt?: string }) {
  const crop = photo.frame;
  const style = crop ? { "--photo-content-aspect": crop.width / crop.height } as CSSProperties : undefined;
  return <span className="menu-photo-frame" data-photo-framing={crop ? "trimmed-capture" : "full-frame"} style={style}>
    {crop ? <span className="menu-photo-window">
      <Image src={menuPhotoUrl(photo)} alt={alt} fill sizes={sizes} style={{ width: `${crop.sourceWidth / crop.width * 100}%`, height: `${crop.sourceHeight / crop.height * 100}%`, left: `${-crop.left / crop.width * 100}%`, top: `${-crop.top / crop.height * 100}%`, right: "auto", bottom: "auto", objectFit: "fill" }} />
    </span> : <Image src={menuPhotoUrl(photo)} alt={alt} fill sizes={sizes} style={{ objectFit: "cover", objectPosition: photo.position || "center" }} />}
  </span>;
}
