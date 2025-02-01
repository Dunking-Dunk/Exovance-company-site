import type { Metadata } from "next";
import "./globals.css";
import Layout from "@/components/global/Layout";
import { ThemeProvider } from "@/components/provider/theme-provider";


export const metadata: Metadata = {
  title: "Exovance",
  description: "Frontier",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <ThemeProvider attribute="class"
          defaultTheme="system"
          enableSystem>
          <Layout>
            {children}
          </Layout>
        </ThemeProvider>
      </body>
    </html>
  );
}
