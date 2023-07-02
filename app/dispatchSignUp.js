import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";

import { Formik } from "formik";
import * as Yup from "yup";

import {
  AppActivityIndicator,
  AppButton,
  AppErrorMessage,
  AppSafeAreaView,
  AppTextInput,
  InputErrorMessage,
} from "../components";
import { PADDING } from "../constants/sizes";
import { COLORS } from "../constants/colors_font";
import usersApi from "../api/users";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = Yup.object().shape({
  email: Yup.string().email().trim().required().label("Email"),
  companyName: Yup.string().required().label("Company Name"),
  companyRegNum: Yup.string(),
  phoneNumber: Yup.string()
    .required()
    .matches(phoneRegExp, "Enter a valid phone number")
    .max(16)
    .min(7)
    .label("Phone Number"),
  password: Yup.string().required().label("Password"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required()
    .label("Confirm Password"),
});

const signup = () => {
  const router = useRouter();
  const [fieldExist, setFieldExist] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const signUpDispatch = async (dispatch) => {
    setIsLoading(true);
    const result = await usersApi.addDispatch(dispatch);
    setIsLoading(false);

    if (!result.ok) {
      if (result.data) setFieldExist(result.data.detail);
      else {
        setFieldExist("An unexpected error occured.");
      }
      return;
    }
    setFieldExist(false);
    router.replace("signin");
  };
  return (
    <AppSafeAreaView>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.titleText}>Sign Up</Text>
          <Formik
            initialValues={{
              email: "",
              companyName: "",
              companyRegNum: "",
              phoneNumber: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={validationSchema}
            onSubmit={signUpDispatch}
          >
            {({ handleChange, handleSubmit, values, errors, touched }) => (
              <>
                <AppActivityIndicator visible={isLoading} />
                <AppErrorMessage error={fieldExist} visible={fieldExist} />
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
                  secureTextEntry={false}
                  onChangeText={handleChange("companyName")}
                  value={values.companyName}
                  autoCapitalize="none"
                  placeholder="Company Name"
                />
                {touched.companyName && errors.companyName && (
                  <InputErrorMessage error={errors.companyName} />
                )}
                <AppTextInput
                  iconName="trademark"
                  secureTextEntry={false}
                  onChangeText={handleChange("companyRegNum")}
                  value={values.companyRegNum}
                  autoCapitalize="none"
                  placeholder="Company Reg. Number"
                />
                {touched.companyRegNum && errors.companyRegNum && (
                  <InputErrorMessage error={errors.companyRegNum} />
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
                  title="sign up"
                  textColor="white"
                  onPress={handleSubmit}
                  borderRadius={"smallRadius"}
                />
                <AppButton
                  btnColor="blackBackgroundColor"
                  title="Register as a vendor"
                  textColor="white"
                  onPress={() => router.push("/signup")}
                  borderRadius={"smallRadius"}
                />
                <View style={styles.textContainer}>
                  <View style={styles.linkContainer}>
                    <Text style={{ color: "gray" }}>
                      Already have an account?{" "}
                    </Text>
                    <TouchableOpacity
                      onPress={() => router.push("auth/signin")}
                    >
                      <Text style={styles.text}>Login</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            )}
          </Formik>
        </ScrollView>
      </View>
    </AppSafeAreaView>
  );
};

export default signup;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: PADDING.verticalPaddingSmall,
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
