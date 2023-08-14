"use client";
import { Button } from "@/components/ui/button";
import { getPostData } from "@/lib/threads";

const EntrySection = () => {
  const handleDownload = async () => {
    const data = getPostData("Cv1dd8nJnWs");
    console.log(data);
  };

  return (
    <div className="text-base w-full font-nrmal px-default py-4 text-center space-y-2">
      <h1 className="text-xl md:text-system-24 md:leading-system-24 font-bold tracking-tight">
        Threads video downloader
      </h1>
      <p className="text-muted-foreground  md:text-system-18 md:leading-system-18">
        Download Videos from Threads by Instagram
      </p>
      <Button onClick={handleDownload}>Get Post Data</Button>
      <video src="https://scontent.cdninstagram.com/v/t51.2885-15/358803739_517801227166440_8487970028419127567_n.jpg?stp=dst-jpg_e15_s480x480&_nc_ht=scontent.cdninstagram.com&_nc_cat=100&_nc_ohc=n2_uwrfGWt4AX_tTZKA&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfAbM3LtiZh3K-7ZcmuNPS-X0LqWQaC8eUu_vFewTTHPzg&oe=64DB7CD1&_nc_sid=10d13b"></video>
    </div>
  );
};

export default EntrySection;
