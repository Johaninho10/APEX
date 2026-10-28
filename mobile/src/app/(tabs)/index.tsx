import {
  Text,
  View,
  StyleSheet,
  Button,
  FlatList,
  Modal,
  TouchableOpacity,
} from "react-native";
import { useAuth } from "@clerk/expo";
import * as Icons from "@expo/vector-icons";
import { transactions, Transaction } from "@/assets/assets";
import Header from "@/components/Header";
import Balance from "@/components/Balance";
import TabsSection from "@/components/TabsSection";
import { MotiView } from "moti";
import AddTransactionBottomeSheet from "@/components/AddTransactionBottomSheet";
type IconFamily = keyof typeof Icons;
import { useEffect, useRef, useState } from "react";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import EmptyElement from "@/components/EmptyElement";

const RenderItem = ({
  item,
  deleteTransaction,
}: {
  item: Transaction;
  deleteTransaction: () => void;
}) => {
  const Icon = Icons[item.iconFamily as IconFamily];
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
        type: "timing",
      }}
      className="flex-row items-center justify-between bg-white px-4 py-6 rounded-2xl"
      style={{ boxShadow: "0px 0px 5px rgba(0,0,0,0.1)" }}
    >
      <View className="flex-row gap-x-4 items-center">
        <View
          className="w-14 h-14 rounded-full  gap-x-2 justify-center items-center"
          style={{ backgroundColor: item.backgroundColor }}
        >
          <Icon
            name={item.iconName}
            className="!text-3xl"
            color={item.foregroundColor}
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
            {new Date().toDateString()}
          </Text>
        </View>
      </View>

      <View className="flex-row items-center gap-x-2">
        <Text
          className={`font-medium`}
          style={{
            color: item.amount > 0 ? "#10b981" : "#ef4444",
          }}
        >
          $ {item.amount}
        </Text>

        <TouchableOpacity
          className="w-12 h-12 rounded-full justify-center items-center bg-red-200 overflow-hidden"
          style={{ backgroundColor: "#fecaca" }}
          onPress={() => deleteTransaction()}
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

export default function Index() {
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const bottomSheetRef = useRef<BottomSheetMethods>(null);
  const [data, setData] = useState<Transaction[]>([]);
  const { getToken, isLoaded } = useAuth();

  const generateToken = async () => {
    const token = await getToken();
    console.log(token);
  };

  generateToken();

  useEffect(() => {
    generateToken();
  }, []);

  useEffect(() => {
    setData(transactions);
  }, []);

  return (
    <View className="flex-1">
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
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
        renderItem={({ item }) => (
          <RenderItem
            item={item}
            deleteTransaction={() =>
              setData((prev) =>
                prev.filter((transaction) => transaction.id !== item.id),
              )
            }
          />
        )}
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
      {showBottomSheet && (
        <AddTransactionBottomeSheet bottomSheetRef={bottomSheetRef} />
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
