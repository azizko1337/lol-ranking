import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

type Props = {
  title: string;
  description: string;
};

function AlertComponent(props: Props) {
  const { title, description } = props;

  return (
    <Alert className="w-72 mx-auto">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
}

export default AlertComponent;
