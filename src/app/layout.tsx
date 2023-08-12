import "@/styles/globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import localFont from "next/font/local";
import { siteConfig } from "@/config/site";

const inter = localFont({
  src: [
    {
      path: "../../assets/fonts/Inter-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../assets/fonts/Inter-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../assets/fonts/Inter-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../assets/fonts/Inter-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-sans",
});

export const metadata = {
  title: {
    default:
      "Threads Video Downloader | Download Photos & Videos From Thread For Free In High Quality",
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "threads video downloader",
    "thread video downloader",
    "instagram threads video download",
    "instagram thread video download",
    "threads video download",
    "instagram threads downloader",
    "threads downloader",
    "threads video downloader online",
    "threads video download online",
  ],
  authors: [
    {
      name: siteConfig.authorName,
      url: siteConfig.url,
    },
  ],
  creator: "instaThreadDown",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og.jpg`],
    creator: "@instaThreadsDown",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
};

// export const metadata = {
//   title:
//     "Threads Video Downloader | Download Photos & Videos From Thread For Free In High Quality",
//   description:
//     "Download Thread Videos and Photos In High Resolution For Free With Ease - Without Watermarks and Free Downloads",
// };

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
