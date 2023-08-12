import React from "react";
import EntrySection from "./components/section-entry";
import FormSection from "./components/section-from";
import AlertSection from "./components/section-alert";
import { Card } from "@/components/card";
import Link from "next/link";
import FAQSection from "./components/section-faq";

const Homepage = async () => {
  return (
    <>
      <EntrySection />
      <FormSection />
      <AlertSection />
      <FAQSection />
      <div className="px-default py-4 mt-10 space-y-4">
        <h2 className="text-3xl md:text-system-28 md:leading-system-28 font-extrabold tracking-tight">
          Read some articles
        </h2>
        <div className="space-y-6">
      
        </div>
      </div>
    </>
  );
};

export default Homepage;
