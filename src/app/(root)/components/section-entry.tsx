import { createReader } from "@keystatic/core/reader";
import config from "../../../../keystatic.config";

const EntrySection = async () => {
  const reader = createReader(process.cwd(), config);
  const homepageData = await reader.singletons.homepage.read();

  console.log(homepageData);
  return (
    <div className="text-base w-full font-nrmal px-default py-4 text-center space-y-2">
      <h1 className="text-xl md:text-system-24 md:leading-system-24 font-bold tracking-tight">
        {homepageData?.headline}
      </h1>
      <p className="text-muted-foreground  md:text-system-18 md:leading-system-18">
        {homepageData?.tagline}
      </p>
    </div>
  );
};

export default EntrySection;
