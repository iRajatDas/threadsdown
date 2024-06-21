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
};

const adUnitConfigs = {
  AB_FOLD_MEDIUM_RECTANGLE: {
    client: "ca-pub-3641558149669921",
    slot: "7730917567",
    style: { width: 300, height: 250 },
  },
} as const;

type AdUnitNames = keyof typeof adUnitConfigs;

type AdSenseAdProps = {
  name: AdUnitNames;
  className?: string;
};

const AdSenseAd: React.FC<AdSenseAdProps> = ({ name, className }) => {
  const {
    client = "ca-pub-3641558149669921",
    slot,
    style,
    layout = "responsive",
    format = "auto",
  }: AdUnitConfig = adUnitConfigs[name];

  useEffect(() => {
    if (typeof window !== "undefined" && window.adsbygoogle) {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    }
  }, []);

  return (
    <div className={cn(className, "grid w-full place-items-center")}>
      <ins
        className="adsbygoogle bg-gray-50/20"
        style={{ display: "block", ...(style || {}) }}
        data-ad-client={client}
        data-ad-slot={slot}
        {...(layout && { "data-ad-layout": layout })}
        {...(format && { "data-ad-format": format })}
      />
    </div>
  );
};

export default AdSenseAd;
