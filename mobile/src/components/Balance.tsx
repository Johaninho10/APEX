import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { MotiView } from "moti";
import { useGetSummaryQuery } from "@/redux/services/transactions";
import { useUser } from "@clerk/expo";
import { Skeleton } from "moti/skeleton";

const Balance = () => {
  const { user } = useUser();

  if (!user) {
    return null;
  }

  const { data, isLoading } = useGetSummaryQuery(user.id);

  const SKELETON_COLORS = ["#E2E8F0", "#F1F5F9", "#E2E8F0"];

  return (
    <MotiView
      from={{
        translateX: -40,
        opacity: 0,
      }}
      animate={{
        translateX: 0,
        opacity: 1,
      }}
      transition={{ duration: 1000, type: "timing" } as any}
    >
      <LinearGradient
        colors={["#3525cd", "#712ae2"]}
        style={{
          paddingBlock: 30,
          paddingInline: 20,
          borderRadius: 25,
        }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Text className="text-3xl text-white">Total Balance</Text>
        {isLoading ? (
          <View className="mt-2">
            <Skeleton
              radius={"round"}
              width={200}
              height={20}
              colorMode="light"
              colors={SKELETON_COLORS}
            />
          </View>
        ) : (
          <Text
            className="text-white text-4xl font-medium mt-2"
            style={{
              marginTop: "8px",
            }}
          >
            ${data?.balance}
          </Text>
        )}
        <View className="py-3 w-full bg-[rgba(255,255,255,0.1)] rounded-full mt-3 px-5 flex-row justify-between items-center">
          <View className="flex-row gap-x-4 items-center">
            <View className=" w-11 h-11 rounded-full bg-[rgba(255,255,255,0.2)] flex justify-center items-center">
              <Ionicons
                name="arrow-down"
                className="!text-emerald-500 !text-2xl"
              />
            </View>
            <View className="justify-between">
              <Text className="text-slate-300">INCOMES</Text>
              {isLoading ? (
                <View className="mt-1">
                  <Skeleton
                    colors={SKELETON_COLORS}
                    colorMode="light"
                    width={100}
                    height={10}
                    radius={"round"}
                  />
                </View>
              ) : (
                <Text className="text-white text-xl font-medium">
                  ${data?.incomes}
                </Text>
              )}
            </View>
          </View>
          <View className="flex-row gap-x-4 items-center">
            <View className=" w-11 h-11 rounded-full bg-[rgba(255,255,255,0.2)] flex justify-center items-center">
              <Ionicons name="arrow-up" className="!text-red-500 !text-2xl" />
            </View>
            <View className="justify-between">
              <Text className="text-slate-300">EXPENSES</Text>
              {isLoading ? (
                <View className="mt-1">
                  <Skeleton
                    colors={SKELETON_COLORS}
                    colorMode="light"
                    width={100}
                    height={10}
                    radius={"round"}
                  />
                </View>
              ) : (
                <Text className="text-white text-xl font-medium">
                  ${data?.expenses}
                </Text>
              )}
            </View>
          </View>
        </View>
      </LinearGradient>
    </MotiView>
  );
};

export default Balance;
