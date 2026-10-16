"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, RefreshCw, Star } from "lucide-react";

interface GoogleData {
  available: boolean;
  rating?: number;
  count?: number;
  url?: string;
  reviews?: { rating?: number; text: string; time?: string; author: string; authorUrl?: string; url?: string }[];
  attributions?: { provider?: string; providerUri?: string }[];
}
const safeGoogleLink = (value: string | undefined, fallback: string) => {
  try {
    const url = new URL(value ?? "");
    return url.protocol === "https:" && (url.hostname === "google.com" || url.hostname.endsWith(".google.com")) ? url.href : fallback;
  } catch { return fallback; }
};

export function GoogleReviews({ mapsUrl }: { mapsUrl: string }) {
  const [data, setData] = useState<GoogleData | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const controller = new AbortController();
    async function refresh() {
      try {
        const response = await fetch("/api/google-reviews", { cache: "no-store", signal: controller.signal });
        const result = response.ok ? await response.json() : null;
        if (!controller.signal.aborted) setData(result?.available ? result : null);
      } catch { if (!controller.signal.aborted) setData(null); }
      finally { if (!controller.signal.aborted) setLoading(false); }
    }
    void refresh();
    const timer = setInterval(() => void refresh(), 300_000);
    return () => { controller.abort(); clearInterval(timer); };
  }, []);
  const googleUrl = safeGoogleLink(data?.url, mapsUrl);
  return (
    <section className="google-reviews shell" aria-labelledby="google-reviews-title">
      <div className="reviews-heading">
        <div>
          <div className="eyebrow">GOOGLE · LA VOZ DE NUESTROS VISITANTES</div>
          <h2 id="google-reviews-title">El antojo se cuenta.<br /><em>Las opiniones también.</em></h2>
        </div>
        <a className="text-link" href={googleUrl} target="_blank" rel="noopener noreferrer">Ver en Google <ArrowUpRight size={18} /></a>
      </div>
      {data ? <>
        <div className="google-rating" aria-label={typeof data.rating === "number" ? `${data.rating} de 5 en Google` : "Opiniones de Google"}>
          <span className="google-wordmark" aria-label="Google">Google</span>
          {typeof data.rating === "number" && <strong>{new Intl.NumberFormat("es-MX", { maximumFractionDigits: 1 }).format(data.rating)} <Star size={22} fill="currentColor" /></strong>}
          {typeof data.count === "number" && <span>{data.count.toLocaleString("es-MX")} opiniones</span>}
          <small><RefreshCw size={12} /> Actualizadas desde Google</small>
        </div>
        <div className="review-grid">{data.reviews?.map((review, index) => <article className="google-review" key={`${review.author}-${index}`}>
          <div className="review-stars" aria-label={`${review.rating ?? 0} de 5`}>{Array.from({ length: Math.max(0, Math.min(5, Math.round(review.rating ?? 0))) }).map((_, i) => <Star key={i} size={14} fill="currentColor" />)}</div>
          {review.text && <p>{review.text}</p>}
          <a href={safeGoogleLink(review.authorUrl, googleUrl)} target="_blank" rel="noopener noreferrer">{review.author}</a>
          <small>{review.time}</small>
          <a className="review-source" href={safeGoogleLink(review.url, googleUrl)} target="_blank" rel="noopener noreferrer">Leer en Google <ArrowUpRight size={13} /></a>
        </article>)}</div>
        {data.attributions?.map((entry, i) => <small className="review-attribution" key={i}>{entry.provider}</small>)}
      </> : <div className="reviews-invitation">
        <Star size={26} aria-hidden="true" />
        <p>{loading ? "Consultando las opiniones de Google…" : "Conoce las experiencias de quienes nos visitan y comparte la tuya en Google."}</p>
        <a className="button button-gold" href={googleUrl} target="_blank" rel="noopener noreferrer">Consultar opiniones <ArrowUpRight size={18} /></a>
      </div>}
    </section>
  );
}
