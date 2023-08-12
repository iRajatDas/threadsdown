import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { LuAlertCircle } from "react-icons/lu";

const AlertSection = async () => {
  return (
    <div className="px-default py-4">
      <Alert className="rounded-2xl">
        <LuAlertCircle className="h-4 w-4" />
        <AlertTitle className="text-base">Notice</AlertTitle>
        <AlertDescription className="text-muted-foreground space-y-2 text-base">
          <p>
            Insta Threads Down is not affiliated with Meta™. We do not host any
            Meta content. All rights belong to their respective owners.
          </p>
          <p>We respect privacy — only public content is available.</p>
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default AlertSection;
