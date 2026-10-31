import { useState } from "react";
import { BarChart } from "react-native-chart-kit/v2";
import { Dimensions } from "react-native";

const MyBarChart = ({
  data,
  width,
}: {
  data: {
    day: string;
    organic: number;
    paid: number;
  }[];
  width?: number;
}) => {
  const [selectedChannel, setSelectedChannel] = useState("");
  const screenWidth = Dimensions.get("window").width;
  const chartWidth = width ?? Math.max(screenWidth - 80, 300);

  return (
    <BarChart
      data={data}
      scrollable
      visiblePoints={7}
      xKey="day"
      series={[
        { yKey: "organic", label: "Income", color: "#10b981" },
        { yKey: "paid", label: "Expense", color: "#ef4444" },
      ]}
      interaction={{
        mode: "tap",
        deselectOnOutsidePress: true,
        onSelect: (event) => {
          setSelectedChannel(event.seriesLabel);
        },
      }}
      tooltip={{
        anchor: "pointer",
        placement: "above",
        width: 132,
      }}
      width={chartWidth}
      height={240}
    />
  );
};

export default MyBarChart;
