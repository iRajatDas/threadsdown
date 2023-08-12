import "@/styles/globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import localFont from "next/font/local";

const inter = localFont({
  src: [
    {
      path: "../../../assets/fonts/Inter-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../assets/fonts/Inter-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../../assets/fonts/Inter-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../../assets/fonts/Inter-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-sans",
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
    <html lang="en" className={inter.variable}>
      <body className={cn("font-sans")}>
        <div className="max-w-3xl mx-auto w-full h-full">
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
