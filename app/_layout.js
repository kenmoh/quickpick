import { Stack } from "expo-router";
import { COLORS } from "../constants/colors_font";

export default () => (
  <Stack
    screenOptions={{
      headerStyle: {
        backgroundColor: COLORS.primaryColor,
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
        fontSize: 22,
      },
      headerShadowVisible: false,
    }}
  >
    <Stack.Screen
      name="index"
      options={{
        title: "",
      }}
    />
    <Stack.Screen
      name="signin"
      options={{
        title: "",
      }}
    />
    <Stack.Screen
      name="signup"
      options={{
        title: "",
      }}
    />
    <Stack.Screen
      name="dispatchSignUp"
      options={{
        title: "",
      }}
    />
    <Stack.Screen
      name="forgotPassword"
      options={{
        title: "",
      }}
    />
    <Stack.Screen
      name="orderDetails"
      options={{
        title: "",
        headerTransparent: true,
        headerTintColor: COLORS.white,
        headerStyle: {
          backgroundColor: null,
        },
      }}
    />
  </Stack>
);
