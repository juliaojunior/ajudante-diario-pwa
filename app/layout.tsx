import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ajudante Diário",
  description: "Assistente diário para idosos - Medicamentos e Compras",
  manifest: "/manifest.json",
  themeColor: "#0056D2",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Ajudante",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </head>
      <body className="tap-highlight-transparent">
        {children}
      </body>
    </html>
  );
}
