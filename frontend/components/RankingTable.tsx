import type Summoner from "@/types/Summoner";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import AlertComponent from "./AlertComponent";
import { format } from "date-fns";
import shortenNick from "@/lib/shortenNick";

type Props = {
  ranking: Summoner[];
  lastRefresh: Date | null;
};

function RankingTable(props: Props) {
  const { ranking, lastRefresh } = props;

  if (ranking.length === 0) {
    return (
      <div className="flex justify-center">
        <AlertComponent
          title="No data found"
          description="There is no ranking saved from this day. Please try another day."
        />
      </div>
    );
  }

  return (
    <Table>
      {lastRefresh ? (
        <TableCaption>
          Ranking last updated {format(lastRefresh, "HH:mm:ss dd/LL/yyyy")}
        </TableCaption>
      ) : null}
      <TableHeader>
        <TableRow>
          <TableHead className="">No</TableHead>
          <TableHead className="">Player</TableHead>
          <TableHead>Rank</TableHead>
          <TableHead className="">Wins</TableHead>
          <TableHead className="">Losses</TableHead>
          <TableHead className="">WR</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {ranking.map((summoner, index) => (
          <TableRow key={summoner.summonerId}>
            <TableCell className="font-medium">{index + 1}.</TableCell>
            <TableCell className="font-medium">
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button className="pl-0" variant="link" asChild>
                    <Link href={`/history/${summoner.summonerId}`}>
                      {shortenNick(summoner.lastKnownNick)}
                    </Link>
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent>
                  Click to show history chart.
                </HoverCardContent>
              </HoverCard>
            </TableCell>
            <TableCell>{`${summoner.tier.toLowerCase()} ${summoner.rank}, ${
              summoner.leaguePoints
            } LP`}</TableCell>
            <TableCell className="">{summoner.wins}</TableCell>
            <TableCell className="">{summoner.losses}</TableCell>
            <TableCell className="">
              {Math.round(
                (summoner.wins / (summoner.wins + summoner.losses)) * 100
              )}
              %
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default RankingTable;
