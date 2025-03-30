import type { Metadata, Viewport } from "next";
import "./globals.css";
import Layout from "@/components/global/Layout";
import { ThemeProvider } from "@/components/provider/theme-provider";
import { memo } from 'react';

export const metadata: Metadata = {
  title: "Exovance",
  description: "EXOVANCE, we are pioneers and innovators in the field of technology and innovation We are based in India and dedicated to technology and innovation.",
  keywords: "technology, innovation, India, software development, digital solutions",
  authors: [{ name: "Exovance" }],
  robots: "index, follow",
  openGraph: {
    title: "Exovance",
    description: "Pioneers and innovators in technology and innovation",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Exovance",
    description: "Pioneers and innovators in technology and innovation",
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
          <Layout>
            {children}
          </Layout>
        </ThemeProvider>
      </body>
    </html>
  );
});

RootLayout.displayName = 'RootLayout';

export default RootLayout;
