import {
  GitHubConfig,
  LocalConfig,
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
});
