import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Space_Grotesk, DM_Sans, Press_Start_2P } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/BottomNav";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-dm-sans",
  display: "swap",
});

const pressStart = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-press-start",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Manav Ladha — Shop & Portfolio",
  description:
    "Cool gadgets, toys, collectibles & gifting finds from my reels. Creator portfolio & media kit.",
  openGraph: {
    title: "Manav Ladha — Shop & Portfolio",
    description: "Cool gadgets, toys, collectibles & gifting finds from my reels.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${dmSans.variable} ${pressStart.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-[#FFF4D8]">
        <main className="flex-1 max-w-lg mx-auto w-full pb-20">{children}</main>
        <BottomNav />
        <Analytics />
      </body>
    </html>
  );
}
