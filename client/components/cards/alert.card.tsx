import { AlertCircleIcon } from "lucide-react";
import { Alert, AlertDescription } from "../ui/alert";
import Reveal from "../shared/reveal";

interface AlertCardProps {
  message: string;
  variant: "error" | "success" | "warning";
}

const variantStyles = {
  error: "border-destructive bg-destructive/10 text-destructive",
  warning: "border-yellow-500 bg-yellow-500/10 text-yellow-500",
  success: "border-green-500 bg-green-500/10 text-green-500",
};

const AlertCard = ({ message, variant }: AlertCardProps) => {
  return (
    <Reveal>
      <Alert className={`m-5 ml-0 ${variantStyles[variant]}`}>
        <AlertCircleIcon />
        <AlertDescription className="font-space-grotesk font-semibold">
          {message}
        </AlertDescription>
      </Alert>
    </Reveal>
  );
};

export default AlertCard;
