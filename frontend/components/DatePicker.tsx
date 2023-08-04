import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarIcon, ArrowLeft, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { SelectSingleEventHandler } from "react-day-picker";
import getDayTimestamp from "@/lib/getDayTimestamp";

type Props = {
  date: Date | undefined;
  availableHistory: Date[];
  setDate: (date: Date) => void;
};

function DatePicker(props: Props) {
  const { date, availableHistory, setDate } = props;

  function previousDay() {
    date
      ? setDate(new Date(date.getTime() - 86400000))
      : setDate(new Date(getDayTimestamp(undefined) - 86400000));
  }
  function nextDay() {
    date
      ? setDate(new Date(date.getTime() + 86400000))
      : setDate(new Date(getDayTimestamp(undefined)));
  }

  return (
    <div className="container flex justify-center items-center gap-2 mt-4 mb-6">
      <Button onClick={previousDay} className="p-1">
        <ArrowLeft className="w-6 h-6" />
      </Button>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[280px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Latest ranking</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            modifiers={{ available: availableHistory }}
            modifiersStyles={{
              available: { fontWeight: 900 },
            }}
            selected={date}
            onSelect={setDate as SelectSingleEventHandler}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <Button
        onClick={nextDay}
        disabled={getDayTimestamp(date) >= getDayTimestamp(new Date())}
        className="p-1"
      >
        <ArrowRight className="w-6 h-6" />
      </Button>
    </div>
  );
}

export default DatePicker;
