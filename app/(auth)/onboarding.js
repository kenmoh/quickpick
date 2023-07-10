import React from "react";
import { StyleSheet, Text, Image, TouchableOpacity } from "react-native";

import Onboarding from "react-native-onboarding-swiper";
import { COLORS, FONT_WEIGHT } from "../../constants/colors_font";
import { FONT_SIZE } from "../../constants/sizes";
import { useRouter } from "expo-router";

const onboarding = () => {
  const router = useRouter();
  return (
    <>
      <Onboarding
        style={styles.container}
        bottomBarHighlight={false}
        onSkip={() => router.push("signin")}
        nextLabel={<Text style={styles.label}>NEXT</Text>}
        skipLabel={<Text style={styles.label}>SKIP</Text>}
        DoneButtonComponent={() => (
          <TouchableOpacity onPress={() => router.push("signin")}>
            <Text style={styles.done}>DONE</Text>
          </TouchableOpacity>
        )}
        pages={[
          {
            backgroundColor: COLORS.white,
            image: (
              <Image
                source={require("../../assets/delivery.png")}
                style={styles.image}
                resizeMode="cover"
              />
            ),
            title: (
              <Text style={styles.headerText}>Confirm order delivery.</Text>
            ),
            subtitle: (
              <Text style={styles.bodyText}>
                Confirm that your item is delivered to the specified destination
                before clicking on the received button.
              </Text>
            ),
          },
          {
            backgroundColor: COLORS.white,
            image: (
              <Image
                source={require("../../assets/fast_delivery.png")}
                style={styles.image}
                resizeMode="cover"
              />
            ),
            title: (
              <Text style={styles.headerText}>Fast, Efficient and Safe.</Text>
            ),
            subtitle: (
              <Text style={styles.bodyText}>
                Send item(s) to specified destination through registered
                dispatch comapnies.
              </Text>
            ),
          },
          {
            backgroundColor: COLORS.white,
            image: (
              <Image
                source={require("../../assets/Pay_online.png")}
                style={styles.image}
                resizeMode="cover"
              />
            ),
            title: <Text style={styles.headerText}>Secure Payment.</Text>,
            subtitle: (
              <Text style={styles.bodyText}>
                Pay online through secured online payment platform/gateway.
              </Text>
            ),
          },
        ]}
      />
    </>
  );
};

export default onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bodyText: {
    fontSize: 16,
    paddingHorizontal: 20,
    marginBottom: 50,
    color: COLORS.darkText,
    alignSelf: "flex-start",
    textAlign: "justify",
  },

  headerText: {
    fontSize: FONT_SIZE.largeText,
    fontWeight: FONT_WEIGHT.headerTextWeight,
    color: COLORS.primaryColor,
    alignSelf: "flex-start",
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  image: {
    width: 300,
    height: 300,
  },
  done: {
    color: COLORS.primaryColor,
    fontWeight: FONT_WEIGHT.headerTextWeight,
    marginRight: 15,
  },

  label: {
    color: COLORS.primaryColor,
    fontWeight: FONT_WEIGHT.headerTextWeight,
  },
});
