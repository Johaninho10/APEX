import Ionicons from "@expo/vector-icons/Ionicons";
import { NativeTabs } from "expo-router/unstable-native-tabs";
import { useAuth, useClerk, useUser } from "@clerk/expo";
import { Redirect, VectorIcon } from "expo-router";
import { Platform, Text, View } from "react-native";

const TabsLayout = () => {
  const { isLoaded, isSignedIn } = useAuth();
  if (!isLoaded) {
    return null;
  }

  if (!isSignedIn) {
    return <Redirect href={"/(auth)/signin"} />;
  }

  return (
    <NativeTabs
      tintColor={"#3525cd"}
      iconColor={Platform.OS === "ios" ? "#3525cd" : ""}
      labelStyle={{
        fontSize: 10,
      }}
      
    >
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Icon
          src={<VectorIcon family={Ionicons} name="home" />}
        />
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="analytics">
        <NativeTabs.Trigger.Icon
          src={<VectorIcon family={Ionicons} name="bar-chart" />}
        />
        <NativeTabs.Trigger.Label>Analytics</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="settings">
        <NativeTabs.Trigger.Icon
          src={<VectorIcon family={Ionicons} name="settings" />}
        />
        <NativeTabs.Trigger.Label>Settings</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
};

export default TabsLayout;
