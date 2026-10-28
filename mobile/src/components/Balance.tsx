import { View, Text } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'
import { MotiView } from 'moti'
const Balance = () => {
  return (
    <MotiView
    from={{
      translateX: -20,
      opacity: 0
    }}
    animate={{
      translateX: 0,
      opacity: 1
    }}
    transition={{duration: 1000, type: "timing"}}>
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
                <Text className="text-white text-4xl font-medium mt-2">$5000</Text>
      
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
                      <Text className="text-white text-xl font-medium">$12000</Text>
                    </View>
                  </View>
      
                  <View className="flex-row gap-x-4 items-center">
                    <View className=" w-11 h-11 rounded-full bg-[rgba(255,255,255,0.2)] flex justify-center items-center">
                      <Ionicons name="arrow-up" className="!text-red-500 !text-2xl" />
                    </View>
                    <View className="justify-between">
                      <Text className="text-slate-300">EXPENSES</Text>
                      <Text className="text-white text-xl font-medium">$7000</Text>
                    </View>
                  </View>
                </View>
              </LinearGradient>
    </MotiView>
  )
}

export default Balance