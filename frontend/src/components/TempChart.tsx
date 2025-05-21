
import React from "react";
import { LineChart, Line, XAxis, YAxis } from "recharts";
import { useOven } from "./OvenContext";

// Format: show changes in temp over time with extra bottom margin
export default function TempChart() {
  const { history } = useOven();
  // Last 40 points for clarity
  const data = React.useMemo(
    () => history.slice(-40).map((p, i, arr) => ({
      idx: i,
      temp: p.temp,
    })),
    [history]
  );
  return (
    <div className="w-full flex flex-col items-center mb-2">
      <LineChart
        width={230}
        height={80}
        data={data}
        margin={{ top: 8, right: 8, left: 8, bottom: 4 }}
      >
        <XAxis dataKey="idx" hide />
        <YAxis domain={["auto", "auto"]} hide />
        <Line
          type="monotone"
          dataKey="temp"
          stroke="#F59E42"
          strokeWidth={3}
          dot={false}
          isAnimationActive={true}
        />
      </LineChart>
      <div className="text-xs text-gray-400 mt-1">Live Temp Curve</div>
    </div>
  );
}
