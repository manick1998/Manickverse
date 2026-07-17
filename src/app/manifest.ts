import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ManickVerse — Premium Website Development Agency",
    short_name: "ManickVerse",
    description:
      "Stunning, high-converting websites for startups, businesses and brands — delivered within 2 weeks.",
    start_url: "/",
    display: "standalone",
    background_color: "#04050a",
    theme_color: "#04050a",
    icons: [{ src: "/icon", sizes: "64x64", type: "image/png" }],
  };
}
