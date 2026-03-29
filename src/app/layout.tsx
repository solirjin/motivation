import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Động Lực — Câu Trích Dẫn Mỗi Ngày",
  description:
    "Khám phá những câu trích dẫn truyền cảm hứng mỗi ngày. Hàng trăm câu nói của các vĩ nhân trong và ngoài nước.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <head>
        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />

        {/* PWA / Home screen */}
        <link rel="manifest" href="/motivation/manifest.json" />
        <meta name="theme-color" content="#6d28d9" />

        {/* Favicon */}
        <link rel="icon" type="image/svg+xml" href="/motivation/icons/icon.svg" />
        <link rel="icon" type="image/png" sizes="32x32" href="/motivation/icons/favicon-32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/motivation/icons/favicon-16.png" />

        {/* iOS */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Động Lực" />
        <link rel="apple-touch-icon" sizes="180x180" href="/motivation/icons/apple-touch-icon.png" />

        {/* Android */}
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
