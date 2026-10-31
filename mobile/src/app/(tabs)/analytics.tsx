import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import SafeScreen from "@/components/SafeScreen";
import MyBarChart from "@/components/MyBarChart";
import MyDonutChart from "@/components/MyDonutChart";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { MotiView } from "moti";

const weeklyData = [
  { day: "Mon", organic: 28, paid: 62 },
  { day: "Tue", organic: 74, paid: 34 },
  { day: "Wed", organic: 39, paid: 88 },
  { day: "Thu", organic: 96, paid: 41 },
  { day: "Fri", organic: 54, paid: 103 },
  { day: "Sat", organic: 118, paid: 58 },
  { day: "Sun", organic: 108, paid: 58 },
];

const categoryBreakdown = [
  { name: "Housing", amount: 680, percentage: "45%", color: "#3525cd", icon: "home" },
  { name: "Food & Groceries", amount: 420, percentage: "28%", color: "#712ae2", icon: "fast-food" },
  { name: "Transport", amount: 260, percentage: "17%", color: "#38bdf8", icon: "car" },
  { name: "Entertainment", amount: 140, percentage: "10%", color: "#f59e0b", icon: "film" },
];

const Analytics = () => {
  const [timeframe, setTimeframe] = useState<"week" | "month" | "year">("week");

  return (
    <SafeScreen>
      <ScrollView
        className="flex-1 bg-background px-6"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 120,
          rowGap: 20,
        }}
      >
        {/* Top Header */}
        <View className="flex-row justify-between items-center pt-2">
          <View className="flex-row gap-x-3 items-center">
            <Image
              source={require("@/assets/images/screen.png")}
              className="w-12 h-12"
              resizeMode="contain"
            />
            <View>
              <Text className="text-2xl font-bold text-primary">Apex</Text>
              <Text className="text-xs text-slate-500 font-medium">Financial Analytics</Text>
            </View>
          </View>

          <View className="flex-row items-center gap-x-2 bg-white px-3 py-1.5 rounded-full border border-slate-200/60 shadow-sm">
            <Feather name="calendar" size={14} color="#3525cd" />
            <Text className="text-xs font-semibold text-slate-700">Oct 24 - 31</Text>
          </View>
        </View>

        {/* Screen Title */}
        <View>
          <Text className="text-3xl font-bold text-slate-800 tracking-tight">
            Financial Reports
          </Text>
          <Text className="text-slate-500 text-sm mt-1">
            Analyze your cash flow and spending distribution
          </Text>
        </View>

        {/* Timeframe Filter Tabs */}
        <View className="flex-row items-center gap-x-3">
          {(
            [
              { key: "week", label: "Weekly" },
              { key: "month", label: "Monthly" },
              { key: "year", label: "Yearly" },
            ] as const
          ).map((tab) => {
            const isActive = timeframe === tab.key;
            return (
              <TouchableOpacity
                key={tab.key}
                onPress={() => setTimeframe(tab.key)}
                activeOpacity={0.8}
                className={`py-2 px-5 rounded-full ${
                  isActive ? "bg-primary" : "bg-white border border-slate-200/60"
                }`}
                style={{
                  boxShadow: isActive
                    ? "0px 2px 8px rgba(53, 37, 205, 0.3)"
                    : "0px 1px 3px rgba(0,0,0,0.05)",
                  elevation: isActive ? 3 : 1,
                }}
              >
                <Text
                  className={`text-sm font-semibold ${
                    isActive ? "text-white" : "text-slate-600"
                  }`}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Hero Card: Total Spent Overview */}
        <MotiView
          from={{ opacity: 0, translateY: 15 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 500, type: "timing" } as any}
          className="bg-white rounded-3xl p-6 border border-slate-100"
          style={{
            boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.05)",
            elevation: 2,
          }}
        >
          <View className="flex-row justify-between items-center">
            <Text className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Total Spent {timeframe === "week" ? "This Week" : timeframe === "month" ? "This Month" : "This Year"}
            </Text>
            <View className="flex-row items-center gap-x-1 bg-emerald-50 border border-emerald-200/60 px-2.5 py-1 rounded-full">
              <Ionicons name="trending-down" size={14} color="#059669" />
              <Text className="text-xs font-bold text-emerald-700">-4.8% vs last period</Text>
            </View>
          </View>

          <View className="flex-row items-baseline mt-3">
            <Text className="text-4xl font-extrabold text-slate-900">$ 7,000</Text>
            <Text className="text-slate-400 text-xl font-medium ml-1">.00</Text>
          </View>

          <View className="mt-5 pt-4 border-t border-slate-100 flex-row justify-between items-center">
            <View className="flex-row items-center gap-x-2.5">
              <View className="w-8 h-8 rounded-full bg-primary/10 items-center justify-center">
                <Ionicons name="calendar-outline" size={16} color="#3525cd" />
              </View>
              <View>
                <Text className="text-[11px] text-slate-400 font-medium">Daily Average</Text>
                <Text className="text-sm font-semibold text-slate-700">$ 1,000 / day</Text>
              </View>
            </View>

            <View className="flex-row items-center gap-x-2.5">
              <View className="w-8 h-8 rounded-full bg-emerald-500/10 items-center justify-center">
                <Ionicons name="shield-checkmark-outline" size={16} color="#10b981" />
              </View>
              <View>
                <Text className="text-[11px] text-slate-400 font-medium">Budget Status</Text>
                <Text className="text-sm font-semibold text-emerald-600">Within Budget</Text>
              </View>
            </View>
          </View>
        </MotiView>

        {/* Bar Chart Card: Cash Flow Activity */}
        <MotiView
          from={{ opacity: 0, translateY: 15 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 600, delay: 100, type: "timing" } as any}
          className="bg-white rounded-3xl p-5 border border-slate-100"
          style={{
            boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.05)",
            elevation: 2,
          }}
        >
          <View className="flex-row justify-between items-center mb-4">
            <View>
              <Text className="text-xl font-bold text-slate-800">Cash Flow Activity</Text>
              <Text className="text-xs text-slate-400 font-medium mt-0.5">Daily income vs expenses</Text>
            </View>

            {/* Legend */}
            <View className="flex-row items-center gap-x-3">
              <View className="flex-row items-center gap-x-1.5">
                <View className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <Text className="text-xs font-medium text-slate-600">Income</Text>
              </View>
              <View className="flex-row items-center gap-x-1.5">
                <View className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <Text className="text-xs font-medium text-slate-600">Expense</Text>
              </View>
            </View>
          </View>

          <View className="items-center py-2">
            <MyBarChart data={weeklyData} />
          </View>
        </MotiView>

        {/* Donut Chart Card: Expenses Breakdown */}
        <MotiView
          from={{ opacity: 0, translateY: 15 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 600, delay: 200, type: "timing" } as any}
          className="bg-white rounded-3xl p-5 border border-slate-100"
          style={{
            boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.05)",
            elevation: 2,
          }}
        >
          <View className="mb-2">
            <Text className="text-xl font-bold text-slate-800">Expenses Breakdown</Text>
            <Text className="text-xs text-slate-400 font-medium mt-0.5">Spending distribution by category</Text>
          </View>

          <View className="items-center py-1">
            <MyDonutChart />
          </View>

          {/* Category Legend & Proportions */}
          <View className="mt-4 gap-y-3 pt-3 border-t border-slate-100">
            {categoryBreakdown.map((item) => (
              <View key={item.name} className="flex-row justify-between items-center">
                <View className="flex-row items-center gap-x-3">
                  <View
                    className="w-8 h-8 rounded-full items-center justify-center"
                    style={{ backgroundColor: `${item.color}15` }}
                  >
                    <Ionicons name={item.icon as any} size={16} color={item.color} />
                  </View>
                  <Text className="text-sm font-semibold text-slate-700">{item.name}</Text>
                </View>

                <View className="flex-row items-center gap-x-3">
                  <Text className="text-sm font-bold text-slate-900">$ {item.amount}</Text>
                  <View
                    className="px-2 py-0.5 rounded-md"
                    style={{ backgroundColor: `${item.color}15` }}
                  >
                    <Text
                      className="text-xs font-bold"
                      style={{ color: item.color }}
                    >
                      {item.percentage}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </MotiView>

        {/* Quick Stats Banner (Gradient) */}
        <MotiView
          from={{ opacity: 0, translateY: 15 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 600, delay: 300, type: "timing" } as any}
        >
          <LinearGradient
            colors={["#3525cd", "#712ae2"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              padding: 24,
              borderRadius: 24,
              boxShadow: "0px 8px 24px rgba(53, 37, 205, 0.25)",
              elevation: 4,
            }}
          >
            <View className="flex-row items-center gap-x-3 mb-5">
              <View className="w-10 h-10 rounded-full bg-white/20 items-center justify-center">
                <MaterialCommunityIcons name="lightning-bolt" size={22} color="white" />
              </View>
              <View>
                <Text className="text-white text-xl font-bold">Quick Insights</Text>
                <Text className="text-white/70 text-xs font-medium">Summary of all transactions</Text>
              </View>
            </View>

            <View className="gap-y-3">
              <View className="flex-row justify-between items-center bg-white/10 px-4 py-3.5 rounded-2xl border border-white/10">
                <View className="flex-row items-center gap-x-3">
                  <Ionicons name="receipt-outline" size={20} color="white" />
                  <Text className="text-white/90 text-sm font-medium">Total Transactions</Text>
                </View>
                <Text className="text-white font-bold text-base">12</Text>
              </View>

              <View className="flex-row justify-between items-center bg-white/10 px-4 py-3.5 rounded-2xl border border-white/10">
                <View className="flex-row items-center gap-x-3">
                  <Ionicons name="arrow-up-circle-outline" size={20} color="#fca5a5" />
                  <Text className="text-white/90 text-sm font-medium">Highest Expense</Text>
                </View>
                <Text className="text-white font-bold text-base">$ 1,450.00</Text>
              </View>

              <View className="flex-row justify-between items-center bg-white/10 px-4 py-3.5 rounded-2xl border border-white/10">
                <View className="flex-row items-center gap-x-3">
                  <Ionicons name="calculator-outline" size={20} color="white" />
                  <Text className="text-white/90 text-sm font-medium">Average Transaction</Text>
                </View>
                <Text className="text-white font-bold text-base">$ 583.33</Text>
              </View>
            </View>
          </LinearGradient>
        </MotiView>
      </ScrollView>
    </SafeScreen>
  );
};

export default Analytics;
