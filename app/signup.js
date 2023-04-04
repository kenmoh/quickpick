import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";

import { Formik } from "formik";
import * as Yup from "yup";

import {
  AppButton,
  AppSafeAreaView,
  AppTextInput,
  InputErrorMessage,
} from "../components";
import { PADDING } from "../constants/sizes";
import { COLORS } from "../constants/colors_font";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = Yup.object().shape({
  email: Yup.string().email().trim().required().label("Email"),
  username: Yup.string().required().label("Email"),
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
  return (
    <AppSafeAreaView>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.titleText}>Sign Up</Text>
          <Formik
            initialValues={{
              username: "",
              email: "",
              phoneNumber: "",
              confirmPassword: "",
              password: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => console.log(values)}
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

                <AppButton
                  btnColor="primaryColor"
                  title="Login"
                  textColor="white"
                  onPress={handleSubmit}
                  borderRadius={"smallRadius"}
                />
                <AppButton
                  btnColor="blackBackgroundColor"
                  title="Register as a dispatch"
                  textColor="white"
                  onPress={() => router.push("/dispatchSignUp")}
                  borderRadius={"smallRadius"}
                />

                <View style={styles.textContainer}>
                  <View style={styles.linkContainer}>
                    <Text style={{ color: "gray" }}>
                      Already have an account?{" "}
                    </Text>
                    <TouchableOpacity onPress={() => router.push("/signin")}>
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
