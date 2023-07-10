import { StyleSheet, View, ScrollView, StatusBar } from "react-native";
import { useNavigation } from "expo-router";
import { Formik } from "formik";
import * as Yup from "yup";
import MapView, { Marker } from "react-native-maps";

import {
  AppButton,
  AppSafeAreaView,
  AppTextInput,
  InputErrorMessage,
  ImagePickerForm,
  AppActivityIndicator,
  AppErrorMessage,
} from "../components";
import { PADDING } from "../constants/sizes";
import { COLORS } from "../constants/colors_font";
import { GOOFLE_MAP_API_KEY } from "@env";
import ordersApi from "../api/orders";
import { useState } from "react";
import { showMessage } from "react-native-flash-message";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  description: Yup.string().required().label("Description"),
  origin: Yup.string().required().label("Origin"),
  destination: Yup.string().required().label("Destination"),
  distance: Yup.number().required().label("Distance"),
  orderPhotoUrl: Yup.string().required().label("Image"),
});

const addOrder = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  const handleAddOrder = async (item, { resetForm }) => {
    setIsLoading(true);
    const result = await ordersApi.addItem(item);
    setIsLoading(false);
    navigation.navigate("paymentUrl", {
      payment_url: result.data.payment_url,
      total_cost: result.data.total_cost,
    });
    resetForm();
    if (result.ok) {
      showMessage({
        message: "Order created! Please pay to list your order for pickup",
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
    <AppSafeAreaView>
      <AppActivityIndicator visible={isLoading} height="100%" />

      <StatusBar backgroundColor="#66000000" barStyle="dark-content" />
      <View style={styles.map}>
        <MapView
          mapType="mutedStandard"
          style={{ flex: 1 }}
          region={{
            latitude: 6.4551,
            longitude: 3.384,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
          pitchEnabled
        />
      </View>
      <View style={styles.container}>
        <Formik
          initialValues={{
            name: "",
            description: "",
            origin: "",
            destination: "",
            distance: "",
            orderPhotoUrl: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleAddOrder}
        >
          {({ handleChange, handleSubmit, values, errors, touched }) => (
            <>
              <View style={styles.form}>
                <ScrollView showsVerticalScrollIndicator={false}>
                  <ImagePickerForm field={"orderPhotoUrl"} />
                  <AppTextInput
                    label="Order Name"
                    secureTextEntry={false}
                    onChangeText={handleChange("name")}
                    value={values.name}
                    autoCapitalize="words"
                    placeholder="Order Name"
                    marginBtm={1}
                  />
                  {touched.name && errors.name && (
                    <InputErrorMessage error={errors.name} />
                  )}
                  <AppTextInput
                    label="Origin"
                    secureTextEntry={false}
                    onChangeText={handleChange("origin")}
                    value={values.origin}
                    autoCapitalize="words"
                    placeholder="Origin"
                    // editable={false}
                    marginBtm={1}
                  />
                  {touched.origin && errors.origin && (
                    <InputErrorMessage error={errors.origin} />
                  )}

                  <AppTextInput
                    label="Destination"
                    secureTextEntry={false}
                    onChangeText={handleChange("destination")}
                    value={values.destination}
                    autoCapitalize="words"
                    placeholder="Destination"
                    // editable={false}
                    marginBtm={1}
                  />
                  {touched.destination && errors.destination && (
                    <InputErrorMessage error={errors.destination} />
                  )}
                  <AppTextInput
                    label="Distance"
                    secureTextEntry={false}
                    onChangeText={handleChange("distance")}
                    value={values.distance}
                    autoCapitalize="none"
                    placeholder="Distance"
                    marginBtm={1}
                    // editable={false}
                  />
                  {touched.distance && errors.distance && (
                    <InputErrorMessage error={errors.distance} />
                  )}
                  <AppTextInput
                    label="Description"
                    secureTextEntry={false}
                    onChangeText={handleChange("description")}
                    value={values.description}
                    autoCapitalize="sentences "
                    placeholder="Description"
                    isMultiline={true}
                  />
                  {touched.description && errors.description && (
                    <InputErrorMessage error={errors.description} />
                  )}
                  <AppButton
                    btnColor="primaryColor"
                    title="list order"
                    textColor="white"
                    onPress={handleSubmit}
                    borderRadius={"smallRadius"}
                  />
                </ScrollView>
              </View>
            </>
          )}
        </Formik>
      </View>
    </AppSafeAreaView>
  );
};

export default addOrder;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: PADDING.horizontalPaddingSmall,
    backgroundColor: COLORS.white,
    flex: 2,
  },
  map: {
    flex: 1,
  },
});
