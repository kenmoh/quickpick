import { StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

import { AppButton, AppSafeAreaView } from "../components";
import { BUTTON_SIZE, PADDING } from "../constants/sizes";
import { COLORS } from "../constants/colors_font";
import { GOOFLE_MAP_API_KEY } from "@env";

const pickLocations = () => {
  const router = useRouter();
  return (
    <AppSafeAreaView>
      <View style={styles.container}>
        <Text style={styles.titleText}>Locations</Text>

        <GooglePlacesAutocomplete
          placeholder="From"
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={400}
          query={{
            key: GOOFLE_MAP_API_KEY,
            language: "en",
          }}
          styles={{
            container: { flex: 0 },
            textInputContainer: {
              borderColor: COLORS.darkText,
              borderWidth: 1,
              borderRadius: BUTTON_SIZE.smallRadius,
            },
            textInput: {
              height: 38,
              color: "grey",
              fontSize: 16,
            },
          }}
          minLength={2}
        />

        <GooglePlacesAutocomplete
          placeholder="To"
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={400}
          query={{
            key: GOOFLE_MAP_API_KEY,
            language: "en",
          }}
          styles={{
            container: { flex: 0 },
            textInputContainer: {
              borderColor: COLORS.darkText,
              borderWidth: 1,
              borderRadius: BUTTON_SIZE.smallRadius,
              marginVertical: 15,
            },
            textInput: {
              height: 38,
              color: "grey",
              fontSize: 16,
            },
          }}
          minLength={2}
        />
        <AppButton
          btnColor="primaryColor"
          title="next"
          textColor="white"
          onPress={() => router.push("addOrder")}
          borderRadius={"smallRadius"}
        />
      </View>
    </AppSafeAreaView>
  );
};

export default pickLocations;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: PADDING.horizontalPaddingLarge,
    backgroundColor: COLORS.white,
    flex: 1,
  },
  textContainer: {
    alignItems: "center",
  },
  text: {
    color: COLORS.primaryColor,
    fontWeight: "bold",
  },

  titleText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "gray",
    marginVertical: 15,
    alignSelf: "center",
  },
});
