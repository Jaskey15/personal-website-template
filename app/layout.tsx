import type { Metadata } from "next";
import { Inter, Crimson_Text } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap"
});
const crimsonText = Crimson_Text({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-crimson",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Your Name",
  description: "Personal portfolio and blog - clean, minimal, thoughtful",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} ${crimsonText.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
