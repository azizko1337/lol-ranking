"use client";

import { useState, useEffect } from "react";
import type Summoner from "@/types/Summoner";
import DatePicker from "@/components/DatePicker";
import RankingTable from "@/components/RankingTable";
import SkeletonLoading from "@/components/SkeletonLoading";
import AlertComponent from "@/components/AlertComponent";
import getDayTimestamp from "@/lib/getDayTimestamp";

function Index() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [availableHistory, setAvailableHistory] = useState<Date[]>([]);
  useEffect(() => {
    async function fetchAvailableHistory() {
      try {
        const response = await fetch(`${process.env.BACKEND_URL}/savedDays`);
        const data = await response.json();
        const { savedDays } = data;
        const availableDays = [];
        for (const timestamp of savedDays) {
          availableDays.push(new Date(timestamp - 86400000));
        }
        availableDays.push(new Date());
        setAvailableHistory(availableDays);
      } catch (err) {}
    }
    fetchAvailableHistory();
  }, []);

  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);
  const [ranking, setRanking] = useState<Summoner[] | "loading" | null>(
    "loading"
  );
  useEffect(() => {
    async function fetchRanking() {
      try {
        let response;
        if (getDayTimestamp(date) === getDayTimestamp(undefined) || !date) {
          response = await fetch(`${process.env.BACKEND_URL}/ranking`);
        } else {
          response = await fetch(
            `${process.env.BACKEND_URL}/ranking?day=${
              date.getTime() + 86400000
            }`
          );
        }
        if (response.status !== 200)
          throw new Error("Error while fatching data. No communication.");
        const data = await response.json();
        setLastRefresh(new Date(data.lastRefresh));
        setRanking(data.ranking);
      } catch (err) {
        setRanking(null);
      }
    }
    fetchRanking();
  }, [date]);

  if (ranking === null) {
    return (
      <AlertComponent
        title="Error"
        description="No communication with server"
      />
    );
  }

  return (
    <>
      <DatePicker
        date={date}
        setDate={setDate}
        availableHistory={availableHistory}
      />
      {ranking === "loading" ? (
        <SkeletonLoading />
      ) : (
        <RankingTable ranking={ranking} lastRefresh={lastRefresh} />
      )}
    </>
  );
}

export default Index;
