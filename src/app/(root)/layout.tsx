import Footer from "@/components/footer";
import Header from "@/components/header";
import IconThreads from "@/components/icons/icon-threads";
import { Toaster } from "@/components/ui/toaster";
import "@/styles/globals.css";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title:
    "Threads Video Downloader | Download Photos & Videos From Thread For Free In High Quality",
  description:
    "Download Thread Videos and Photos In High Resolution For Free With Ease - Without Watermarks and Free Downloads",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="max-w-2xl mx-auto w-full h-full">
          <Toaster />
          <div className="flex flex-col h-full">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
