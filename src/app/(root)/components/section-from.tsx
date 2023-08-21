import { QueryForm } from "@/components/query-form";
import Tabs from "@/components/tabs";

const FormSection = () => {
  return (
    <div className="px-default py-4 shadow">
      <Tabs/>
      <div className="px-default py-4 bg-barcelona-secondary-background rounded-2xl border mt-4">
        <QueryForm />
      </div>
    </div>
  );
};

export default FormSection;
