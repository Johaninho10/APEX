import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useUser } from "@clerk/expo";
import * as Icons from "@expo/vector-icons";

import Header from "@/components/Header";
import Balance from "@/components/Balance";
import TabsSection from "@/components/TabsSection";
import { MotiView } from "moti";
import AddTransactionBottomeSheet from "@/components/AddTransactionBottomSheet";
type IconFamily = keyof typeof Icons;
import { useEffect, useRef, useState } from "react";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import EmptyElement from "@/components/EmptyElement";
import { useSelector, useDispatch } from "react-redux";
import type { Store, Transaction } from "../../../types/global";
import { setTransactions } from "@/redux/features/transactions";
import {
  useFetchTransactionsQuery,
  useDeleteTransactionMutation,
} from "@/redux/services/transactions";
import { Skeleton } from "moti/skeleton";

const SKELETON_COLORS = ["#E2E8F0", "#F1F5F9", "#E2E8F0"];

export default function Index() {
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const bottomSheetRef = useRef<BottomSheetMethods>(null);
  const transactions = useSelector(
    (store: Store) => store.transactions.transactions,
  );

  const { user, isLoaded } = useUser();
  const dispatch = useDispatch();

  const { data, isLoading, isFetching, refetch } = useFetchTransactionsQuery(
    user?.id ?? "",
    {
      skip: !user?.id,
    },
  );

  const [deleteTransactionMutation] = useDeleteTransactionMutation();

  const isTransactionsLoading =
    !isLoaded || isLoading || (!data && transactions.length === 0);

  useEffect(() => {
    if (data?.success) {
      dispatch(setTransactions(data.transactions));
    }
  }, [data, dispatch]);

  const handleDeleteTransaction = async (id: string) => {
    dispatch(
      setTransactions(
        transactions.filter((transaction) => transaction.id !== id),
      ),
    );
    if (user?.id) {
      try {
        await deleteTransactionMutation({
          userId: user.id,
          transactionId: id,
        }).unwrap();
      } catch (error) {
        console.error("Failed to delete transaction:", error);
      }
    }
  };

  const renderSkeleton = () => {
    return (
      <View
        className="flex-row items-center justify-between bg-white px-4 py-6 rounded-2xl"
        style={{ boxShadow: "0px 0px 5px rgba(0,0,0,0.1)" }}
      >
        <View className="flex-row gap-x-4 items-center">
          <Skeleton
            colorMode="light"
            colors={SKELETON_COLORS}
            width={56}
            height={56}
            radius="round"
          />
          <View className="gap-y-2">
            <Skeleton
              colorMode="light"
              colors={SKELETON_COLORS}
              width={130}
              height={18}
              radius={6}
            />
            <Skeleton
              colorMode="light"
              colors={SKELETON_COLORS}
              width={85}
              height={14}
              radius={4}
            />
          </View>
        </View>

        <View className="flex-row items-center gap-x-2">
          <Skeleton
            colorMode="light"
            colors={SKELETON_COLORS}
            width={65}
            height={20}
            radius={6}
          />

          <Skeleton
            colorMode="light"
            colors={SKELETON_COLORS}
            width={48}
            height={48}
            radius="round"
          />
        </View>
      </View>
    );
  };

  const RenderItem = ({ item }: { item: Transaction }) => {
    const Icon = Icons[item.category.icon_family as IconFamily];
    return (
      <MotiView
        from={{
          translateY: 60,
          opacity: 0,
        }}
        animate={{
          translateY: 0,
          opacity: 1,
        }}
        transition={{
          duration: 1000,
        }}
        className="flex-row items-center justify-between bg-white px-4 py-6 rounded-2xl"
        style={{ boxShadow: "0px 0px 5px rgba(0,0,0,0.1)" }}
      >
        <View className="flex-row gap-x-4 items-center">
          <View
            className="w-14 h-14 rounded-full  gap-x-2 justify-center items-center"
            style={{ backgroundColor: item.category.background }}
          >
            <Icon
              name={item.category.icon_name}
              className="!text-3xl"
              color={item.category.foreground}
            />
          </View>
          <View className="justify-between">
            <Text>{item.title}</Text>
            <Text
              className="text-slate-600 text-[14px]"
              style={{
                fontSize: 14,
              }}
            >
              {new Date(item.date).toDateString()}
            </Text>
          </View>
        </View>

        <View className="flex-row items-center gap-x-2">
          <Text
            className={`font-medium`}
            style={{
              color: item.category.type === "INCOME" ? "#10b981" : "#ef4444",
            }}
          >
            {item.category.type === "EXPENSE" && "-"}${item.amount}
          </Text>

          <TouchableOpacity
            className="w-12 h-12 rounded-full justify-center items-center bg-red-200 overflow-hidden"
            style={{ backgroundColor: "#fecaca" }}
            onPress={() => handleDeleteTransaction(item.id)}
          >
            <Icons.Ionicons
              name="trash-outline"
              className="!text-red-500 !text-2xl"
            />
          </TouchableOpacity>
        </View>
      </MotiView>
    );
  };

  return (
    <View className="flex-1">
      <Skeleton.Group show={isTransactionsLoading}>
        <FlatList
          data={isTransactionsLoading ? new Array(6).fill(0) : transactions}
          keyExtractor={(item, index) =>
            isTransactionsLoading
              ? `skeleton-${index}`
              : (item?.id ?? String(index))
          }
          ListEmptyComponent={EmptyElement}
          ListHeaderComponent={() => (
            <>
              <Header />
              <Balance />
              <TabsSection
                bottomSheetRef={bottomSheetRef}
                showBottomSheet={() => setShowBottomSheet(true)}
              />
            </>
          )}
          renderItem={isTransactionsLoading ? renderSkeleton : RenderItem}
          refreshing={isFetching && !isTransactionsLoading}
          onRefresh={refetch}
          style={{
            backgroundColor: "#faf8ff",
            paddingInline: 24,
          }}
          contentContainerStyle={{
            rowGap: 15,
            backgroundColor: "#faf8ff",
            paddingBottom: 100,
          }}
        />
      </Skeleton.Group>
      {showBottomSheet && (
        <AddTransactionBottomeSheet
          bottomSheetRef={bottomSheetRef}
          onClose={() => setShowBottomSheet(false)}
        />
      )}
    </View>
  );
}

{
  /*  */
}

//
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
