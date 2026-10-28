import { View, Text, } from "react-native";
import React, { ReactNode } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const SafeScreen = ({ children }: { children: ReactNode }) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ paddingTop: insets.top }} className="bg-background flex-1">
      {children}
    </View>
  );
};

export default SafeScreen;
