import NextImage from "next/image";
const Image = ({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption?: string;
}) => {
  return (
    <div className="flex flex-col items-center">
      <NextImage src={`/${src}`} alt={alt} />
      {caption && <p className="mt-0 text-center text-sm">{caption}</p>}
    </div>
  );
};

export default Image;
