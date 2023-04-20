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
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" size={20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="myOrders"
        options={{
          title: "My Orders",
          tabBarIcon: ({ color }) => (
            <Feather name="list" size={20} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="notification"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <AntDesign name="bells" size={20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <AntDesign name="user" size={20} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};
