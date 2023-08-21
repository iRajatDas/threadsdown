"use client";

import React, { useEffect, useState } from "react";
import { InstagramProfileCard } from "../cards";
import { useThreadFormStore } from "@/lib/store";

const SectionUserProfile = () => {
  const [userProfileData, setuserProfileData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  // const [error, setError] = useState<string | null>(null);

  const threads = useThreadFormStore((state) => state.threads);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        setuserProfileData(threads);
        setLoading(false);
      } catch (err) {
        // setError("Error fetching data");
        setLoading(false);
      }
    };

    fetchData();
  }, [threads]);

  if (
    userProfileData === null ||
    userProfileData === "undefined" ||
    userProfileData?.hasOwnProperty("media")
  ) {
    return null;
  }

  return <InstagramProfileCard profileData={userProfileData} />;
};

export default SectionUserProfile;
