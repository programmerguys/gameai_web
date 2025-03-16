import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GameAI - 游戏AI赋能平台",
  description: "为游戏开发者提供全方位的AI能力，加速游戏开发，提升游戏体验",
  keywords: "游戏AI, 3D模型生成, 游戏创意, 代码生成, Unity插件, 游戏开发, PaaS平台",
  authors: [{ name: "GameAI Team" }],
  creator: "GameAI Team",
  openGraph: {
    title: "GameAI - 游戏AI赋能平台",
    description: "为游戏开发者提供全方位的AI能力，加速游戏开发，提升游戏体验",
    images: ['/images/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
