import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ajudante Diário",
  description: "Assistente diário para idosos - Medicamentos e Compras",
  manifest: "/manifest.json",
  themeColor: "#B794F6",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
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
      </head>
      <body className="gradient-background tap-highlight-transparent">
        <div className="min-h-screen w-full max-w-4xl mx-auto">
          {children}
        </div>
      </body>
    </html>
  );
}
