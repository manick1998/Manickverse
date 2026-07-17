import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://manickverse.com"),
  title: {
    default: "ManickVerse — Crafting Extraordinary Digital Experiences | 2-Week Guarantee",
    template: "%s | ManickVerse",
  },
  description:
    "ManickVerse is an elite digital experience agency delivering award-winning Next.js websites in 2 weeks. High-converting, 100 Core Web Vitals speed, bespoke design.",
  keywords: [
    "ManickVerse",
    "Website in 2 weeks",
    "Award winning website design",
    "Next.js agency",
    "Tailwind CSS v4",
    "High converting landing page",
    "Website redesign",
    "E-commerce website development",
    "Puducherry web studio",
  ],
  authors: [{ name: "ManickVerse Agency" }],
  creator: "ManickVerse",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://manickverse.com",
    title: "ManickVerse — Crafting Extraordinary Digital Experiences",
    description:
      "We build high-converting, award-worthy Next.js websites for ambitious businesses. Delivered in 14 days.",
    siteName: "ManickVerse",
  },
  twitter: {
    card: "summary_large_image",
    title: "ManickVerse — Crafting Extraordinary Digital Experiences",
    description:
      "We build high-converting, award-worthy Next.js websites for ambitious businesses. Delivered in 14 days.",
    creator: "@manickverse",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const schemaData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://manickverse.com/#organization",
      name: "ManickVerse",
      url: "https://manickverse.com",
      logo: "https://manickverse.com/icon.png",
      description: "Digital agency engineering high-converting Next.js websites in 2 weeks.",
      telephone: "+91-9361099051",
      email: "contact@manickverse.com",
      sameAs: [
        "https://github.com/manick1998/Manickverse",
        "https://wa.me/919361099051",
      ],
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://manickverse.com/#service",
      name: "ManickVerse Digital Studio",
      image: "https://manickverse.com/icon.png",
      priceRange: "$$$",
      telephone: "+91-9361099051",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Puducherry",
        addressCountry: "IN",
      },
      areaServed: "Worldwide",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Web Development Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "High-Converting Landing Pages",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Corporate & Business Websites",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "E-Commerce Flagship Development",
            },
          },
        ],
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </head>
      <body className="bg-[#050611] text-[#e6e9f5] antialiased selection:bg-purple-500/30 selection:text-white">
        {/* Splash Loader */}
        <div id="site-loader" aria-hidden="true">
          <span>ManickVerse</span>
        </div>

        {children}
      </body>
    </html>
  );
}
