import { StyleSheet, Text, View, ScrollView, StatusBar } from "react-native";
import React, { useContext, useState } from "react";
import { Stack, useRouter } from "expo-router";

import { Formik } from "formik";
import * as Yup from "yup";

import {
  AppActivityIndicator,
  AppButton,
  AppSafeAreaView,
  AppTextInput,
  InputErrorMessage,
} from "../components";

import { useAuth } from "../auth/context";
import authStorage from "../auth/storage";
import usersApi from "../api/users";
import jwtDecode from "jwt-decode";
import { PADDING } from "../constants/sizes";
import { COLORS } from "../constants/colors_font";
import { showMessage } from "react-native-flash-message";

const validationSchema = Yup.object().shape({
  newPassword: Yup.string().required().label("New Password"),
  oldPassword: Yup.string().required().label("Old Password"),
});
const changePassword = () => {
  const router = useRouter();
  const authContext = useAuth();

  const [loginFailed, setLoginFailed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (user_data, { resetForm }) => {
    setIsLoading(true);
    const result = await usersApi.changePassword(user_data);
    setIsLoading(false);
    resetForm();
    if (result.ok) {
      showMessage({
        message: "Password updated successfully!",
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

    if (!result.ok) return setLoginFailed(true);
    setLoginFailed(false);

    const user = jwtDecode(result.data.access_token);
    authContext.setUser(user);
    authStorage.storeToken(result.data.access_token);
  };
  return (
    <AppSafeAreaView>
      <StatusBar backgroundColor={COLORS.primaryColor} barStyle="auto" />

      <View style={styles.container}>
        <Stack.Screen options={{ title: "" }} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.titleText}>Change Password</Text>
          <Formik
            initialValues={{ oldPassword: "", newPassword: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ handleChange, handleSubmit, values, errors, touched }) => (
              <>
                <AppActivityIndicator visible={isLoading} />

                <AppTextInput
                  iconName="lock"
                  label="Old Password"
                  password={true}
                  onChangeText={handleChange("oldPassword")}
                  value={values.oldPassword}
                  autoCapitalize="none"
                  placeholder="Old Password"
                />
                {touched.oldPassword && errors.oldPassword && (
                  <InputErrorMessage error={errors.oldPassword} />
                )}

                <AppTextInput
                  iconName="lock"
                  label="New Password"
                  password={true}
                  onChangeText={handleChange("newPassword")}
                  value={values.newPassword}
                  autoCapitalize="none"
                  placeholder="New Password"
                />
                {touched.newPassword && errors.newPassword && (
                  <InputErrorMessage error={errors.newPassword} />
                )}

                <AppButton
                  btnColor="primaryColor"
                  title="Change password"
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

export default changePassword;

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
    marginVertical: 45,
    alignSelf: "center",
  },
});
