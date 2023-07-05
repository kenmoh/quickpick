import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Platform,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import {
  TriggeringView,
  ImageHeaderScrollView,
} from "react-native-image-header-scroll-view";

import { useSearchParams, useNavigation } from "expo-router";
import { showMessage } from "react-native-flash-message";

import {
  AppActivityIndicator,
  AppErrorMessage,
  CardText,
  Divider,
  OrderBtn,
  Status,
} from "../components";
import { COLORS } from "../constants/colors_font";
import { useAuth } from "../auth/context";
import ordersApi from "../api/orders";

const MIN_HEIGHT = Platform.OS === "ios" ? 90 : 55;
const MAX_HEIGHT = 300;

const orderDetails = () => {
  const { user } = useAuth();
  const params = useSearchParams();
  const navigation = useNavigation();
  const order = params;

  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handlePickUpOrder = async ({ orderId = order.order_id }) => {
    setIsLoading(true);
    const result = await ordersApi.pickUpOrder(orderId);
    setIsLoading(false);
    navigation.goBack();
    if (result.ok) {
      showMessage({
        message: "Order picked up successfully!",
        type: "success",
      });
      return;
    }
    if (!result.ok) {
      showMessage({
        message: result.data.detail,
        type: "danger",
      });
      return;
    }
  };
  const handleDeliveredOrder = async ({ orderId = order.order_id }) => {
    setIsLoading(true);
    const result = await ordersApi.orderDelievered(orderId);
    setIsLoading(false);
    navigation.goBack();
    if (result.ok) {
      showMessage({
        message: "Order delivered successfully!",
        type: "success",
      });
      return;
    }
    if (!result.ok) {
      showMessage({
        message: result.data.detail,
        type: "danger",
      });
      return;
    }
  };
  const handleReceivedOrder = async ({ orderId = order.order_id }) => {
    setIsLoading(true);
    const result = await ordersApi.orderReceived(orderId);
    setIsLoading(false);
    navigation.goBack();
    if (result.ok) {
      showMessage({
        message: "Order delivered successfully!",
        type: "success",
      });
      return;
    }
    if (!result.ok) {
      showMessage({
        message: result.data.detail,
        type: "danger",
      });
      return;
    }
  };

  return (
    <>
      <View style={styles.container}>
        <StatusBar backgroundColor="#66000000" barStyle="auto" />
        <ImageHeaderScrollView
          maxHeight={MAX_HEIGHT}
          minHeight={MIN_HEIGHT}
          headerImage={{ uri: order?.order_photo_url }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ height: 800 }}>
            <TriggeringView onHide={() => console.log("text hidden")}>
              <View style={styles.detailContainer}>
                <View style={styles.headingContainer}>
                  <Text style={styles.text}>order information</Text>
                  <Status
                    text={order?.order_status}
                    backgroundColor={`${
                      order?.order_status === "Received"
                        ? "success"
                        : order?.order_status === "Picked up"
                        ? "pickUpColor"
                        : order?.order_status === "Delivered"
                        ? "activeTrackColor"
                        : "pendingColor"
                    }`}
                    textColor={`${
                      order?.order_status === "Pending"
                        ? "#c8553d"
                        : order?.order_status === "Received"
                        ? "#25a18e"
                        : order?.order_status === "Delivered"
                        ? "#27187e"
                        : "#e8ac65"
                    }`}
                  />
                </View>
                <Divider margin={10} />
                <CardText
                  title="Sender"
                  subTitle={order?.vendor_username}
                  textTransform={"capitalize"}
                />

                <Divider margin={10} />
                <CardText
                  title="Sender Phone No."
                  subTitle={order?.owner_phone_number}
                  textTransform={"capitalize"}
                />

                <Divider margin={10} />
                <CardText
                  title={
                    order?.dispatch_comapany_phone_number
                      ? "Dispatch phone no."
                      : "Rider phone no."
                  }
                  subTitle={
                    order?.dispatch_comapany_phone_number ||
                    order?.rider_phone_number
                  }
                  textTransform={"capitalize"}
                />

                <Divider margin={10} />
                <CardText
                  title="Company Name."
                  subTitle={order?.dispatch_company_name}
                  textTransform={"capitalize"}
                />
                <Divider margin={10} />
                <CardText
                  title="Item Name"
                  subTitle={order?.name}
                  textTransform={"capitalize"}
                />
                <Divider margin={10} />
                <CardText
                  title="Origin"
                  subTitle={order?.origin}
                  textTransform={"capitalize"}
                />
                <Divider margin={10} />
                <CardText
                  title="Destination"
                  subTitle={order?.destination}
                  textTransform={"capitalize"}
                />
                <Divider margin={10} />
                <CardText
                  title="Distance"
                  subTitle={`${order?.distance} km`}
                  textTransform={"capitalize"}
                />
                <Divider margin={10} />
                <CardText
                  title="Total Cost"
                  subTitle={`NGN ${order?.total_cost}`}
                  textTransform={"uppercase"}
                />
                <Divider margin={10} />
                <CardText
                  title="Service charge"
                  subTitle={`NGN ${order?.deduction}`}
                  textTransform={"uppercase"}
                />
                <Divider margin={10} />
                <CardText
                  title="AMOUNT PAYABLE"
                  subTitle={`NGN ${order?.amount_payable}`}
                  textTransform={"uppercase"}
                />
                <Divider margin={15} />
                <CardText title="description" textTransform={"uppercase"} />
                <Divider margin={3} />
                <Text style={styles.description}>{order?.description}</Text>
              </View>
            </TriggeringView>
          </View>
        </ImageHeaderScrollView>
      </View>
      <AppActivityIndicator visible={isLoading} height="100%" />

      {/* <AppErrorMessage error={error} visible={error} /> */}
      {(order?.payment_status === "pending" ||
        order?.payment_status === "cancelled" ||
        order?.payment_status === "failed") && (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("paymentUrl", {
              payment_url: order.payment_url,
              total_cost: order.total_cost,
            })
          }
        >
          <Text style={styles.paymentText}>PAY TO LIST ORDER</Text>
        </TouchableOpacity>
      )}

      {user?.username === order?.vendor_username && (
        <OrderBtn
          btnColor={
            order?.order_status != "Received" ? "primaryColor" : "darkText"
          }
          title="received"
          textColor="white"
          height={50}
          onPress={handleReceivedOrder}
          disabled={order?.order_status === "Received" ? true : false}
        />
      )}
      {(user?.user_type === "dispatcher" || user?.user_type === "rider") &&
        order?.order_status === "Picked up" && (
          <OrderBtn
            btnColor={"primaryColor"}
            title={"delivered"}
            textColor="white"
            height={50}
            onPress={handleDeliveredOrder}
          />
        )}

      {(user?.user_type === "dispatcher" || user?.user_type === "rider") &&
        order?.order_status === "Pending" && (
          <OrderBtn
            btnColor={"primaryColor"}
            title={"pickup"}
            textColor="white"
            height={50}
            onPress={handlePickUpOrder}
          />
        )}
    </>
  );
};

export default orderDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  detailContainer: {
    width: "90%",
    alignSelf: "center",
  },

  image: {
    height: MAX_HEIGHT,
    width: Dimensions.get("window").width,
    alignSelf: "stretch",
    resizeMode: "cover",
  },
  text: {
    fontSize: 16,
    fontWeight: "200",
    letterSpacing: 1.5,
    color: "grey",
    textTransform: "uppercase",
  },
  description: {
    color: COLORS.darkText,
    lineHeight: 25,
    textAlign: "justify",
  },

  headingContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 10,
  },

  paymentText: {
    textAlign: "center",
    fontSize: 14,
    color: COLORS.secondaryColor,
    padding: 10,
    backgroundColor: COLORS.white,
  },
});
