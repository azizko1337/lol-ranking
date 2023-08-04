import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import shortenNick from "@/lib/shortenNick";

type Props = {
  icon: React.ReactNode;
  title: string;
  badge: string;
  summonerId: string;
  lastKnownNick: string;
  description: string;
};

function FunStat(props: Props) {
  const { icon, title, badge, summonerId, lastKnownNick, description } = props;

  return (
    <Alert className="w-full">
      {icon}
      <AlertTitle>
        {title}
        <br />
        <HoverCard>
          <HoverCardTrigger className="px-0" asChild>
            <Button variant="link" asChild>
              <Link href={`/history/${summonerId}`}>
                {shortenNick(lastKnownNick)}
                <Badge className="ml-1 break-keep" variant="outline">
                  {badge}
                </Badge>
              </Link>
            </Button>
          </HoverCardTrigger>
          <HoverCardContent>Click to show history chart.</HoverCardContent>
        </HoverCard>
      </AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
}

export default FunStat;
