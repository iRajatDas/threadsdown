import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { LuAlertCircle } from "react-icons/lu";
import { createReader } from "@keystatic/core/reader";
import { DocumentRenderer } from "@keystatic/core/renderer";
import config from "../../../../keystatic.config";

const AlertSection = async () => {
  const reader = createReader(process.cwd(), config);
  const homepageData = await reader.singletons.homepage.read();

  // Convert homepageData.alertContent to Element[] type
  const alertContent = homepageData?.alertContent
    ? await homepageData.alertContent()
    : [];

  return (
    <div className="px-default py-4">
      <Alert className="rounded-2xl">
        <LuAlertCircle className="h-4 w-4" />
        <AlertTitle className="text-base">{homepageData?.alertTitle}</AlertTitle>
        <AlertDescription className="text-muted-foreground space-y-2 text-base">
          {alertContent.length > 0 && (
            <>
              <DocumentRenderer
                document={alertContent}
                renderers={{
                  inline: {
                    bold: ({ children }) => {
                      return (
                        <p>
                          <strong>{children}</strong>
                        </p>
                      );
                    },
                  },
                  block: {
                    paragraph: ({ children }) => {
                      return <p>{children}</p>;
                    },
                  },
                }}
              />
            </>
          )}
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default AlertSection;
