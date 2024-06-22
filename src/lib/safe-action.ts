import { createSafeActionClient } from "next-safe-action";

export const actionClient = createSafeActionClient({
  handleReturnedServerError(e) {
    return "An error occurred while processing your request. Please try again later.";
  },
});
