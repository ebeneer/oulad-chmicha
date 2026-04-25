export const siteConfig = {
  name: "Oulad Chmicha",
  title: "Oulad Chmicha - Moroccan Permaculture Farm & Eco Lodge",
  description:
    "Retraite nature au Maroc au coeur d'une ferme de permaculture de 20 hectares: hebergements ecologiques, confort moderne et experiences authentiques.",
  url: "https://farmouladchmicha.com",
  locale: "fr_MA",
  contactEmail: "contact@farmouladchmicha.com",
  whatsappPhone: "212661050429",
};

export function absoluteUrl(path: string) {
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}

export function whatsappUrl(message: string) {
  return `https://wa.me/${siteConfig.whatsappPhone}?text=${encodeURIComponent(message)}`;
}
