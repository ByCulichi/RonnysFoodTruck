// Identificador público resuelto desde la ficha oficial maps.app.goo.gl/7YXxNfNkTWyo46yR8.
// Los enlaces abren Google; no se consultan ni publican reseñas desde la página.
const googleListing = "https://www.google.com/maps?cid=16122484214186926966";
const googleReviewSection = "#lrd=0x85d1fbfa6f426447:0xdfbe91f8e3746376";

// Datos del propietario. Teléfono actualizado desde su ficha de WhatsApp Business.
export const business = {
  address: "New York, Ecatepec de Morelos, 55330, Estado de México",
  phone: "56 5390 1358",
  phoneInternational: "+525653901358",
  whatsappUrl: "https://wa.me/525653901358",
  deliveryWhatsappUrl: "https://wa.me/525653901358?text=" + encodeURIComponent("Hola, Ronny’s. Me gustaría consultar un pedido a domicilio. ¿Me pueden confirmar cobertura, costo de envío y disponibilidad?"),
  mapsUrl: "https://maps.app.goo.gl/7YXxNfNkTWyo46yR8",
  reviewsUrl: `${googleListing}${googleReviewSection},1,,,`,
  writeReviewUrl: `${googleListing}${googleReviewSection},3,,,`,
  socials: {
    instagram: "https://www.instagram.com/ronnystruck04/",
    facebook: "https://www.facebook.com/share/1Lgf44svSs/",
    tiktok: "https://www.tiktok.com/@ronnystruck1",
  },
  mapsEmbedUrl: "https://www.google.com/maps?q=" + encodeURIComponent("RONNY'S, New York, Ecatepec de Morelos, 55330, Estado de México") + "&output=embed",
  hours: "Viernes a domingo · 7 p. m.–12 a. m.",
  closedDays: "Lunes a jueves: cerrado",
};
