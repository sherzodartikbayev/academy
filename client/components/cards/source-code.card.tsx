import { SourceCodeType } from "@/types/app.types";
import { FaGithub } from "react-icons/fa";

interface SourceCodeCardProps {
  sourceCode: SourceCodeType;
}

const SourceCodeCard = ({ sourceCode }: SourceCodeCardProps) => {
  return (
    <div className="p-4 bg-linear-to-br from-card to-primary rounded-md flex justify-between items-center">
      <h2 className="text-xl font-space-grotesk font-semibold line-clamp-1 truncate">
        {sourceCode.title}
      </h2>

      <FaGithub />
    </div>
  );
};

export default SourceCodeCard;
