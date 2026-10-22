import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  title: "Sunil Rout — AI Engineer & Full-Stack Developer",
  description:
    "Portfolio of Sunil Rout: AI/ML engineering, RAG systems, agentic workflows and MERN full-stack development.",
};

// lets the page draw edge to edge on phones (the CSS handles the safe areas)
export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover" };

// runs before first paint so a saved theme never flashes the wrong colors
const themeScript = `try{var t=localStorage.getItem('theme');if(t)document.documentElement.setAttribute('data-theme',t)}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
