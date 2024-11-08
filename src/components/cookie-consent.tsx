"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { MouseEvent, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { motion, AnimatePresence, useCycle } from "framer-motion"; // Import useCycle

const USER_CONSENT_COOKIE_KEY = "cookie_consent_is_true";
const USER_CONSENT_COOKIE_EXPIRE_DATE = 365;

const CookieConsent = () => {
  const [isVisible, onCycle] = useCycle(true, false); // Add the useCycle hook
  const [cookieConsentIsTrue, setCookieConsentIsTrue] = useState(true);

  useEffect(() => {
    const consentIsTrue = Cookies.get(USER_CONSENT_COOKIE_KEY) === "true";
    setCookieConsentIsTrue(consentIsTrue);
  }, []);

  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!cookieConsentIsTrue) {
      Cookies.set(USER_CONSENT_COOKIE_KEY, "true", {
        expires: USER_CONSENT_COOKIE_EXPIRE_DATE,
      });
      setCookieConsentIsTrue(true);
    }
  };

  if (cookieConsentIsTrue) {
    return null;
  }

  return (
    <AnimatePresence mode="wait">
      {isVisible && ( // Use isVisible for conditional rendering
        <motion.section
          key={"banner"}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{
            type: "spring",
            delay: 0.5,
            duration: 0.7,
          }}
          className="fixed bottom-1 left-0 right-0 z-40 mx-auto w-full max-w-3xl px-default py-2 md:bottom-6 md:py-4"
        >
          <div className="flex items-start space-x-1 rounded-lg border border-barcelona-elevated-border bg-barcelona-elevated-background/70 px-5 py-3 backdrop-blur md:items-stretch md:space-x-2">
            <div className="flex flex-1 items-center text-barcelona-primary-text">
              <p className="text-[0.645rem] font-medium md:text-xs">
                Site uses cookies for better experience, traffic analysis; check{" "}
                <Link
                  href="/privacy-policy"
                  className="text-[0.645rem] underline md:text-xs"
                >
                  privacy policy
                </Link>{" "}
                for service info.
              </p>
            </div>
            <div className="flex shrink-0 items-center">
              <Button
                className="whitespace-nowrap border-barcelona-elevated-border bg-barcelona-primary-background p-3 text-[0.645rem] uppercase md:text-xs"
                variant={"outline"}
                onClick={(e) => {
                  onCycle(); // Call onCycle to toggle isVisible
                  onClick(e);
                }}
              >
                Got it
              </Button>
            </div>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
