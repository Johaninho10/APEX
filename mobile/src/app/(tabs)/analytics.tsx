import MyBarChart from "@/components/MyBarChart";
import MyDonutChart from "@/components/MyDonutChart";
import SafeScreen from "@/components/SafeScreen";
import { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import {
  BarChart,
  createChartPreset,
  ChartKitProvider,
} from "react-native-chart-kit/v2";
import { LinearGradient } from "expo-linear-gradient";

const data = [
  { day: "Mon", organic: 28, paid: 62 },
  { day: "Tue", organic: 74, paid: 34 },
  { day: "Wed", organic: 39, paid: 88 },
  { day: "Thu", organic: 96, paid: 41 },
  { day: "Fri", organic: 54, paid: 103 },
  { day: "Sat", organic: 118, paid: 58 },
  { day: "Sun", organic: 108, paid: 58 },
];

const analytics = () => {


  return (
    <SafeScreen>
      <ScrollView
        className="flex-1 bg-background px-6"
        showsVerticalScrollIndicator
        contentContainerStyle={{
            paddingBottom: 100
        }}
      >
        <View className="flex-row gap-x-5 items-center">
          <Image
            source={require("@/assets/images/screen.png")}
            className="w-[60px]"
            resizeMode="contain"
          />
          <Text className="text-3xl font-medium text-primary">Apex</Text>
        </View>
        <Text className="mb-6 text-3xl font-medium text-primary">
          Your Financial Reports
        </Text>

        <Text className="text-slate-600 mt-2 text-xl">
          Total spent this week:
        </Text>
        <Text className="text-slate-700 font-bold text-3xl mt-2">$ 7000</Text>

        <View className="items-center mt-4">
          <MyBarChart data={data} />
        </View>

        <Text className="mt-4 text-2xl font-medium text-slate-700">
          Expenses Breakdown
        </Text>

        <View className="items-center mt-4">
          <MyDonutChart />
        </View>

        <LinearGradient
          colors={["#3525cd", "#712ae2"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            paddingBlock: 20,
            paddingInline: 20,
            borderRadius: 15,
            marginTop: 20,
          }}
        >
          <Text className="text-white text-2xl font-bold">Quick Stats</Text>
          <View className="gap-y-2 mt-5">
            <View className="flex-row justify-between">
              <Text className="text-white text-xl">Total Transactions</Text>
              <Text className="text-white text-xl">12</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-white text-xl">Highest Expense</Text>
              <Text className="text-white text-xl">12</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-white text-xl">Average Transaction</Text>
              <Text className="text-white text-xl">12</Text>
            </View>
          </View>
        </LinearGradient>
      </ScrollView>
    </SafeScreen>
  );
};

export default analytics;
