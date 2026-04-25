import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Oulad Chmicha Back Office",
    short_name: "OuladChmicha",
    description: "Gestion quotidienne reservations, operations et IA.",
    start_url: "/admin",
    display: "standalone",
    background_color: "#f8f6f1",
    theme_color: "#8b6914",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
