import { View, Text, TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import BottomSheet from '@gorhom/bottom-sheet';

const TabsSection = ({bottomSheetRef, showBottomSheet}: {bottomSheetRef: React.RefObject<BottomSheetMethods | null>, showBottomSheet: () => void}) => {
      const [active, setActive] = useState<"all" | "expenses" | "incomes">(
        "all",
      );

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
            showBottomSheet()
            bottomSheetRef?.current?.snapToIndex(1)}
          }
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
          className={`${active === "all" ? "bg-primary" : "bg-white"} py-2 px-6 rounded-full`}
          onPress={() => setActive("all")}
          style={{ boxShadow: "0px 0px 5px rgba(0,0,0,0.1)", elevation: 1 }}
        >
          <Text
            className={`${active === "all" ? "text-white" : "text-slate-700"}`}
          >
            All
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className={`${active === "incomes" ? "bg-primary" : "bg-white"} py-2 px-6 rounded-full`}
          onPress={() => setActive("incomes")}
          style={{ boxShadow: "0px 0px 5px rgba(0,0,0,0.1)", elevation: 1 }}
        >
          <Text
            className={`${active === "incomes" ? "text-white" : "text-slate-700"}`}
          >
            Incomes
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className={`${active === "expenses" ? "bg-primary" : "bg-white"} py-2 px-6 rounded-full`}
          onPress={() => setActive("expenses")}
          style={{ boxShadow: "0px 0px 5px rgba(0,0,0,0.1)", elevation: 1 }}
        >
          <Text
            className={`${active === "expenses" ? "text-white" : "text-slate-700"}`}
          >
            Expenses
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default TabsSection