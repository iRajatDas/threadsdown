import { ComponentBlocks } from "@/keystatic/components/ComponentBlocks";
import {
  GitHubConfig,
  LocalConfig,
  collection,
  config,
  fields,
  singleton,
} from "@keystatic/core";

const storage: LocalConfig["storage"] | GitHubConfig["storage"] =
  process.env.NODE_ENV === "development"
    ? { kind: "local" }
    : {
        kind: "github",
        repo: {
          owner: "iRajatDas",
          name: "threadsdown",
        },
      };

export default config({
  storage,
  singletons: {
    homepage: singleton({
      label: "Homepage",
      path: "src/content/_homepage",
      schema: {
        headline: fields.text({ label: "Headline" }),
        tagline: fields.text({ label: "Tagline" }),
        alertTitle: fields.text({ label: "Alert Heading" }),
        alertContent: fields.document({
          formatting: {
            inlineMarks: {
              bold: true,
              italic: true,
            },
          },
          label: "Alert Content",
        }),
      },
    }),
  },
  collections: {
    faqs: collection({
      label: "FAQs",
      path: "src/content/_homepage/faqs/*/",
      slugField: "question",
      schema: {
        question: fields.slug({
          name: {
            label: "Question",
            validation: {
              length: {
                min: 10,
                max: 150,
              },
            },
          },
        }),
        publishedDate: fields.date({
          label: "Published Date",
          validation: {
            isRequired: false,
          },
        }),
        answer: fields.document({
          formatting: true,
          links: true,
          label: "Answer",
        }),
      },
    }),
    authors: collection({
      label: "Authors",
      path: "src/content/authors/*",
      slugField: "name",
      schema: {
        name: fields.slug({
          name: {
            label: "Name",
            validation: {
              length: {
                min: 1,
              },
            },
          },
        }),
        role: fields.text({ label: "Role" }),
        avatar: fields.image({
          label: "Author avatar",
          directory: "public/images/authors",
        }),
      },
    }),
    posts: collection({
      label: "Posts",
      path: "src/content/posts/*/",
      slugField: "title",
      schema: {
        title: fields.slug({
          name: {
            label: "Title",
          },
        }),
        summary: fields.text({
          label: "Summary",
          validation: { length: { min: 4 } },
        }),
        publishedDate: fields.date({ label: "Published Date" }),
        coverImage: fields.image({
          label: "Image",
          directory: "public/images/posts",
        }),
        wordCount: fields.integer({
          label: "Word count",
        }),
        authors: fields.array(
          fields.relationship({
            label: "Post author",
            collection: "authors",
          }),
          {
            label: "Authors",
            validation: { length: { min: 1 } },
            itemLabel: (props) => props.value || "Please select an author",
          }
        ),
        content: fields.document({
          formatting: true,
          dividers: true,
          links: true,
          layouts: [
            [1, 1],
            [1, 1, 1],
            [2, 1],
            [1, 2, 1],
          ],
          label: "Content",
          componentBlocks: ComponentBlocks,
        }),
      },
    }),
  },
});
