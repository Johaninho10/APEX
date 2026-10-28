import { View, Text } from 'react-native'
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

const EmptyElement = () => {
  return (
    <View className="justify-center items-center gap-y-4">
      <Text className="text-slate-600 text-xl">No Transactions yet!</Text>
      <View className="w-40 h-40 rounded-full bg-primary/80 justify-center items-center">
        <FontAwesome5 name="clipboard-list" size={60} color="white" />
      </View>
    </View>
  );
}

export default EmptyElement