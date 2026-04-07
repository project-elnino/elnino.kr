import type { Metadata } from "next";
import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import "./globals.css";
import { I18nProvider } from "@/lib/i18n";

export const metadata: Metadata = {
  metadataBase: new URL("https://elnino.kr"),
  title: "Elnino – AI Real-Time Translation",
  description: "AI 실시간 번역 자막 서비스. 소규모 회의부터 대규모 컨퍼런스까지, 101개 언어를 지원합니다.",
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    title: "Elnino – AI Real-Time Translation",
    description: "AI 실시간 번역 자막 서비스. 소규모 회의부터 대규모 컨퍼런스까지, 101개 언어를 지원합니다.",
    url: "https://elnino.kr",
    siteName: "Elnino",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1000,
        height: 384,
        alt: "Elnino – AI Real-Time Translation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Elnino – AI Real-Time Translation",
    description: "AI 실시간 번역 자막 서비스. 소규모 회의부터 대규모 컨퍼런스까지, 101개 언어를 지원합니다.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <I18nProvider>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
