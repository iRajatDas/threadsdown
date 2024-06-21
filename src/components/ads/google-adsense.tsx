"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef } from "react";

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

type AdUnitConfig = {
  slot: string;
  client?: string;
  style?: React.CSSProperties;
  layout?: "fixed" | "responsive";
  format?: "auto" | "fluid" | string;
  fullWidthResponsive?: boolean;
};

const adUnitConfigs = {
  AB_FOLD_MEDIUM_RECTANGLE: {
    client: "ca-pub-3641558149669921",
    slot: "7730917567",
    style: { display: "inline-block", width: "300px", height: "250px" },
  },
  DP_GAP_HORIZONTAL: {
    client: "ca-pub-3641558149669921",
    slot: "7449708353",
    style: { display: "block" },
    format: "auto",
    fullWidthResponsive: true,
  },
} as const;

type AdUnitNames = keyof typeof adUnitConfigs;

type AdSenseAdProps = {
  name: AdUnitNames;
  className?: string;
};

const AdSenseAd: React.FC<AdSenseAdProps> = ({ name, className }) => {
  const adRef = useRef<HTMLDivElement>(null);
  const {
    client = "ca-pub-3641558149669921",
    slot,
    style,
    layout,
    format,
    fullWidthResponsive,
  }: AdUnitConfig = adUnitConfigs[name];

  useEffect(() => {
    const pushAds = () => {
      if (typeof window !== "undefined" && window.adsbygoogle) {
        window.adsbygoogle.push({});
      }
    };

    if (adRef.current) {
      const interval = setInterval(() => {
        if (adRef.current && adRef.current.offsetWidth > 0) {
          pushAds();
          clearInterval(interval);
        }
      }, 100);

      return () => clearInterval(interval);
    } else {
      pushAds();
    }
  }, []);

  return (
    <div
      ref={adRef}
      className={cn(className, "grid w-full place-items-center bg-slate-50/10 h-20--")}
      // style={{ width: "100%" }}
    >
      <ins
        className="adsbygoogle"
        style={{ display: "block", ...(style || {}) }}
        data-ad-client={client}
        data-ad-slot={slot}
        {...(layout && { "data-ad-layout": layout })}
        {...(format && { "data-ad-format": format })}
        {...(fullWidthResponsive && { "data-full-width-responsive": "true" })}
      />
    </div>
  );
};

export default AdSenseAd;
