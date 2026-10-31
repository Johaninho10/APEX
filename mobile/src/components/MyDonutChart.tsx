import { View, Text, Dimensions } from "react-native";
import React from "react";
import { DonutChart } from "react-native-chart-kit/v2";

const MyDonutChart = ({ width }: { width?: number }) => {
  const screenWidth = Dimensions.get("window").width;
  const chartWidth = width ?? Math.max(screenWidth - 80, 300);

  const revenueMix = [
    { plan: "Housing", revenue: 680 },
    { plan: "Food & Groceries", revenue: 420 },
    { plan: "Transport", revenue: 260 },
    { plan: "Entertainment", revenue: 140 },
  ];
  return (
    <DonutChart
      centerLabel="$1.5K"
      data={revenueMix}
      valueKey="revenue"
      labelKey="plan"
      width={chartWidth}
      height={240}
    />
  );
};

export default MyDonutChart;
