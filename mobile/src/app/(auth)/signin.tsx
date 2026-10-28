import SafeScreen from "@/components/SafeScreen";
import { useSignIn } from "@clerk/expo";
import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Button,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Feather from "@expo/vector-icons/Feather";
import { LinearGradient } from "expo-linear-gradient";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link, useRouter, Href } from "expo-router";
import { OtpInput } from "react-native-otp-entry";

export default function signin() {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [code, setCode] = useState("")
  const [isCodeSent, setIsCodeSent] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [time, setTime] = useState(30)

  const { signIn, fetchStatus } = useSignIn();
  const router = useRouter();

  const handleSignIn = async () => {
    try {
      const { error } = await signIn.password({
        emailAddress: emailAddress.trim(),
        password,
      });

      if (error) {
        throw new Error(error.message);
      }

      console.log("SignIn status:", signIn.status);

      if (signIn.status === "complete") {
        await signIn.finalize({
          navigate: ({ session, decorateUrl }) => {
            // Handle session tasks
            // See https://clerk.com/docs/guides/development/custom-flows/authentication/session-tasks
            if (session?.currentTask) {
              return;
            }

            // If no session tasks, navigate the signed-in user to the home page
            const url = decorateUrl("/");
            if (url.startsWith("http")) {
              window.location.href = url;
            } else {
              router.push(url as Href);
            }
          },
        });
      } else if (signIn.status === "needs_client_trust") {
        const emailCodeFactor = signIn.supportedSecondFactors.find(
          (factor) => factor.strategy === "email_code",
        );

        if (emailCodeFactor) {
          await signIn.mfa.sendEmailCode();
          setIsVerifying(true)
          setIsCodeSent(true)
        }
      } else {
        // Check why the sign-in is not complete
        console.error("Sign-in attempt not complete:", signIn);
      }
    } catch (error: any) {
      Alert.alert("Erreur de connexion", error.message);
    }
  };

  useEffect(() => {
      let timer: number;
      if (isCodeSent) {
        timer = setTimeout(() => {
          if (time === 0) {
            setIsCodeSent(false);
          } else {
            setTime((prev) => prev - 1);
          }
        }, 1000);
        return () => clearTimeout(timer);
      }
    }, [time, isCodeSent]);

    const handleVerify = async (code: string) => {
      await signIn.mfa.verifyEmailCode({ code });

      if (signIn.status === "complete") {
        await signIn.finalize({
          navigate: ({ session, decorateUrl }) => {
            // Handle session tasks
            // See https://clerk.com/docs/guides/development/custom-flows/authentication/session-tasks
            if (session?.currentTask) {
              console.log(session?.currentTask);
              return;
            }

            // If no session tasks, navigate the signed-in user to the home page
            const url = decorateUrl("/");
            if (url.startsWith("http")) {
              window.location.href = url;
            } else {
              router.push(url as Href);
            }
          },
        });
      } else {
        // Check why the sign-in is not complete
        console.error("Sign-in attempt not complete:", signIn);
      }
    };

    

      if (signIn.status === 'needs_client_trust' && isVerifying) {
        return (
          <SafeScreen>
            <KeyboardAwareScrollView
              contentContainerStyle={{ flex: 1 }}
              extraScrollHeight={50}
              enableOnAndroid
            >
              <View className="flex-1 bg-background justify-center items-center px-10">
                <Image
                  source={require("@/assets/images/screen.png")}
                  className="w-[60px] mx-auto mb-0"
                  resizeMode="contain"
                />
                <Text className="text-4xl font-medium mt-4 text-center text-primary">
                  Verify Your Email
                </Text>
                <Text className="text-slate-500 text-center my-5">
                  We sent a 6-digit confirmation code to{" "}
                  <Text className="font-bold">{emailAddress}</Text>. Enter the
                  code below to verify your account.
                </Text>
                <OtpInput
                  numberOfDigits={6}
                  focusColor={"#3525cd"}
                  type="numeric"
                  autoFocus={false}
                  theme={{
                    pinCodeTextStyle: {
                      fontSize: 15,
                      color: "#3525cd",
                    },
                    pinCodeContainerStyle: {
                      backgroundColor: "white",
                    },
                  }}
                  onFilled={handleVerify}
                />
                <View className="mt-4">
                  {isCodeSent ? (
                    <Text className="text-slate-500 text-center max-w-[250px]">
                      Did not receive the code ? Ask for a new code in{" "}
                      <Text className="text-primary">{time}</Text> seconds
                    </Text>
                  ) : (
                    <TouchableOpacity
                      activeOpacity={0.8}
                      className="shadow-md shadow-primary"
                      style={{
                        elevation: 10,
                      }}
                      onPress={async () => {
                        await signIn.mfa.sendEmailCode()
                        setIsCodeSent(true)
                        setTime(30)
                      }}
                      disabled={fetchStatus === "fetching"}
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
                          <Text className="text-white text-2xl text-center font-medium">
                            Resend Code
                          </Text>
                          {fetchStatus === "fetching" ? (
                            <ActivityIndicator size={"small"} color={"white"} />
                          ) : (
                            <Feather
                              name="arrow-right"
                              size={24}
                              color="white"
                            />
                          )}
                        </View>
                      </LinearGradient>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </KeyboardAwareScrollView>
          </SafeScreen>
        );
      }

  return (
    <SafeScreen>
      <KeyboardAwareScrollView
        enableOnAndroid
        extraScrollHeight={80}
        className="flex-1 bg-background"
      >
        <Image
          source={require("@/assets/images/screen.png")}
          className="w-[60px] mx-auto mb-0"
          resizeMode="contain"
        />
        <Text className="text-3xl font-medium text-center">Apex Finance</Text>
        <View className="flex-row w-3/4 mx-auto gap-x-2 items-center justify-center mt-2 bg-surface-container py-2 rounded-lg">
          <MaterialCommunityIcons
            name="star-four-points"
            size={24}

            className="!text-primary"
          />
          <Text className="text-primary">Smart Expense Tracking</Text>
        </View>

        <Text className="text-4xl font-medium mt-8 text-center text-primary">
          Welcome Back
        </Text>
        <Text className="text-center text-xl text-slate-500 mt-2 max-w-[350px] mx-auto">
          Sign in to manage your expenses and your incomes
        </Text>

        <View
          className="bg-white rounded-2xl py-6 px-6 w-[90%] mx-auto shadow-[0px_0px_20px_rgba(0,0,0,0.1)] mt-6"
          style={{ elevation: 20 }}
        >
          <View className="gap-y-2">
            <View className="gap-y-1">
              <Text className="text-xl">Email</Text>
              <View className="bg-surface-container py-3 rounded-lg flex-row items-center gap-x-4 pl-6">
                <FontAwesome name="envelope-o" size={24} color="gray" />
                <TextInput
                  autoCapitalize="none"
                  placeholder="alex.morgan@example.com"
                  className="flex-1 text-xl"
                  returnKeyType="done"
                  keyboardType="email-address"
                  value={emailAddress}
                  onChangeText={setEmailAddress}
                />
              </View>
            </View>

            <View className="gap-y-1">
              <Text className="text-xl">Password</Text>
              <View className="bg-surface-container py-3 rounded-lg flex-row items-center gap-x-4 pl-6 pr-4">
                <Feather name="lock" size={24} color="gray" />
                <TextInput
                  placeholder="••••••••••••"
                  className="flex-1 text-xl"
                  secureTextEntry={!showPassword}
                  returnKeyType="done"
                  value={password}
                  onChangeText={setPassword}
                />
                {showPassword === true ? (
                  <Ionicons
                    name="eye-outline"
                    size={24}
                    color="gray"
                    onPress={() => setShowPassword(false)}
                  />
                ) : (
                  <Ionicons
                    name="eye-off-outline"
                    size={24}
                    color="gray"
                    onPress={() => setShowPassword(true)}
                  />
                )}
              </View>
            </View>

            <TouchableOpacity
              activeOpacity={0.8}
              className="shadow-md shadow-primary"
              style={{
                elevation: 10,
              }}
              disabled={fetchStatus === "fetching"}
              onPress={handleSignIn}
            >
              <LinearGradient
                colors={["#3525cd", "#712ae2"]}
                style={{ borderRadius: 10, marginTop: 10, flex: 1 }}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View className="py-3 flex-row justify-center items-center gap-x-4">
                  <Text className="text-white text-2xl text-center font-medium">
                    Sign In
                  </Text>
                  {fetchStatus === "fetching" ? (
                    <ActivityIndicator size={"small"} color={"white"} />
                  ) : (
                    <Feather name="arrow-right" size={24} color="white" />
                  )}
                </View>
              </LinearGradient>
            </TouchableOpacity>
            <View nativeID="clerk-captcha" />
          </View>
          <View className="mt-3 flex-row items-center gap-x-3">
            <View className="h-px bg-slate-300 flex-1"></View>
            <Text className="text-xl text-slate-500">Or</Text>
            <View className="h-px bg-slate-300 flex-1"></View>
          </View>

          <View className="flex-row gap-x-4 items-center mt-3">
            <View className="flex-row justify-center items-center gap-x-2 bg-surface-container rounded-xl flex-1 py-2">
              <Image
                source={require("@/assets/images/google.png")}
                className="w-10 h-10 object-cover"
              />
            </View>
            <View className="flex-row justify-center items-center gap-x-2 bg-surface-container rounded-xl flex-1 py-2">
              <Image
                source={require("@/assets/images/apple.png")}
                className="w-10 h-10 object-cover"
              />
            </View>
          </View>
        </View>
        <Text className="text-xl text-slate-500 text-center mt-6">
          Don't have an account ?{" "}
          <Link href={"/(auth)/signup"} style={{ color: "#3525cd" }}>
            Sign Up
          </Link>
        </Text>
      </KeyboardAwareScrollView>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 12,
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
});
