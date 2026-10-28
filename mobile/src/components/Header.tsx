import { View, Text, Image } from "react-native";

const Header = () => {
  return (
    <View className="flex-row gap-x-4 items-center">
      <Image
        source={require("@/assets/images/screen.png")}
        className="w-[60px]"
        resizeMode="contain"
      />
      <Text className="text-3xl font-medium text-primary">Apex</Text>
    </View>
  );
};

export default Header;
