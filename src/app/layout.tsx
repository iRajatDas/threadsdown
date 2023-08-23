import "@/styles/globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import localFont from "next/font/local";
import { siteConfig } from "@/config/site";
import { Metadata } from "next";
import Script from "next/script";
import CookieConsent from "@/components/cookie-consent";

const GTM_ID = "GTM-546JSW3K";

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

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL as string),
  title: {
    default:
      "Threads Video Downloader | Download Photos & Videos From Thread For Free In High Quality",
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  robots: {
    googleBot: "index,follow",
    index: true,
    follow: true,
  },
  keywords: [
    "threads video downloader",
    "threads photos downloader",
    "thread video downloader",
    "instagram threads video download",
    "instagram thread video download",
    "threads video download",
    "instagram threads downloader",
    "threads downloader",
    "threads media downloader",
    "threads video downloader online",
    "threads photo downloader",
    "threads dp download",
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
  // icons: {
  //   // icon: "/favicon.ico",
  //   // shortcut: "/favicon-16x16.png",
  //   // apple: "/apple-touch-icon.png",
  // },
  manifest: `${siteConfig.url}/site.webmanifest`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <Script id="google-tag-manager" strategy="afterInteractive">
        {`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${GTM_ID}');
        `}
      </Script>
      <body className={cn("font-sans")}>
        <div className="max-w-3xl mx-auto w-full h-full">
          <Toaster />
          <div className="flex flex-col h-full relative">
            <CookieConsent />
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </div>
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}" height="0" width="0" style="display: none; visibility: hidden;"></iframe>`,
          }}
        />
      </body>
    </html>
  );
}
