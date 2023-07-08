import { QueryForm } from "@/components/query-form";

const FormSection = () => {
  return (
    <div className="px-default py-4 shadow">
      <div className="px-default py-4 bg-barcelona-secondary-background rounded-2xl border">
        <QueryForm />
      </div>
    </div>
  );
};


export default FormSection