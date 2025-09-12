import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Elnino - Real-time Translation Solution",
  description: "AI-powered real-time translation and interpretation service for global communication",
  icons: {
    icon: "/logo.png",
  },
};

export default function EnglishLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
    </>
  );
}