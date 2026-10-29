import { ClerkProvider } from "@clerk/expo";
import { tokenCache } from "@clerk/expo/token-cache";
import { Slot } from "expo-router";
import "../../global.css";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import store from "@/redux/store";
import { Provider } from "react-redux";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error("Add your Clerk Publishable Key to the .env file");
}

export default function RootLayout() {
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Provider store={store}>
          <Slot />
        </Provider>
      </GestureHandlerRootView>
    </ClerkProvider>
  );
}
