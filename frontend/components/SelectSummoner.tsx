import { Eye, EyeOff } from "lucide-react";
import type ChartData from "@/types/ChartData";
import type { Dispatch } from "react";
import shortenNick from "@/lib/shortenNick";
import { Toggle } from "@/components/ui/toggle";

type Props = {
  history: ChartData;
  setHistory: Dispatch<ChartData>;
};

function SelectSummoner(props: Props) {
  const { history, setHistory } = props;

  function handleToggle(pressed: boolean, id: string) {
    const newDatasets = [...history.datasets];
    newDatasets.forEach((dataset) => {
      if (dataset.id === id) {
        dataset.hidden = !pressed;
        return;
      }
    });
    setHistory({ labels: history.labels, datasets: newDatasets });
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
      {history.datasets.map((dataset) => (
        <Toggle
          key={dataset.id}
          aria-label="Toggle italic"
          defaultPressed={!dataset.hidden}
          onPressedChange={(pressed) => handleToggle(pressed, dataset.id)}
        >
          {dataset.hidden ? (
            <EyeOff className={`mr-2 h-4 w-4`} />
          ) : (
            <Eye className={`mr-2 h-4 w-4`} />
          )}
          <span style={{ color: dataset.backgroundColor }}>
            {shortenNick(dataset.label)}
          </span>
        </Toggle>
      ))}
    </div>
  );
}

export default SelectSummoner;
