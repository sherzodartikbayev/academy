import { SourceCodeType } from "@/types/app.types";

interface SourceCodeCardProps {
  sourceCode: SourceCodeType;
}

const SourceCodeCard = ({ sourceCode }: SourceCodeCardProps) => {
  return (
    <div className="p-4 bg-linear-tobr from-card to-primary rounded-md flex justify-between items-center">
      <h2 className="text-xl font-space-grotesk font-semibold line-clamp-1 truncate">
        {sourceCode.title}
      </h2>
    </div>
  );
};

export default SourceCodeCard;
