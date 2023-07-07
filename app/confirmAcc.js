import { StyleSheet, Text, View, ScrollView, StatusBar } from "react-native";
import React, { useState } from "react";
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

import { showMessage } from "react-native-flash-message";

import usersApi from "../api/users";
import { PADDING } from "../constants/sizes";
import { COLORS } from "../constants/colors_font";

const validationSchema = Yup.object().shape({
  emailCode: Yup.string().required().min(6).max(6).label("Email Code"),
  phoneCode: Yup.string().required().min(6).max(6).label("Phone Code"),
});
const confirmAcc = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirmAccount = async (user) => {
    setIsLoading(true);
    const result = await usersApi.confirmAccount(user);
    setIsLoading(false);
    router.replace("signin");
    if (result.ok) {
      showMessage({
        message: "Account confirm successfully!",
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

      <View style={styles.container}>
        <Stack.Screen options={{ title: "" }} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.titleText}>Confirm Account</Text>
          <Formik
            initialValues={{ emailCode: "", phoneCode: "" }}
            validationSchema={validationSchema}
            onSubmit={handleConfirmAccount}
          >
            {({ handleChange, handleSubmit, values, errors, touched }) => (
              <>
                <AppActivityIndicator visible={isLoading} />

                <AppTextInput
                  label="Phone Code"
                  password={true}
                  onChangeText={handleChange("phoneCode")}
                  value={values.phoneCode}
                  autoCapitalize="none"
                  placeholder="Phone Code"
                  keyboardType="phone-pad"
                />
                {touched.phoneCode && errors.phoneCode && (
                  <InputErrorMessage error={errors.phoneCode} />
                )}

                <AppTextInput
                  label="Email Code"
                  password={true}
                  onChangeText={handleChange("emailCode")}
                  value={values.emailCode}
                  autoCapitalize="none"
                  placeholder="Email Code"
                  keyboardType="phone-pad"
                />
                {touched.emailCode && errors.emailCode && (
                  <InputErrorMessage error={errors.emailCode} />
                )}

                <AppButton
                  btnColor="primaryColor"
                  title="Confirm"
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

export default confirmAcc;

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
