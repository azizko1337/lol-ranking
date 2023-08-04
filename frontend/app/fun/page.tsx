"use client";

import { useState, useEffect } from "react";
import FunStat from "@/components/FunStat";
import { format } from "date-fns";
import type Summoner from "@/types/Summoner";
import SkeletonLoading from "@/components/SkeletonLoading";
import AlertComponent from "@/components/AlertComponent";
import { Crown, Bird, Flame, Annoyed, Angry } from "lucide-react";

type FunStats =
  | {
      longestOnFirstPlace: Summoner & {
        daysOnFirstPlace: number;
      };
      highestRanking: Summoner & {
        day: number;
      };
      lowestRanking: Summoner & {
        day: number;
      };
      bestWR: Summoner & {
        day: number;
      };
      worstWR: Summoner & {
        day: number;
      };
    }
  | null
  | "loading";

function Fun() {
  const [funStats, setFunStats] = useState<FunStats>("loading");
  useEffect(() => {
    async function fetchRanking() {
      try {
        const response = await fetch(`${process.env.BACKEND_URL}/funStats`);
        if (response.status !== 200)
          throw new Error(
            "Error while fatching data. No data on server or no communication."
          );

        const data = await response.json();
        setFunStats(data.funStats);
      } catch (err) {
        setFunStats(null);
      }
    }
    fetchRanking();
  }, []);

  if (funStats === "loading") {
    return <SkeletonLoading />;
  }

  if (funStats === null) {
    return <AlertComponent title="Error" description="No data :(" />;
  }

  return (
    <div className="px-2 w-full overflow-hidden max-w-xl mx-auto flex flex-col gap-5">
      <FunStat
        icon={<Crown className="h-4 w-4" />}
        title="Longest on the first place"
        badge="GOAT"
        summonerId={funStats.longestOnFirstPlace.summonerId}
        lastKnownNick={funStats.longestOnFirstPlace.lastKnownNick}
        description={`The best for ${funStats.longestOnFirstPlace.daysOnFirstPlace} days`}
      />
      <FunStat
        icon={<Bird className="h-4 w-4" />}
        title="Highest rank"
        badge="ONE DAY WONDER"
        summonerId={funStats.highestRanking.summonerId}
        lastKnownNick={funStats.highestRanking.lastKnownNick}
        description={`${funStats.highestRanking.tier} ${
          funStats.highestRanking.rank
        }, ${funStats.highestRanking.leaguePoints} LP on ${format(
          new Date(funStats.highestRanking.day),
          "dd.MM.yyyy"
        )}`}
      />
      <FunStat
        icon={<Flame className="h-4 w-4" />}
        title="Best W/R"
        badge="EZ"
        summonerId={funStats.bestWR.summonerId}
        lastKnownNick={funStats.bestWR.lastKnownNick}
        description={`${funStats.bestWR.wins} wins, ${
          funStats.bestWR.losses
        } losses = ${Math.round(
          (funStats.bestWR.wins /
            (funStats.bestWR.wins + funStats.bestWR.losses)) *
            100
        )}% WR on ${format(new Date(funStats.bestWR.day), "dd.MM.yyyy")}`}
      />
      <FunStat
        icon={<Angry className="h-4 w-4" />}
        title="Worst W/R"
        badge="MAD?"
        summonerId={funStats.worstWR.summonerId}
        lastKnownNick={funStats.worstWR.lastKnownNick}
        description={`${funStats.worstWR.wins} wins, ${
          funStats.worstWR.losses
        } losses = ${Math.round(
          (funStats.worstWR.wins /
            (funStats.worstWR.wins + funStats.worstWR.losses)) *
            100
        )}% WR on ${format(new Date(funStats.worstWR.day), "dd.MM.yyyy")}`}
      />
      <FunStat
        icon={<Annoyed className="h-4 w-4" />}
        title="Lowest rank"
        badge="XD"
        summonerId={funStats.lowestRanking.summonerId}
        lastKnownNick={funStats.lowestRanking.lastKnownNick}
        description={`${funStats.lowestRanking.tier} ${
          funStats.lowestRanking.rank
        }, ${funStats.lowestRanking.leaguePoints} LP on ${format(
          new Date(funStats.lowestRanking.day),
          "dd.MM.yyyy"
        )}`}
      />
    </div>
  );
}

export default Fun;
