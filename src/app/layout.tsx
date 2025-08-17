import type { Metadata, Viewport } from "next";
import "./globals.css";
import Layout from "@/components/global/Layout";
import { ThemeProvider } from "@/components/provider/theme-provider";
import { ScrollThemeProvider } from "@/components/provider/scroll-theme-provider";
import { memo } from 'react';


export const metadata: Metadata = {
  metadataBase: new URL("https://exovance.in"),
  applicationName: "Exovance",
  title: {
    default: "Exovance — Technology & Innovation",
    template: "%s | Exovance",
  },
  description:
    "Exovance pioneers modern technology and innovation in India—delivering AI automation, web and mobile solutions, and scalable digital products.",
  keywords: [
    "Exovance",
    "technology",
    "innovation",
    "AI automation",
    "web development",
    "mobile development",
    "digital solutions",
    "India",
  ],
  authors: [{ name: "Exovance", url: "https://exovance.in" }],
  creator: "Exovance",
  publisher: "Exovance",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://exovance.in/",
    title: "Exovance — Technology & Innovation",
    siteName: "Exovance",
    description:
      "Pioneers and innovators in technology and innovation. We build AI, web, and mobile solutions.",
    locale: "en_US",
    images: [
      {
        url: "/og/og-image.png",
        width: 1200,
        height: 630,
        alt: "Exovance — Technology & Innovation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Exovance — Technology & Innovation",
    description:
      "Pioneers and innovators in technology and innovation. We build AI, web, and mobile solutions.",
    site: "@exovance",
    creator: "@exovance",
    images: ["/og/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icons/icon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/icon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/favicon.ico"],
  },
  manifest: "/site.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: "4xKGdogVzUgjiNJ7glOHiJWYFEoSoER19Nw2rBM2POo",
  },
  category: "technology",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Exovance",
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' }
  ],
};

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout = memo(({ children }: RootLayoutProps) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased min-h-screen bg-background">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ScrollThemeProvider>
            <Layout>
              {children}
            </Layout>
          </ScrollThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
});

RootLayout.displayName = 'RootLayout';

export default RootLayout;
