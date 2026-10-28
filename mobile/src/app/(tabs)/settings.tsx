import SafeScreen from "@/components/SafeScreen";
import { Ionicons, FontAwesome, AntDesign, EvilIcons, Entypo } from "@expo/vector-icons";
import { View, Text, StyleSheet, Switch, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { useClerk } from "@clerk/expo";

const Profile = () => {
  const [isDark, setIsDark] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [sync, setSync] = useState(false);
  const {signOut} = useClerk()

  return (
    <SafeScreen>
      <View className="flex-1 bg-background px-6">
        <View className="flex-row gap-x-4 items-center pt-10">
          <LinearGradient
            colors={["#3525cd", "#712ae2"]}
            style={{
              paddingBlock: 18,
              paddingInline: 18,
              borderRadius: 10,
            }}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Ionicons name="settings" className="!text-4xl !text-white" />
          </LinearGradient>

          <Text className="text-3xl font-medium text-primary">Settings</Text>
        </View>

        <View
          className="mt-10 bg-white py-4 px-6 rounded-2xl"
          style={{
            boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
            elevation: 1,
          }}
        >
          <Text className="text-2xl font-medium text-slate-800">
            Preferences
          </Text>
          <View className="mt-6 gap-y-4">
            <View className="flex-row justify-between items-center border-b border-slate-200 pb-6">
              <View className="flex-row items-center gap-x-6">
                <View className="w-[50px] h-[50px] bg-blue-600 rounded-md justify-center items-center">
                  <Ionicons name="moon" className="!text-2xl !text-white" />
                </View>
                <Text className="text-xl font-medium text-slate-700">
                  Dark Mode
                </Text>
              </View>
              <View>
                <Switch
                  value={isDark}
                  onChange={() => setIsDark(!isDark)}
                  trackColor={{
                    true: "#2563eb",
                  }}
                  thumbColor={"white"}
                />
              </View>
            </View>

            <View className="flex-row justify-between items-center border-b border-slate-200 pb-6">
              <View className="flex-row items-center gap-x-6">
                <View className="w-[50px] h-[50px] bg-amber-500 rounded-md justify-center items-center">
                  <FontAwesome name="bell" className="!text-2xl !text-white" />
                </View>
                <Text className="text-xl font-medium text-slate-700">
                  Notifications
                </Text>
              </View>
              <View>
                <Switch
                  value={notificationsEnabled}
                  onChange={() =>
                    setNotificationsEnabled(!notificationsEnabled)
                  }
                  trackColor={{
                    true: "#f59e0b",
                  }}
                  thumbColor={"white"}
                />
              </View>
            </View>

            <View className="flex-row justify-between items-center pb-6">
              <View className="flex-row items-center gap-x-6">
                <View className="w-[50px] h-[50px] bg-green-600 rounded-md justify-center items-center">
                  <AntDesign name="sync" className="!text-2xl !text-white" />
                </View>
                <Text className="text-xl font-medium text-slate-700">
                  Auto Sync
                </Text>
              </View>
              <View>
                <Switch
                  value={sync}
                  onChange={() => setSync(!sync)}
                  trackColor={{
                    true: "#16a34a",
                  }}
                  thumbColor={"white"}
                />
              </View>
            </View>
          </View>
        </View>

        <View
          className="mt-10 bg-white py-4 px-6 rounded-2xl"
          style={{
            boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
            elevation: 1,
          }}
        >
          <Text className="text-2xl text-red-500 font-medium">Danger Zone</Text>

          <TouchableOpacity
            className="mt-5 flex-row justify-between items-center"
            activeOpacity={0.8}
          >
            <View className="flex-row items-center gap-x-4">
              <View className="bg-red-500 w-14 h-14 rounded-full justify-center items-center">
                <Ionicons name="trash" className="!text-2xl !text-white" />
              </View>
              <Text className="text-red-500 text-xl font-medium">
                Reset App
              </Text>
            </View>
            <EvilIcons
              name="chevron-right"
              className="!text-5xl !text-slate-400"
            />
          </TouchableOpacity>

          <TouchableOpacity
            className="mt-5 flex-row justify-between items-center"
            activeOpacity={0.8}
            onPress={() => signOut()}
          >
            <View className="flex-row items-center gap-x-4">
              <View className="bg-red-500 w-14 h-14 rounded-full justify-center items-center">
                <Entypo name="log-out" className="!text-2xl !text-white" />
              </View>
              <Text className="text-red-500 text-xl font-medium">Sign Out</Text>
            </View>
            <EvilIcons
              name="chevron-right"
              className="!text-5xl !text-slate-400"
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeScreen>
  );
};


export default Profile;
