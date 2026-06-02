import type { Metadata } from "next";
import "./globals.css";
import { SiteFooter } from "./components/Footer";
import { LanguageProvider } from "./lib/i18n";

export const metadata: Metadata = {
  title: "Uitwijken.nl — civic layer prototype",
  description:
    "Proof-of-concept screens for a society-owned location-and-theme civic community layer.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans min-h-screen flex flex-col">
        <LanguageProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-2 focus:left-2 focus:bg-white focus:px-4 focus:py-2 focus:border focus:border-[var(--color-ink)] focus:font-semibold"
          >
            Direct naar de inhoud
          </a>
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </LanguageProvider>
      </body>
    </html>
  );
}
