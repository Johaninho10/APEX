import { View, Text } from "react-native";
import React from "react";
import { DonutChart } from "react-native-chart-kit/v2";

const MyDonutChart = () => {
  const revenueMix = [
    { plan: "Enterprise", revenue: 680 },
    { plan: "Business", revenue: 420 },
    { plan: "Teams", revenue: 260 },
    { plan: "Starter", revenue: 140 },
  ];
  return (
    <DonutChart
      centerLabel="$1.5M"
      data={revenueMix}
      valueKey="revenue"
      labelKey="plan"
      width={410}
      height={260}
    />
  );
};

export default MyDonutChart;
