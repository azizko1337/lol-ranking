"use client";

import { useState, useEffect } from "react";
import LineChart from "@/components/LineChart";
import SkeletonLoading from "@/components/SkeletonLoading";
import AlertComponent from "@/components/AlertComponent";
import SelectSummoner from "@/components/SelectSummoner";
import type ChartData from "@/types/ChartData";

function History() {
  const [history, setHistory] = useState<ChartData | "loading" | null>(
    "loading"
  );

  useEffect(() => {
    async function fetchHistory() {
      try {
        const response = await fetch(
          `${process.env.BACKEND_URL}/wholeHistoryChartFormat`
        );
        if (response.status !== 200)
          throw new Error("Error while fatching data. No communication.");
        const data = await response.json();
        const { wholeHistoryChartFormat } = data;
        setHistory(wholeHistoryChartFormat);
      } catch (err) {
        setHistory(null);
      }
    }
    fetchHistory();
  }, []);

  if (history === "loading") {
    return <SkeletonLoading />;
  }

  if (history === null) {
    if (history === null) {
      return (
        <AlertComponent
          title="Error"
          description="No communication with server :("
        />
      );
    }
  }

  return (
    <>
      <SelectSummoner history={history} setHistory={setHistory} />
      <div className="container h-screen md:h-[70vh] mt-8">
        {history ? <LineChart data={history} title="Ranking history" /> : null}
      </div>
    </>
  );
}

export default History;
