import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import "chartjs-adapter-moment";
import { useTheme } from "next-themes";
import ChartData from "@/types/ChartData";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TimeScale,
  Title,
  Tooltip,
  Legend
);

type Props = {
  data: ChartData;
  title: string;
};

function LineChart(props: Props) {
  const { data, title } = props;
  const { resolvedTheme: theme } = useTheme();

  return (
    <Line
      options={{
        maintainAspectRatio: false,
        animation: false,
        responsive: true,
        interaction: {
          mode: "index" as const,
          intersect: false,
        },
        plugins: {
          title: {
            display: true,
            text: title,
          },
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            suggestedMax: 2500,
            beginAtZero: true,
            ticks: {
              callback: function (tickValue: string | number) {
                return tickValue + " [SP]";
              },
              color: theme === "dark" ? "white" : "black",
            },
            grid: {
              color: theme === "dark" ? "#555" : "#bbb",
            },
          },
          x: {
            type: "time",
            time: {
              unit: "day",
              displayFormats: {
                day: "YYYY-MM-DD",
              },
            },
            ticks: {
              color: theme === "dark" ? "white" : "black",
            },
            grid: {
              color: theme === "dark" ? "#555" : "#bbb",
            },
          },
        },
      }}
      data={data}
    />
  );
}

export default LineChart;
