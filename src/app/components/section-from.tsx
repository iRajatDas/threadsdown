import AdSenseAd from "@/components/ads/google-adsense";
import { QueryForm } from "@/components/query-form";
import Tabs from "@/components/tabs";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface QueryType {
  type?: "getThreads" | "getUserProfile";
}

const FormSection: FC<QueryType> = ({ type = "getThreads" }) => {
  return (
    <div className="px-default py-4 shadow">
      <AdSenseAd name="AB_FOLD_MEDIUM_RECTANGLE" className="mb-4" />
      <Tabs />
      <div className="mt-4 rounded-2xl border bg-barcelona-secondary-background px-default py-4">
        <QueryForm type={type} />
      </div>
    </div>
  );
};

export default FormSection;
