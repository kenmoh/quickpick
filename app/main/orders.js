import { StatusBar, StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";

import { useRouter, useNavigation } from "expo-router";
import { AntDesign } from "@expo/vector-icons";

import { PADDING } from "../../constants/sizes";
import { COLORS } from "../../constants/colors_font";
import {
  AppActivityIndicator,
  AppSafeAreaView,
  Card,
  FloatingActionButton,
} from "../../components";
import { useAuth } from "../../auth/context";
import useApi from "../../hooks/useApi";
import orderApi from "../../api/orders";

const orders = () => {
  const router = useRouter();
  const { user } = useAuth();
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = React.useState(false);
  const {
    data: orders,
    error,
    loading,
    requestData: loadListings,
  } = useApi(orderApi.getListings);

  React.useEffect(() => {
    loadListings();
  }, []);

  return (
    <AppSafeAreaView>
      <AppActivityIndicator visible={loading} height="100%" />
      <StatusBar backgroundColor={COLORS.primaryColor} barStyle="auto" />
      <View style={styles.container}>
        {error && <Text>Something went wrong</Text>}
        <Text style={styles.titleText}>Orders</Text>
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id.toString()}
          estimatedItemSize={200}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          vertical
          renderItem={({ item }) => (
            <Card
              order={item}
              onPress={() =>
                navigation.navigate("orderDetails", {
                  name: item.name,
                  vendor_username: item.vendor_username,
                  order_photo_url: item.order_photo_url,
                  owner_phone_number: item.owner_phone_number,
                  origin: item.origin,
                  location: item.location,
                  distance: item.distance,
                  total_cost: item.total_cost,
                  deduction: item.deduction,
                  amount_payable: item.amount_payable,
                  description: item.description,
                  order_photo_url: item.order_photo_url,
                })
              }
            />
          )}
          refreshing={refreshing}
          // TODO: function to call new data from backend
          onRefresh={() => {}}
        />

        {/* Show Add button base on user(vendor) */}
        {user?.user_type === "vendor" && (
          <FloatingActionButton
            icon={<AntDesign name="plus" size={20} color="white" />}
            onPress={() => router.push("pickLocations")}
          />
        )}
      </View>
    </AppSafeAreaView>
  );
};

export default orders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: PADDING.horizontalPaddingSmall,
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
