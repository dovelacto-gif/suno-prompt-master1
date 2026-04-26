import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Suno Prompt Master",
  description: "Create polished Suno music prompts in seconds."
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
