import { QueryForm } from "@/components/query-form";
import Tabs from "@/components/tabs";
import { FC } from "react";

interface QueryType {
  type?: "getThreads" | "getUserProfile";
}

const FormSection: FC<QueryType> = ({ type = "getThreads" }) => {
  return (
    <div className="px-default py-4 shadow">
      <Tabs />
      <div className="px-default py-4 bg-barcelona-secondary-background rounded-2xl border mt-4">
        <QueryForm type={type} />
      </div>
    </div>
  );
};

export default FormSection;
