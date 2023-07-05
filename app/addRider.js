import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "expo-router";

import { Formik } from "formik";
import * as Yup from "yup";
import { showMessage } from "react-native-flash-message";

import {
  AppActivityIndicator,
  AppButton,
  AppErrorMessage,
  AppSafeAreaView,
  AppTextInput,
  ImagePickerForm,
  InputErrorMessage,
} from "../components";
import { PADDING } from "../constants/sizes";
import { COLORS } from "../constants/colors_font";
import usersApi from "../api/users";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = Yup.object().shape({
  email: Yup.string().email().trim().required().label("Email"),
  username: Yup.string().required().label("Email"),
  fullName: Yup.string().required().label("Username"),
  phoneNumber: Yup.string()
    .required()
    .matches(phoneRegExp, "Enter a valid phone number")
    .max(16)
    .min(7)
    .label("Phone Number"),
  plateNumber: Yup.string().required().label("Plate Number"),
  password: Yup.string().required().label("Password"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required()
    .label("Confirm Password"),
  profilePhotoUrl: Yup.string().required().label("Image"),
});

const addRider = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const handleAddRider = async (rider, { resetForm }) => {
    setIsLoading(true);
    const result = await usersApi.addRider(rider);
    setIsLoading(false);
    navigation.goBack();
    if (result.ok) {
      showMessage({
        message: "Rider created successfully!",
        type: "success",
      });
      return;
    }
    if (!result.ok) {
      showMessage({
        message: result.data.detail,
        type: "danger",
        style: {
          alignItems: "center",
        },
      });
      return;
    }

    resetForm();
  };

  return (
    <AppSafeAreaView>
      <AppActivityIndicator visible={isLoading} height="100%" />
      {/* <AppErrorMessage error={error} visible={error} /> */}
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.titleText}>Add Rider</Text>

          <Formik
            initialValues={{
              fullName: "",
              username: "",
              email: "",
              phoneNumber: "",
              plateNumber: "",
              profilePhotoUrl: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleAddRider}
          >
            {({ handleChange, handleSubmit, values, errors, touched }) => (
              <>
                <ImagePickerForm field={"profilePhotoUrl"} />
                <AppTextInput
                  iconName="user"
                  secureTextEntry={false}
                  onChangeText={handleChange("fullName")}
                  value={values.fullName}
                  autoCapitalize="words"
                  placeholder="Full Name"
                />
                {touched.fullName && errors.fullName && (
                  <InputErrorMessage error={errors.fullName} />
                )}
                <AppTextInput
                  iconName="mail"
                  secureTextEntry={false}
                  onChangeText={handleChange("email")}
                  value={values.email}
                  autoCapitalize="none"
                  placeholder="Email"
                  keyboardType="email-address"
                />
                {touched.email && errors.email && (
                  <InputErrorMessage error={errors.email} />
                )}
                <AppTextInput
                  iconName="user"
                  secureTextEntry={false}
                  onChangeText={handleChange("username")}
                  value={values.username}
                  autoCapitalize="none"
                  placeholder="Username"
                />
                {touched.username && errors.username && (
                  <InputErrorMessage error={errors.username} />
                )}
                <AppTextInput
                  iconName="phone"
                  secureTextEntry={false}
                  onChangeText={handleChange("phoneNumber")}
                  value={values.phoneNumber}
                  autoCapitalize="none"
                  placeholder="Phone Number"
                  keyboardType="phone-pad"
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
                />
                {touched.plateNumber && errors.plateNumber && (
                  <InputErrorMessage error={errors.plateNumber} />
                )}
                <AppTextInput
                  iconName="lock"
                  password={true}
                  onChangeText={handleChange("password")}
                  value={values.password}
                  autoCapitalize="none"
                  textContentType="password"
                  placeholder="Password"
                />
                {touched.password && errors.password && (
                  <InputErrorMessage error={errors.password} />
                )}
                <AppTextInput
                  iconName="lock"
                  password={true}
                  onChangeText={handleChange("confirmPassword")}
                  value={values.confirmPassword}
                  autoCapitalize="none"
                  textContentType="password"
                  placeholder="Confirm Password"
                />
                {touched.confirmPassword && errors.confirmPassword && (
                  <InputErrorMessage error={errors.confirmPassword} />
                )}

                <AppButton
                  btnColor="primaryColor"
                  title="add rider"
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

export default addRider;

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
