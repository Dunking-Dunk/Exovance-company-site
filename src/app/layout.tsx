import type { Metadata } from "next";
import "./globals.css";
import Layout from "@/components/global/Layout";


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
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  );
}
