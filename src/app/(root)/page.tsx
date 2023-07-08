import React from "react";
import EntrySection from "./components/section-entry";
import FormSection from "./components/section-from";
import AlertSection from "./components/section-alert";
import FAQSection from "./components/section-faq";

const Homepage = async () => {

  return (
    <>
      <EntrySection  />
      <FormSection />
      <AlertSection />
      <FAQSection />
    </>
  );
};

export default Homepage;
