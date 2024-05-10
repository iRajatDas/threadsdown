// "use client";
// import { Button } from "@/components/ui/button";
// import { getPostData } from "@/lib/threads";

import { FC } from "react";

interface EntrySectionProps {
  title?: string;
  description?: string;
}

const EntrySection: FC<EntrySectionProps> = ({
  title = "Threads video downloader",
  description = "Download Videos from Threads by Instagram",
}) => {
  // const handleDownload = async () => {
  //   const data = getPostData("Cv1dd8nJnWs");
  //   console.log(data);
  // };

  return (
    <div className="font-nrmal w-full space-y-2 px-default py-4 text-center text-base">
      <h1 className="text-xl font-bold tracking-tight md:text-system-24 md:leading-system-24">
        {title}
      </h1>
      <p className="text-muted-foreground  md:text-system-18 md:leading-system-18">
        {description}
      </p>
    </div>
  );
};

export default EntrySection;
