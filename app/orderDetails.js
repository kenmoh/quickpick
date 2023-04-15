import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Platform,
  Dimensions,
} from "react-native";
import {
  TriggeringView,
  ImageHeaderScrollView,
} from "react-native-image-header-scroll-view";

import { useSearchParams } from "expo-router";

import { CardText, Divider, OrderBtn } from "../components";
import { COLORS } from "../constants/colors_font";
import orderApi from "../api/orders";

const MIN_HEIGHT = Platform.OS === "ios" ? 90 : 55;
const MAX_HEIGHT = 300;

const orderDetails = () => {
  const params = useSearchParams();
  const order = params;

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
                <Text style={styles.text}>order information</Text>
                <Divider margin={10} />
                <CardText
                  title="Sender"
                  subTitle={order?.vendor_username}
                  textTransform={"uppercase"}
                />
                <Divider margin={10} />
                <CardText
                  title="Sender Phone No."
                  subTitle={order?.owner_phone_number}
                  textTransform={"uppercase"}
                />
                <Divider margin={10} />
                <CardText
                  title="Item Name"
                  subTitle={order?.name}
                  textTransform={"uppercase"}
                />
                <Divider margin={10} />
                <CardText
                  title="Origin"
                  subTitle={order?.origin}
                  textTransform={"uppercase"}
                />
                <Divider margin={10} />
                <CardText
                  title="Destination"
                  subTitle={order?.location}
                  textTransform={"uppercase"}
                />
                <Divider margin={10} />
                <CardText
                  title="Distance"
                  subTitle={`${order?.distance} km`}
                  textTransform={"uppercase"}
                />
                <Divider margin={10} />
                <CardText
                  title="Cost"
                  subTitle={`NGN ${order?.total_cost}`}
                  textTransform={"uppercase"}
                />
                <Divider margin={10} />
                <CardText
                  title="Service charge"
                  subTitle={order?.deduction}
                  textTransform={"uppercase"}
                />
                <Divider margin={10} />
                <CardText
                  title="AMOUNT PAYABLE"
                  subTitle={order?.amount_payable}
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

      <OrderBtn
        btnColor={"primaryColor"}
        title={"accept"}
        textColor="white"
        height={50}
        onPress={() => console.log("Order Picked Up")}
      />
    </>
  );
};

export default orderDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    fontSize: 18,
    fontWeight: "200",
    letterSpacing: 1.5,
    color: "grey",
    textTransform: "uppercase",
    marginTop: 15,
    textAlign: "center",
  },
  description: {
    color: COLORS.darkText,
    lineHeight: 25,
    textAlign: "justify",
  },
});
