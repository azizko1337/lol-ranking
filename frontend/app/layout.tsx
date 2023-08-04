import "../styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SoloQ ranking",
  description: "Closed ranking of League of Legends players",
  viewport: "width=device-width, initial-scale=1.0",
  authors: { name: "Antoni Załupka", url: "https://github.com/azizko1337" },
  keywords: ["league of legends", "ranking", "local ranking", "lol", "solq"],
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
