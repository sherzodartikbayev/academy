import { AlertCircleIcon } from "lucide-react";
import { Alert, AlertDescription } from "../ui/alert";
import Reveal from "./reveal";

interface ErrorAlertProps {
  message: string;
}

const ErrorAlert = ({ message }: ErrorAlertProps) => {
  return (
    <Reveal>
      <Alert className="m-5 ml-0 border-destructive bg-destructive/10 text-destructive">
        <AlertCircleIcon />
        <AlertDescription className="font-space-grotesk font-semibold">
          {message}
        </AlertDescription>
      </Alert>
    </Reveal>
  );
};

export default ErrorAlert;
