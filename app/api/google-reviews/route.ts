import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;
  const headers = { "Cache-Control": "no-store" };
  if (!apiKey || !placeId) {
    return NextResponse.json({ available: false }, { status: 503, headers });
  }
  try {
    const response = await fetch(
      `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}?languageCode=es`,
      {
        headers: {
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask": "displayName,rating,userRatingCount,reviews,googleMapsUri,attributions",
        },
        cache: "no-store",
        signal: AbortSignal.timeout(8000),
      },
    );
    if (!response.ok) {
      console.error("Google Places response status:", response.status);
      return NextResponse.json({ available: false }, { status: 502, headers });
    }
    const place = await response.json();
    return NextResponse.json({
      available: true,
      name: place.displayName?.text,
      rating: place.rating,
      count: place.userRatingCount,
      url: place.googleMapsUri,
      attributions: place.attributions ?? [],
      reviews: (place.reviews ?? []).slice(0, 5).map((review: {
        rating?: number; text?: { text?: string }; relativePublishTimeDescription?: string;
        authorAttribution?: { displayName?: string; uri?: string }; googleMapsUri?: string;
      }) => ({
        rating: review.rating,
        text: review.text?.text ?? "",
        time: review.relativePublishTimeDescription,
        author: review.authorAttribution?.displayName ?? "Usuario de Google",
        authorUrl: review.authorAttribution?.uri,
        url: review.googleMapsUri,
      })),
    }, { headers });
  } catch {
    return NextResponse.json({ available: false }, { status: 502, headers });
  }
}
