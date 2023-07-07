import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { Stack, useRouter } from "expo-router";

import { Formik } from "formik";
import * as Yup from "yup";

import {
  AppActivityIndicator,
  AppButton,
  AppErrorMessage,
  AppSafeAreaView,
  AppTextInput,
  InputErrorMessage,
} from "../../components";
import { PADDING } from "../../constants/sizes";
import { COLORS } from "../../constants/colors_font";

import usersApi from "../../api/users";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = Yup.object().shape({
  email: Yup.string().email().trim().required().label("Email"),
  username: Yup.string().required().label("Email"),
  phoneNumber: Yup.string()
    .required()
    .matches(phoneRegExp, "Enter a valid phone number")
    .max(11)
    .min(10)
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

  const signUpUser = async (user) => {
    setIsLoading(true);
    const result = await usersApi.addUser(user);
    setIsLoading(false);

    if (!result.ok) {
      if (result.data) setFieldExist(result.data.detail);
      else {
        setFieldExist("An unexpected error occured.");
      }
      return;
    }
    setFieldExist(false);
    router.replace("confirmAccount");
  };

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
            onSubmit={signUpUser}
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
                  marginBtm={-5}
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
                  marginBtm={-5}
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
                  placeholder="E.g 08099887766"
                  keyboardType="phone-pad"
                  marginBtm={-5}
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
                  marginBtm={-5}
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
                  marginBtm={-5}
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
                  marginBtm={-5}
                />
                <AppButton
                  btnColor="blackBackgroundColor"
                  title="Register as a dispatch"
                  textColor="white"
                  onPress={() => router.push("dispatchSignUp")}
                  borderRadius={"smallRadius"}
                />

                <View style={styles.textContainer}>
                  <View style={styles.linkContainer}>
                    <Text style={{ color: "gray", marginBottom: 30 }}>
                      Already have an account?{" "}
                    </Text>
                    <TouchableOpacity
                      onPress={() => router.replace("/app/(auth)/signin")}
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
