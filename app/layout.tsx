import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AI Today",
  description: "Daily AI News Summaries Powered by ChatGPT"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 text-gray-900`}>
        <main className="max-w-3xl mx-auto py-10 px-4">{children}</main>
      </body>
    </html>
  );
}