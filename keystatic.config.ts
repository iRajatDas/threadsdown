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
      path: "content/_homepage/faqs/*/",
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
  },
});
