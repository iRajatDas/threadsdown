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
      {/* affiliate-spring-campaign-728x90 */}
      {/* <div
        id="div-ad-1716378510"
        className="relative mx-auto mb-4"
        style={{ maxWidth: "728px" }}
      >
        <Link
          href="https://go.nordvpn.net/aff_c?offer_id=15&aff_id=105447&url_id=902"
          className="absolute inset-0"
          rel="sponsored"
        />
        <Image
          src="/images/third-party/ndvpn-affiliate-spring-campaign-728x90.png"
          alt="affiliate-spring-campaign-728x90"
          width={728}
          height={90}
        />
      </div> */}

      <Tabs />
      <div className="mt-4 rounded-2xl border bg-barcelona-secondary-background px-default py-4">
        <QueryForm type={type} />
      </div>
    </div>
  );
};

export default FormSection;
