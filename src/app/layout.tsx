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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
