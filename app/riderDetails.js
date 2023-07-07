import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useNavigation, useSearchParams } from "expo-router";
import { AntDesign } from "@expo/vector-icons";

import { Formik } from "formik";
import * as Yup from "yup";
import { showMessage } from "react-native-flash-message";

import {
  AppActivityIndicator,
  AppButton,
  AppSafeAreaView,
  AppTextInput,
  ImagePickerForm,
  InputErrorMessage,
} from "../components";
import { PADDING } from "../constants/sizes";
import { COLORS } from "../constants/colors_font";
import usersApi from "../api/users";
import { color } from "react-native-reanimated";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required().label("Username"),
  plateNumber: Yup.string().required().label("Plate Number"),
  profilePhotoUrl: Yup.string().required().label("Image"),
});

const riderDetails = () => {
  const navigation = useNavigation();
  const riderParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleRider = async () => {
    setIsLoading(true);
    const result = await usersApi.dispatchDeleteRider(riderParams.riderId);
    setIsLoading(false);

    navigation.goBack();
    if (result.ok) {
      showMessage({
        message: "Rider deleted successfully!",
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

  const handleAlert = () => {
    Alert.alert("Delete", "Are you sure you want to delete this rider?", [
      {
        text: "Yes",
        onPress: () => handleDeleRider(),
      },
      { text: "No" },
    ]);
  };

  const handleUpdate = async (rider) => {
    setIsLoading(true);
    const result = await usersApi.updateRider(rider, riderParams.riderId);
    setIsLoading(false);

    navigation.goBack();
    if (result.ok) {
      showMessage({
        message: "Profile updated successfully!",
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

      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.titleText}>Update Rider</Text>

          <Formik
            initialValues={{
              fullName: riderParams.fullName,
              username: riderParams.username,
              email: riderParams.email,
              phoneNumber: riderParams.phoneNumber,
              plateNumber: riderParams.plateNumber,
              profilePhotoUrl: riderParams.profilePhotoUrl,
            }}
            validationSchema={validationSchema}
            onSubmit={handleUpdate}
          >
            {({ handleChange, handleSubmit, values, errors, touched }) => (
              <>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <ImagePickerForm field={"profilePhotoUrl"} />
                  <TouchableOpacity
                    onPress={handleAlert}
                    style={{
                      flexDirection: "row",
                      gap: 5,
                      alignItems: "center",
                    }}
                  >
                    <AntDesign name="deleteuser" size={24} color="red" />
                    <Text
                      style={{
                        color: "red",
                      }}
                    >
                      Delete Rider
                    </Text>
                  </TouchableOpacity>
                </View>
                <AppTextInput
                  secureTextEntry={false}
                  onChangeText={handleChange("fullName")}
                  value={values.fullName}
                  autoCapitalize="words"
                  placeholder="Full Name"
                  label="Full Name"
                  inputHeight={40}
                />
                {touched.fullName && errors.fullName && (
                  <InputErrorMessage error={errors.fullName} />
                )}
                <AppTextInput
                  secureTextEntry={false}
                  onChangeText={handleChange("email")}
                  value={values.email}
                  autoCapitalize="none"
                  placeholder="Email"
                  keyboardType="email-address"
                  inputHeight={40}
                  label="Email"
                  isEditable
                />
                {touched.email && errors.email && (
                  <InputErrorMessage error={errors.email} />
                )}
                <AppTextInput
                  secureTextEntry={false}
                  onChangeText={handleChange("username")}
                  value={values.username}
                  autoCapitalize="none"
                  placeholder="Username"
                  label="Username"
                  inputHeight={40}
                  isEditable
                />
                {touched.username && errors.username && (
                  <InputErrorMessage error={errors.username} />
                )}
                <AppTextInput
                  secureTextEntry={false}
                  onChangeText={handleChange("phoneNumber")}
                  value={values.phoneNumber}
                  autoCapitalize="none"
                  placeholder="Phone Number"
                  keyboardType="phone-pad"
                  inputHeight={40}
                  label="Phone Number"
                  isEditable
                />
                {touched.phoneNumber && errors.phoneNumber && (
                  <InputErrorMessage error={errors.phoneNumber} />
                )}

                <AppTextInput
                  secureTextEntry={false}
                  onChangeText={handleChange("plateNumber")}
                  value={values.plateNumber}
                  autoCapitalize="none"
                  placeholder="Plate Number"
                  inputHeight={40}
                  label={"Plate Number"}
                />
                {touched.plateNumber && errors.plateNumber && (
                  <InputErrorMessage error={errors.plateNumber} />
                )}

                <AppButton
                  btnColor="primaryColor"
                  title="update rider"
                  textColor="white"
                  onPress={handleSubmit}
                  borderRadius={"smallRadius"}
                />
              </>
            )}
          </Formik>
        </ScrollView>
      </View>
    </AppSafeAreaView>
  );
};

export default riderDetails;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: PADDING.horizontalPaddingSmall,
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
  linkContainer: {
    flexDirection: "row",
  },
  titleText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "gray",
    marginVertical: 15,
    alignSelf: "center",
  },
});
