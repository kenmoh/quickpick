import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import profileImage from "../../assets/profile.png";
import Notification from "../../components/Notification";
import { COLORS } from "../../constants/colors_font";
import ordersApi from "../../api/orders";
import { useAuth } from "../../auth/context";

const notification = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getUserNotifications = async () => {
    setIsLoading(true);
    const result = await ordersApi.reportUser();
  };

  return (
    <View style={styles.container}>
      <Notification
        message="In this example, we assume the data object contains deposits and withdrawals arrays, each containing objects with an id and created_at property. We use the sort method with a comparison function to sort both arrays based on the created_at date in ascending order"
        orderDate={"2023-07-07"}
        orderName={"New Order"}
        username={"Kenmoh"}
      />
      <Notification
        message="In this example arrays, each containing objects with an id and created_at property. We use the sort method with a comparison function to sort both arrays based on the created_at date in ascending order"
        orderDate={"2023-07-07"}
        orderName={"New Order"}
        username={"Kenmoh"}
      />
      <Notification
        message="In this example, we assume the data object contains deposits and withdrawals arrays, each containing objects with an id and created_at property. "
        orderDate={"2023-07-07"}
        orderName={"New Order"}
        username={"Kenmoh"}
      />
    </View>
  );
};

export default notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});
