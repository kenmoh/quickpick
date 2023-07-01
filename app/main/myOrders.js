import React, { useState } from "react";
import { StyleSheet, Text, View, StatusBar, FlatList } from "react-native";
import { useNavigation, useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";

import { GOOFLE_MAP_API_KEY } from "@env";

import {
  AppActivityIndicator,
  AppErrorMessage,
  AppSafeAreaView,
  Card,
} from "../../components";
import { useAuth } from "../../auth/context";
import { COLORS } from "../../constants/colors_font";
import ordersApi from "../../api/orders";

const myOrders = () => {
  const { user } = useAuth();
  const router = useRouter();
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = React.useState(false);

  const {
    data: orders,
    error,
    loading,
    requestData: loadListings,
  } = useApi(ordersApi.getUserListings);
  const myOrders = orders.orders;

  React.useEffect(() => {
    if (navigation.isFocused()) {
      loadListings();
    }
  }, [navigation.isFocused()]);

  return (
    <AppSafeAreaView>
      <StatusBar backgroundColor={COLORS.primaryColor} barStyle="auto" />
      <AppActivityIndicator visible={loading} height="100%" />
      <AppErrorMessage error={error} visible={error} />
      <View style={styles.container}>
        <FlatList
          data={myOrders}
          keyExtractor={(item) => item.id.toString()}
          estimatedItemSize={200}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          vertical
          renderItem={({ item }) =>
            item.vendor_username === user?.username ? (
              <Card
                order={item}
                orderId={item.id}
                onPress={() =>
                  navigation.navigate("orderDetails", {
                    name: item.name,
                    vendor_username: item.vendor_username,
                    dispatch_company_name: item.dispatch_company_name,
                    dispatch_comapany_phone_number:
                      item.dispatch_comapany_phone_number,
                    rider_phone_number: item.rider_phone_number,
                    order_photo_url: item.order_photo_url,
                    owner_phone_number: item.owner_phone_number,
                    origin: item.origin,
                    destination: item.destination,
                    distance: item.distance,
                    total_cost: item.total_cost,
                    deduction: item.deduction,
                    amount_payable: item.amount_payable,
                    description: item.description,
                    order_status: item.order_status,
                    order_photo_url: item.order_photo_url,
                    order_id: item.id,
                    payment_status: item.payment_status,
                    payment_url: item.payment_url,
                  })
                }
              />
            ) : item.dispatch_company_name === user?.company_name ? (
              <Card
                order={item}
                orderId={item.id}
                onPress={() =>
                  navigation.navigate("orderDetails", {
                    name: item.name,
                    vendor_username: item.vendor_username,
                    dispatch_company_name: item.dispatch_company_name,
                    dispatch_comapany_phone_number:
                      item.dispatch_comapany_phone_number,
                    rider_phone_number: item.rider_phone_number,
                    order_photo_url: item.order_photo_url,
                    owner_phone_number: item.owner_phone_number,
                    origin: item.origin,
                    destination: item.destination,
                    distance: item.distance,
                    total_cost: item.total_cost,
                    deduction: item.deduction,
                    amount_payable: item.amount_payable,
                    description: item.description,
                    order_status: item.order_status,
                    order_photo_url: item.order_photo_url,
                    order_id: item.id,
                  })
                }
              />
            ) : (
              item.rider_phone_number === user?.phone_number &&
              item.dispatch_company_name === user?.dispatch && (
                <Card
                  order={item}
                  orderId={item.id}
                  onPress={() =>
                    navigation.navigate("orderDetails", {
                      name: item.name,
                      vendor_username: item.vendor_username,
                      dispatch_company_name: item.dispatch_company_name,
                      dispatch_comapany_phone_number:
                        item.dispatch_comapany_phone_number,
                      rider_phone_number: item.rider_phone_number,
                      order_photo_url: item.order_photo_url,
                      owner_phone_number: item.owner_phone_number,
                      origin: item.origin,
                      destination: item.destination,
                      distance: item.distance,
                      total_cost: item.total_cost,
                      deduction: item.deduction,
                      amount_payable: item.amount_payable,
                      description: item.description,
                      order_status: item.order_status,
                      order_photo_url: item.order_photo_url,
                      order_id: item.id,
                    })
                  }
                />
              )
            )
          }
          refreshing={refreshing}
          onRefresh={loadListings}
        />
      </View>
    </AppSafeAreaView>
  );
};

export default myOrders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  text: {
    color: "black",
    fontSize: 35,
  },
  titleText: {
    textAlign: "center",
    marginVertical: 10,
    fontWeight: "500",
    color: COLORS.darkText,
    fontSize: 22,
  },
  link: {
    fontSize: 18,
  },
});
