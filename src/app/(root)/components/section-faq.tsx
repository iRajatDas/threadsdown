import { Card } from "@/components/card";
import { createReader } from "@keystatic/core/reader";
import config from "../../../../keystatic.config";
import { DocumentRenderer } from "@keystatic/core/renderer";

interface FaqEntry {
  question: string;
  answer: () => Promise<any[]>;
}

async function getFaqData(reader: any): Promise<FaqEntry[]> {
  const faqsSlugs = await reader.collections.faqs.list();
  const postData = await Promise.all(
    faqsSlugs.map(async (slug: string) => {
      const faq = await reader.collections.faqs.read(slug);
      const answer = faq?.answer || [];
      return {
        question: faq?.question || "",
        answer,
      };
    })
  );
  return postData;
}

const FAQSection = async () => {
  const reader = createReader(process.cwd(), config);
  const faqs: FaqEntry[] = await getFaqData(reader);

  return (
    <div className="px-default py-4 mt-10 space-y-4">
      <h2 className="text-3xl md:text-system-28 md:leading-system-28 font-extrabold tracking-tight">
        Your Video Downloader For Threads
      </h2>
      <p className="text-muted-foreground">
        Collect hot content from Threads and reuse videos if needed. The tool is
        user-friendly – find the answers to all your questions below.
      </p>
      <div className="space-y-6">
        {faqs.map(async (entry, i: number) => {
          const answerElements = await entry.answer();
          return (
            <Card key={entry.question + i}>
              <article className="px-default py-4">
                <h2 className="z-20 text-lg font-bold duration-1000 lg:text-2xl text-zinc-200 group-hover:text-white font-display">
                  {entry.question}
                </h2>
                {answerElements.length > 0 && (
                  <div className="">
                    <DocumentRenderer
                      document={answerElements}
                      renderers={{
                        inline: {
                          bold: ({ children }) => {
                            return (
                              <p className="z-20 mt-4 text-sm duration-1000 text-zinc-400 group-hover:text-zinc-200">
                                <strong>{children}</strong>
                              </p>
                            );
                          },
                        },
                        block: {
                          paragraph: ({ children }) => {
                            return (
                              <p className="z-20 mt-4 text-sm duration-1000 text-zinc-400 group-hover:text-zinc-200">
                                {children}
                              </p>
                            );
                          },
                        },
                      }}
                    />
                  </div>
                )}
              </article>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default FAQSection;
