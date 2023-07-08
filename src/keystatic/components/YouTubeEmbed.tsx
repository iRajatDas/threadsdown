function youtubeEmbedId(youTubeLink: string) {
  const url = youTubeLink;
  let embedId = "";
  const parsedUrl = (url || "")
    .replace(/(>|<)/gi, "")
    .split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  if (parsedUrl[2] !== undefined) {
    const parsedId = parsedUrl[2].split(/[^0-9a-z_-]/i);
    embedId = parsedId[0];
  } else {
    embedId = url;
  }
  return embedId;
}

const YouTubeEmbed = ({ youtubeLink }: { youtubeLink: string }) => {
  const embedId = youtubeEmbedId(youtubeLink);
  return (
    <div className="[&>iframe]:aspect-video [&>iframe]:w-full max-w-5xl mx-auto">
      <iframe
        src={`https://www.youtube.com/embed/${embedId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Youtube video player"
      />
    </div>
  );
};

export default YouTubeEmbed;
