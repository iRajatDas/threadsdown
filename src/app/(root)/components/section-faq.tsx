import { Card } from "@/components/card";

const faqs = [
  {
    question: "What is an Threads Video Downloader?",
    answer:
      "The Video Downloader for Threads is an online service that allows you to save video content on your PC or mobile phone. This tool is the simplest approach to downloading videos you like and can't live without on your device. Inflact has no limits on the number of videos you can download, choose the most suitable package for your needs.              ",
  },
  {
    question: "What devices are compatible with the in-built Downloader?",
    answer:
      "InstaThreadsDown supports downloads from Threads regardless of the operating system and device type. It is possible to save catchy vids to your iPhone, Android, and computer. The only rule –  you might have to free up some memory on a device. Content downloading on a computer is available for the most popular operating systems – macOS, Windows, Linux. The Inflact Downloader is an online service accessible from any gadget from all over the globe.",
  },
  {
    question: "InstaThreadsDown Downloader Video Threads. Is it free?",
    answer:
      "Yes, you can use Threads Video Downloader online at a zero dollar fee. If you want to save all of a profile’s content at once, without limitations, you need to subscribe to the Premium Downloader of profiles. It’s paid: $7/month for 3 profiles, $19/month for 10 profiles, and $99/month for 100 profiles to download.",
  },
  {
    question: "Is it legal to save videos via Video Downloader for Threads?",
    answer:
      "Yes. The InstaThreadsDown tool for content saving from social media is 100% safe and legal. When you save the media that other users uploaded onto their account, bear in mind a crucial rule, which is you can save any content, but it’s only for personal use. It is legal to save someone's content to view offline, but you can't reuse it to get income. Otherwise, you should ask the author and mention them whenever you publish their video.",
  },
  {
    question: "Are there any limits on the number of videos I can download?",
    answer:
      "No. You can copy and paste links from dusk till dawn and download Threads videos without limitations. But if you want to save time and download all videos from a profile, subscribe for a Premium Package: $7/month for 3 profiles, $19/month for 10 profiles and $99/month for 100 profiles to download.",
  },
  {
    question: "Can I save other than video content on this site?",
    answer:
      "Sure. InstaThreadsDown has the tool for saving images, IGTV, Stories along with videos. It works just the same, you just need to insert a link to the content.",
  },
];

type Faq = {
  question: string;
  answer: string;
};

const FAQSection = () => {
  return (
    <div className="px-default py-4 mt-10 space-y-4">
      <h2 className="text-3xl md:text-system-28 md:leading-system-28 font-extrabold tracking-tight">
        Your Video Downloader For Threads
      </h2>
      <p className=" text-muted-foreground">
        Collect hot content from Threads and reuse videos if needed. The tool is
        user-friendly – find the answers to all your questions below.
      </p>
      <div className="space-y-6">
        {faqs.map(({ question, answer }: Faq, i) => (
          <Card key={question + i}>
            <article className="px-default py-4">
              <h2 className="z-20 text-lg font-bold duration-1000 lg:text-2xl text-zinc-200 group-hover:text-white font-display">
                {question}
              </h2>
              <p className="z-20 mt-4 text-sm  duration-1000 text-zinc-400 group-hover:text-zinc-200">
                {answer}
              </p>
            </article>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
