import React, { useCallback, useMemo, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { Ionicons } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { LinearGradient } from "expo-linear-gradient";
import { categories, Category } from "@/assets/assets";
import { FlatList } from "react-native-gesture-handler";
import * as Icons from "@expo/vector-icons";

type IconFamily = keyof typeof Icons;

const AddTransactionBottomeSheet = ({
  bottomSheetRef,
}: {
  bottomSheetRef: React.RefObject<BottomSheetMethods | null>;
}) => {
  const snapPoints = useMemo(() => ["90%"], []);
  const [type, setType] = useState<"expense" | "income">("expense");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState(new Date().toISOString());
  const [activeCategory, setActiveCategory] = useState("");
  const [data, setData] = useState<Category[]>([]);

  useEffect(() => {
    setData(categories.filter((item) => item.type === type));
  }, [type]);

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: any) => {
    hideDatePicker();
    setDate(date);
  };

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        appearsOnIndex={1}
        disappearsOnIndex={-1}
        {...props}
      />
    ),
    [],
  );

  const renderCategory = ({ item }: { item: Category }) => {
    const Icon = Icons[item.iconFamily as IconFamily];
    return (
      <View className="items-center gap-y-2">
        <Pressable
          className={`w-16 h-16 rounded-full  gap-x-2 justify-center items-center ${activeCategory === item.id && "border-2 border-primary/60"}`}
          style={{ backgroundColor: item.backgroundColor }}
          onPress={() => setActiveCategory(item.id)}
        >
          <Icon
            name={item.iconName}
            color={item.foregroundColor}
            className="!text-3xl"
          />
        </Pressable>
        <Text className="text-[12px] text-slate-600">{item.name}</Text>
      </View>
    );
  };

  // renders
  return (
    <BottomSheet
      handleStyle={{
        borderRadius: 150,
        flex: 1,
      }}
      ref={bottomSheetRef}
      enablePanDownToClose
      backdropComponent={renderBackdrop}
      keyboardBehavior="fillParent"
      enableDynamicSizing
      backgroundStyle={{
        borderRadius: 40,
      }}
      snapPoints={snapPoints}
      index={1}
    >
      <BottomSheetView style={styles.contentContainer}>
        <View className="flex-row justify-between items-center">
          <Text className="text-xl">Add Transaction</Text>
          <TouchableOpacity
            className="bg-slate-200/50 w-12 h-12 rounded-full flex justify-center items-center"
            activeOpacity={0.2}
            onPress={() => bottomSheetRef?.current?.close()}
          >
            <Ionicons name="close" size={24} />
          </TouchableOpacity>
        </View>

        <View className="mt-6 bg-slate-200/50 py-2 px-2 rounded-2xl flex-row gap-x-1">
          <TouchableOpacity
            className={`${type === "expense" ? "bg-red-500" : "bg-transparent"} py-4 flex-1 rounded-xl flex justify-center items-center transition-all duration-300`}
            activeOpacity={0.8}
            onPress={() => {
              setActiveCategory("");
              setType("expense");
            }}
          >
            <Text
              className={`text-xl ${type === "expense" ? "text-white" : "text-slate-500"}  font-medium`}
            >
              Expense
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`${type === "income" ? "bg-emerald-500" : "bg-transparent"} py-4 flex-1 rounded-xl flex justify-center items-center transition-all duration-300`}
            activeOpacity={0.8}
            onPress={() => {
              setActiveCategory("")
              setType("income")}}
          >
            <Text
              className={`text-xl ${type === "income" ? "text-white" : "text-slate-500"}  font-medium`}
            >
              Income
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 18, marginBottom: 10 }}>Categories</Text>
          <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={renderCategory}
            contentContainerStyle={{
              columnGap: 20,
            }}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View className="gap-y-4 mt-6">
          <View className="gap-y-1">
            <Text className="text-xl">Description</Text>
            <BottomSheetTextInput
              className="w-full bg-slate-200/50 py-4 px-4 rounded-lg text-[18px] text-slate-600"
              placeholder="Enter description"
              returnKeyType="done"
            />
          </View>

          <View className="gap-y-1">
            <Text className="text-xl">Amount ($)</Text>
            <BottomSheetTextInput
              className="w-full bg-slate-200/50 py-4 px-4 rounded-lg text-[18px] text-slate-600"
              placeholder="0.00"
              keyboardType="numeric"
              returnKeyType="done"
            />
          </View>

          <View className="gap-y-1">
            <Text className="text-xl">Date</Text>
            <Pressable
              className="w-full bg-slate-200/50 py-4 px-4 rounded-lg text-[18px] flex-row justify-between items-center"
              onPress={() => setDatePickerVisibility(true)}
            >
              <Text className="text-slate-600">
                {new Date(date).toDateString()}
              </Text>
              <Ionicons name="calendar" size={24} color="black" />
            </Pressable>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
              date={new Date(date)}
            />
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            className="shadow-md shadow-primary"
            style={{
              elevation: 10,
            }}
          >
            <LinearGradient
              colors={["#3525cd", "#712ae2"]}
              style={{
                borderRadius: 10,
                marginTop: 10,
                paddingBlock: 6,
                paddingInline: 15,
              }}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View className="py-3 flex-row justify-center items-center gap-x-4">
                <Text className="text-white text-2xl text-center font-medium">
                  Add Transaction
                </Text>
                <Ionicons
                  name="add"
                  size={24}
                  color="white"
                  className="!ext-2xl"
                />
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    padding: 30,
  },
});

export default AddTransactionBottomeSheet;
