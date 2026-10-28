import { useState } from "react";
import { BarChart } from "react-native-chart-kit/v2";

const MyBarChart = ({
  data,
}: {
  data: {
    day: string;
    organic: number;
    paid: number;
  }[];
}) => {
  const [selectedChannel, setSelectedChannel] = useState("");

  return (
    <BarChart
      data={data}
      scrollable
      visiblePoints={7}
      xKey="day"
      series={[
        { yKey: "organic", label: "Organic", color: "#34d399" },
        { yKey: "paid", label: "Paid", color: "#f87171" },
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
      width={400}
      height={260}
    />
  );
};

export default MyBarChart;
