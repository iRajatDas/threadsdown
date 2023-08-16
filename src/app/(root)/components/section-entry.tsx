// "use client";
// import { Button } from "@/components/ui/button";
// import { getPostData } from "@/lib/threads";

const EntrySection = () => {
  // const handleDownload = async () => {
  //   const data = getPostData("Cv1dd8nJnWs");
  //   console.log(data);
  // };

  return (
    <div className="text-base w-full font-nrmal px-default py-4 text-center space-y-2">
      <h1 className="text-xl md:text-system-24 md:leading-system-24 font-bold tracking-tight">
        Threads video downloader
      </h1>
      <p className="text-muted-foreground  md:text-system-18 md:leading-system-18">
        Download Videos from Threads by Instagram
      </p>
    </div>
  );
};

export default EntrySection;
