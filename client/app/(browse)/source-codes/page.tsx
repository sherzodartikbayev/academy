import SourceCodeCard from "@/components/cards/source-code.card";
import { source_codes } from "@/constants";

const SourceCodesPage = () => {
  return (
    <>
      <h1 className="text-2xl font-space-grotesk font-semibold">
        Source Codes
      </h1>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 mt-4">
        {source_codes.map((codes) => (
          <SourceCodeCard sourceCode={codes} key={codes.id} />
        ))}
      </div>
    </>
  );
};

export default SourceCodesPage;
