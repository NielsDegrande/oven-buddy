import React, { useState } from "react";
import { useOven } from "@/hooks/useOven";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Plus, Minus, DoorOpen, DoorClosed } from "lucide-react";

export default function OvenControlPanel() {
  const {
    temp,
    targetTemp,
    doorOpen,
    hasTurkey,
    timer,
    targetTimer,
    toggleDoor,
    setTargetTemp,
    insertTurkey,
    removeTurkey,
    setTargetTimer,
  } = useOven();

  const [inputTemp, setInputTemp] = useState(targetTemp);
  const [inputTimer, setInputTimer] = useState(targetTimer);

  // Ref to prevent repeated toasts for same targetTemp.
  const wasReadyRef = React.useRef(false);
  const prevTargetTempRef = React.useRef(targetTemp);

  React.useEffect(() => {
    // Reset 'wasReadyRef' if targetTemp was changed.
    if (prevTargetTempRef.current !== targetTemp) {
      wasReadyRef.current = false;
      prevTargetTempRef.current = targetTemp;
    }
    // If ready and not shown before, show the toast and set flag to true.
    if (
      Math.abs(temp - targetTemp) < 1 &&
      !doorOpen &&
      !wasReadyRef.current
    ) {
      toast({
        title: "🔥 Oven ready!",
        description: `Reached ${Math.round(temp) + 1}°C`,
      });
      wasReadyRef.current = true;
    }
  }, [temp, targetTemp, doorOpen]);

  // Show toast when timer reaches 0
  React.useEffect(() => {
    if (timer === 0 && targetTimer > 0) {
      toast({
        title: "⏰ Timer complete!",
        description: "The timer has finished and the oven temperature has been reset",
      });
    }
  }, [timer, targetTimer]);

  return (
    <div className="flex flex-col items-center gap-7 mt-3 w-[270px]">
      {/* Door controls */}
      <Button
        variant={doorOpen ? "secondary" : "default"}
        onClick={toggleDoor}
        size="lg"
        className="flex items-center gap-2 w-full shadow hover-scale text-lg font-semibold py-3"
      >
        {doorOpen ? <DoorClosed size={22} /> : <DoorOpen size={22} />}
        {doorOpen ? "Close Door" : "Open Door"}
      </Button>

      {/* Turkey insert/remove button */}
      <Button
        type="button"
        size="lg"
        variant={doorOpen ? "default" : "secondary"}
        onClick={() => {
          if (doorOpen) {
            if (hasTurkey) {
              removeTurkey();
              toast({
                title: "🍽️ Turkey removed!",
                description: "You removed the turkey from the oven",
              });
            } else {
              insertTurkey();
              toast({
                title: "🦃 Turkey inserted!",
                description: "The turkey is now inside the oven",
              });
            }
          }
        }}
        disabled={!doorOpen}
        className={`flex items-center gap-2 w-full shadow hover-scale text-lg font-semibold py-3 ${!doorOpen ? "opacity-60 cursor-not-allowed" : ""}`}
      >
        {hasTurkey ? "Remove Turkey" : "Insert Turkey"}
      </Button>

      {/* Temp controls */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setTargetTemp(inputTemp);
          toast({
            title: "🌡️ Target temperature changed!",
            description: `Set target to ${inputTemp}°C`,
          });
        }}
        className="flex items-center gap-2 mt-2"
      >
        <span className="mr-2 font-medium text-[#011E41] text-base">Set Temp</span>
        <Button
          type="button"
          size="icon"
          variant="outline"
          onClick={() => setInputTemp((v) => Math.max(25, v - 5))}
          className="hover-scale"
        >
          <Minus size={18} />
        </Button>
        <input
          type="number"
          min={25}
          max={270}
          value={inputTemp}
          onChange={(e) =>
            setInputTemp(Math.max(25, Math.min(270, Number(e.target.value) || 25)))
          }
          className="w-16 border border-gray-300 px-2 py-1 rounded-md text-center font-mono text-lg bg-white/70 shadow transition"
        />
        <Button
          type="button"
          size="icon"
          variant="outline"
          onClick={() => setInputTemp((v) => Math.min(270, v + 5))}
          className="hover-scale"
        >
          <Plus size={18} />
        </Button>
        <Button
          type="submit"
          size="sm"
          className="ml-2 px-7 font-semibold bg-[#011E41] text-white shadow hover:bg-[#011E41]/90 hover-scale"
        >
          Set
        </Button>
      </form>

      {/* Timer controls */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setTargetTimer(inputTimer);
          toast({
            title: "⏰ Timer set",
            description: `Timer set to ${inputTimer} minutes`,
          });
        }}
        className="flex items-center gap-2 mt-2"
      >
        <span className="mr-2 font-medium text-[#011E41] text-base">Timer</span>
        <Button
          type="button"
          size="icon"
          variant="outline"
          onClick={() => setInputTimer((v) => Math.max(0, v - 5))}
          className="hover-scale"
        >
          <Minus size={18} />
        </Button>
        <input
          type="number"
          min={0}
          max={180}
          value={inputTimer}
          onChange={(e) =>
            setInputTimer(Math.max(0, Math.min(180, Number(e.target.value) || 0)))
          }
          className="w-16 border border-gray-300 px-2 py-1 rounded-md text-center font-mono text-lg bg-white/70 shadow transition"
        />
        <Button
          type="button"
          size="icon"
          variant="outline"
          onClick={() => setInputTimer((v) => Math.min(180, v + 5))}
          className="hover-scale"
        >
          <Plus size={18} />
        </Button>
        <Button
          type="submit"
          size="sm"
          className="ml-2 px-7 font-semibold bg-[#011E41] text-white shadow hover:bg-[#011E41]/90 hover-scale"
        >
          Set
        </Button>
      </form>

      {/* Timer display */}
      {timer > 0 && (
        <div className="text-lg font-semibold text-[#011E41]">
          Time remaining: {Math.ceil(timer)} minutes
        </div>
      )}
    </div>
  );
}
