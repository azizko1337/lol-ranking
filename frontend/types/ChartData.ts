type ChartData = {
  labels: string[];
  datasets: {
    label: string;
    backgroundColor: string;
    id: string;
    hidden: boolean;
    data: {
      x: number;
      y: number;
    }[];
  }[];
};

export default ChartData;
