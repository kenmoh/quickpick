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
import { AppButton, CardText, Divider, OrderBtn } from "../components";
import { COLORS } from "../constants/colors_font";

const MIN_HEIGHT = Platform.OS === "ios" ? 90 : 55;
const MAX_HEIGHT = 300;

const orderDetails = () => {
  const img =
    "https://a.cdn-hotels.com/gdcs/production0/d1513/35c1c89e-408c-4449-9abe-f109068f40c0.jpg?impolicy=fcrop&w=800&h=533&q=medium";
  return (
    <>
      <View style={styles.container}>
        <StatusBar backgroundColor="#66000000" barStyle="auto" />
        <ImageHeaderScrollView
          maxHeight={MAX_HEIGHT}
          minHeight={MIN_HEIGHT}
          headerImage={{ uri: img }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ height: 800 }}>
            <TriggeringView onHide={() => console.log("text hidden")}>
              <View style={styles.detailContainer}>
                <Text style={styles.text}>order information</Text>
                <Divider margin={10} />
                <CardText
                  title="Sender"
                  subTitle={"Kenmoh"}
                  textTransform={"uppercase"}
                />
                <Divider margin={10} />
                <CardText
                  title="Sender Phone No."
                  subTitle={"09099009988"}
                  textTransform={"uppercase"}
                />
                <Divider margin={10} />
                <CardText
                  title="Item Name"
                  subTitle={"Cheese Burger"}
                  textTransform={"uppercase"}
                />
                <Divider margin={10} />
                <CardText
                  title="Origin"
                  subTitle={"Lakowe"}
                  textTransform={"uppercase"}
                />
                <Divider margin={10} />
                <CardText
                  title="Destination"
                  subTitle={"Lekki"}
                  textTransform={"uppercase"}
                />
                <Divider margin={10} />
                <CardText
                  title="Distance"
                  subTitle={"2km"}
                  textTransform={"uppercase"}
                />
                <Divider margin={10} />
                <CardText
                  title="Cost"
                  subTitle={4300}
                  textTransform={"uppercase"}
                />
                <Divider margin={10} />
                <CardText
                  title="Service charge"
                  subTitle={300}
                  textTransform={"uppercase"}
                />
                <Divider margin={10} />
                <CardText
                  title="AMOUNT PAYABLE"
                  subTitle={4000}
                  textTransform={"uppercase"}
                />
                <Divider margin={15} />
                <CardText title="description" textTransform={"uppercase"} />
                <Divider margin={3} />
                <Text style={styles.description}>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged.
                </Text>
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
