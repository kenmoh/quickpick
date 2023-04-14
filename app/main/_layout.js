import { Tabs } from "expo-router";
import { AntDesign, Feather } from "@expo/vector-icons";

import { COLORS } from "../../constants/colors_font";

export default () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
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
      <Tabs.Screen
        name="orders"
        options={{
          title: "",
          tabBarIcon: ({ size, color }) => (
            <AntDesign name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="myOrders"
        options={{
          title: "My Orders",
          tabBarIcon: ({ size, color }) => (
            <Feather name="list" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="notification"
        options={{
          title: "",
          tabBarIcon: ({ size, color }) => (
            <AntDesign name="bells" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "",
          tabBarIcon: ({ size, color }) => (
            <AntDesign name="user" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};
