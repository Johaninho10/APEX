import { View, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";

const TabsSection = ({
  bottomSheetRef,
  showBottomSheet,
  type,
  changeType,
  changePage,
}: {
  bottomSheetRef: React.RefObject<BottomSheetMethods | null>;
  showBottomSheet: () => void;
  type: string;
  changeType: (type: "EXPENSE" | "INCOME" | "") => void;
  changePage: (num: number) => void;
}) => {
  return (
    <View className="mb-5">
      <View className="mt-5 flex-row justify-between items-center">
        <Text className="text-xl text-slate-600 font-medium">
          Recent Transactions
        </Text>

        <TouchableOpacity
          className="w-14 h-14 rounded-full overflow-hidden"
          activeOpacity={0.8}
          onPress={() => {
            showBottomSheet();
            bottomSheetRef?.current?.expand();
          }}
        >
          <LinearGradient
            colors={["#3525cd", "#712ae2"]}
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <AntDesign name="plus-circle" className="!text-2xl !text-white" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <View className="flex-row items-center gap-x-4">
        <TouchableOpacity
          className={`${type === "" ? "bg-primary" : "bg-white"} py-2 px-6 rounded-full`}
          onPress={() => changeType("")}
          style={{ boxShadow: "0px 0px 5px rgba(0,0,0,0.1)", elevation: 1 }}
        >
          <Text className={`${type === "" ? "text-white" : "text-slate-700"}`}>
            All
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className={`${type === "INCOME" ? "bg-primary" : "bg-white"} py-2 px-6 rounded-full`}
          onPress={() => {
            changePage(1);
            changeType("INCOME");
          }}
          style={{ boxShadow: "0px 0px 5px rgba(0,0,0,0.1)", elevation: 1 }}
        >
          <Text
            className={`${type === "INCOME" ? "text-white" : "text-slate-700"}`}
          >
            Incomes
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className={`${type === "EXPENSE" ? "bg-primary" : "bg-white"} py-2 px-6 rounded-full`}
          onPress={() => {
            changePage(1)
            changeType("EXPENSE");
          }}
          style={{ boxShadow: "0px 0px 5px rgba(0,0,0,0.1)", elevation: 1 }}
        >
          <Text
            className={`${type === "EXPENSE" ? "text-white" : "text-slate-700"}`}
          >
            Expenses
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TabsSection;
