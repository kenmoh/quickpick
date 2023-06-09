import { StyleSheet, Text, View, ScrollView, StatusBar } from "react-native";
import React, { useState } from "react";
import { Stack, useRouter } from "expo-router";
import { showMessage } from "react-native-flash-message";

import usersApi from "../../api/users";

import { Formik } from "formik";
import * as Yup from "yup";
import {
  AppActivityIndicator,
  AppButton,
  AppSafeAreaView,
  AppTextInput,
  InputErrorMessage,
} from "../../components";
import { PADDING } from "../../constants/sizes";
import { COLORS } from "../../constants/colors_font";

const validationSchema = Yup.object().shape({
  email: Yup.string().email().trim().required().label("Email"),
});
const forgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSendPasswordLink = async (user_email, { resetForm }) => {
    setIsLoading(true);
    const result = await usersApi.sendPasswordResetLink(user_email);
    setIsLoading(false);
    resetForm();
    if (result.ok) {
      showMessage({
        message: "Please check your email for the password reset link!",
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
  };
  return (
    <AppSafeAreaView>
      <StatusBar backgroundColor={COLORS.primaryColor} barStyle="auto" />
      <AppActivityIndicator visible={isLoading} height="100%" />
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.titleText}>Recover Password</Text>
          <Formik
            initialValues={{ email: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSendPasswordLink}
          >
            {({ handleChange, handleSubmit, values, errors, touched }) => (
              <>
                <AppTextInput
                  iconName="mail"
                  secureTextEntry={false}
                  onChangeText={handleChange("email")}
                  value={values.email}
                  autoCapitalize="none"
                  placeholder="Email"
                />
                {touched.email && errors.email && (
                  <InputErrorMessage error={errors.email} />
                )}

                <AppButton
                  btnColor="primaryColor"
                  title="Send"
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

export default forgotPassword;

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
    fontSize: 16,
    fontWeight: "bold",
    color: "gray",
    marginVertical: 45,
    alignSelf: "center",
  },
});
