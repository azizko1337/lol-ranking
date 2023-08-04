"use client";

import { useState, useEffect } from "react";
import LineChart from "@/components/LineChart";
import SkeletonLoading from "@/components/SkeletonLoading";
import AlertComponent from "@/components/AlertComponent";
import shortenNick from "@/lib/shortenNick";
import type ChartData from "@/types/ChartData";

type Props = {
  params: {
    summonerId: string;
  };
};

function SummonerHistory(props: Props) {
  const { summonerId } = props.params;
  const [history, setHistory] = useState<ChartData | "loading" | null>(
    "loading"
  );

  useEffect(() => {
    async function fetchHistory() {
      try {
        const response = await fetch(
          `${process.env.BACKEND_URL}/summonerHistoryChartFormat?summonerId=${summonerId}`
        );
        const data = await response.json();
        const { summonerHistoryChartFormat } = data;
        summonerHistoryChartFormat.datasets[0].backgroundColor = "darkblue";
        if (response.status !== 200)
          throw new Error("Error while fatching data. No communication.");
        setHistory(summonerHistoryChartFormat);
      } catch (err) {
        setHistory(null);
      }
    }
    fetchHistory();
  }, [summonerId]);

  if (history === "loading") {
    return <SkeletonLoading />;
  }

  if (history === null) {
    return (
      <AlertComponent
        title="Error"
        description="No communication with server :("
      />
    );
  }

  return (
    <div className="pt-4 h-[80vh]">
      {history ? (
        <LineChart
          data={history}
          title={`${shortenNick(history.datasets[0].label)}' ranking history`}
        />
      ) : null}
    </div>
  );
}

export default SummonerHistory;
