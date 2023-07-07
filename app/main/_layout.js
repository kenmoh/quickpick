import { useEffect } from "react";
import { Tabs } from "expo-router";
// import * as Permissions from "expo-permission";
import { Notifications } from "expo";
import { AntDesign, Feather } from "@expo/vector-icons";

import { COLORS } from "../../constants/colors_font";
import expoNotification from "../../api/expoNotification";

export default () => {
  // useEffect(() => {
  //   registerForPushNotification();
  // }, []);
  // const registerForPushNotification = async () => {
  //   try {
  //     const permission = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  //     if (!permission.granted) return;
  //     const token = await Notifications.getExpoPushTokenAsync();
  //     console.log(token);
  //     expoNotification.register_notification(token);
  //   } catch (error) {
  //     console.log("Error getting notification token", error);
  //   }
  // };
  return (
    <Tabs
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
      <Tabs.Screen
        name="orders"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" size={20} color={color} />
          ),

          tabBarLabel: "HOME",
        }}
      />
      <Tabs.Screen
        name="myOrders"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <Feather name="list" size={20} color={color} />
          ),
          tabBarLabel: "MY ORDERS",
        }}
      />

      <Tabs.Screen
        name="notification"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <AntDesign name="bells" size={20} color={color} />
          ),
          tabBarLabel: "NOTIFICATIONS",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <AntDesign name="user" size={20} color={color} />
          ),
          tabBarLabel: "PROFILE",
        }}
      />
    </Tabs>
  );
};
