import React, { useCallback, useMemo, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  FlatList,
  ActivityIndicator,
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
import { Store, Category } from "../../types/global";
import * as Icons from "@expo/vector-icons";
import { useFetchCategoriesQuery } from "@/redux/services/categories";
import { useDispatch, useSelector } from "react-redux";
import { setCategories } from "@/redux/features/categories";
import { useCreateTransactionMutation } from "@/redux/services/transactions";
import { useUser } from "@clerk/expo";
import Toast from "react-native-toast-message";
import { Skeleton } from "moti/skeleton";

type IconFamily = keyof typeof Icons;

const SKELETON_COLORS = ["#E2E8F0", "#F1F5F9", "#E2E8F0"];

const AddTransactionBottomSheet = ({
  bottomSheetRef,
  onClose,
}: {
  bottomSheetRef: React.RefObject<BottomSheetMethods | null>;
  onClose?: () => void;
}) => {
  const snapPoints = useMemo(() => ["90%"], []);
  const [type, setType] = useState<"expense" | "income">("expense");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState(new Date());
  const [activeCategory, setActiveCategory] = useState("");
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  const { user } = useUser();
  const categories = useSelector((store: Store) => store.categories.categories);
  const { data, isLoading } = useFetchCategoriesQuery(null);
  const dispatch = useDispatch();

  const [createTransaction, { isLoading: isCreating }] =
    useCreateTransactionMutation();

  useEffect(() => {
    if (data?.success) {
      dispatch(setCategories(data.categories));
    }
  }, [data, dispatch]);

  const filteredCategories = useMemo(() => {
    const list = categories.filter(
      (cat) => cat.type?.toLowerCase() === type.toLowerCase(),
    );
    return list.length > 0 ? list : categories;
  }, [categories, type]);

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (selectedDate: Date) => {
    hideDatePicker();
    setDate(selectedDate);
  };

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
      />
    ),
    [],
  );

  const handleAddTransaction = async () => {
    if (!user?.id) {
      Toast.show({
        type: "error",
        text1: "Authentication Required",
        text2: "Please sign in to add a transaction.",
        position: "top",
      });
      return;
    }

    if (!title.trim()) {
      Toast.show({
        type: "error",
        text1: "Description Missing",
        text2: "Please enter a description for the transaction.",
        position: "top",
      });
      return;
    }

    const numericAmount = parseFloat(amount);
    if (!amount.trim() || isNaN(numericAmount) || numericAmount <= 0) {
      Toast.show({
        type: "error",
        text1: "Invalid Amount",
        text2: "Please enter a valid amount greater than 0.",
        position: "top",
      });
      return;
    }

    if (!activeCategory) {
      Toast.show({
        type: "error",
        text1: "Category Missing",
        text2: "Please select a category.",
        position: "top",
      });
      return;
    }

    try {
      await createTransaction({
        userId: user.id,
        body: {
          title: title.trim(),
          amount: numericAmount,
          category_id: activeCategory,
          date: new Date(date).toISOString(),
        },
      }).unwrap();

      Toast.show({
        type: "success",
        text1: "Transaction Created!",
        text2: `${type === "expense" ? "Expense" : "Income"} of $${numericAmount.toFixed(2)} added successfully.`,
        position: "top",
      });

      // Reset form
      setTitle("");
      setAmount("");
      setActiveCategory("");
      setDate(new Date());

      // Close bottom sheet
      bottomSheetRef?.current?.close();
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Failed to Add Transaction",
        text2:
          error?.data?.message ||
          error?.message ||
          "An error occurred while saving the transaction.",
        position: "top",
      });
    }
  };

  const renderCategory = ({ item }: { item: Category }) => {
    const Icon = Icons[item.icon_family as IconFamily];
    const isSelected = activeCategory === item.id;
    return (
      <View className="items-center gap-y-2">
        <Pressable
          className={`w-16 h-16 rounded-full gap-x-2 justify-center items-center ${
            isSelected ? "border-[2px] border-primary/60" : ""
          }`}
          style={{ backgroundColor: item.background }}
          onPress={() => setActiveCategory(item.id)}
        >
          {Icon ? (
            <Icon
              name={item.icon_name}
              color={item.foreground}
              className="!text-3xl"
            />
          ) : (
            <Ionicons name="pricetag" size={28} color={item.foreground} />
          )}
        </Pressable>
        <Text
          className={`text-[12px] ${
            isSelected ? "text-primary font-bold" : "text-slate-600"
          }`}
        >
          {item.name}
        </Text>
      </View>
    );
  };

  const renderSkeleton = () => {
    return (
      <Skeleton
        width={64}
        height={64}
        radius="round"
        colorMode="light"
        colors={SKELETON_COLORS}
      />
    );
  };

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
      index={0}
      onClose={onClose}
    >
      <BottomSheetView style={styles.contentContainer}>
        <View className="flex-row justify-between items-center">
          <Text className="text-xl font-bold text-slate-800">
            Add Transaction
          </Text>
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
            className={`${
              type === "expense" ? "bg-red-500" : "bg-transparent"
            } py-4 flex-1 rounded-xl flex justify-center items-center transition-all duration-300`}
            activeOpacity={0.8}
            onPress={() => {
              setActiveCategory("");
              setType("expense");
            }}
          >
            <Text
              className={`text-xl ${
                type === "expense" ? "text-white" : "text-slate-500"
              } font-medium`}
            >
              Expense
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`${
              type === "income" ? "bg-emerald-500" : "bg-transparent"
            } py-4 flex-1 rounded-xl flex justify-center items-center transition-all duration-300`}
            activeOpacity={0.8}
            onPress={() => {
              setActiveCategory("");
              setType("income");
            }}
          >
            <Text
              className={`text-xl ${
                type === "income" ? "text-white" : "text-slate-500"
              } font-medium`}
            >
              Income
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 18, marginBottom: 10 }}>Categories</Text>
          <FlatList
            data={!isLoading ? filteredCategories : new Array(6).fill(0)}
            keyExtractor={(item: Category, index) =>
              !isLoading ? item.id : String(index)
            }
            renderItem={!isLoading ? renderCategory : renderSkeleton}
            contentContainerStyle={{
              columnGap: 20,
            }}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <View className="gap-y-4 mt-6">
          <View className="gap-y-1">
            <Text className="text-xl">Title</Text>
            <BottomSheetTextInput
              className="w-full bg-slate-200/50 py-4 px-4 rounded-lg text-[18px] text-slate-600"
              placeholder="Enter description"
              returnKeyType="done"
              value={title}
              onChangeText={setTitle}
            />
          </View>

          <View className="gap-y-1">
            <Text className="text-xl">Amount ($)</Text>
            <BottomSheetTextInput
              className="w-full bg-slate-200/50 py-4 px-4 rounded-lg text-[18px] text-slate-600"
              placeholder="0.00"
              keyboardType="decimal-pad"
              returnKeyType="done"
              value={amount}
              onChangeText={setAmount}
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
            onPress={handleAddTransaction}
            disabled={isCreating}
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
                {isCreating ? (
                  <ActivityIndicator color="white" size="small" />
                ) : (
                  <>
                    <Text className="text-white text-2xl text-center font-medium">
                      Add Transaction
                    </Text>
                    <Ionicons
                      name="add"
                      size={24}
                      color="white"
                      className="!text-2xl"
                    />
                  </>
                )}
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

export default AddTransactionBottomSheet;
