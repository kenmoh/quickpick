import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { Link, useRouter } from "expo-router";

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

const validationSchema = Yup.object().shape({
  username: Yup.string().email().trim().required().label("Email"),
  password: Yup.string().required().label("Password"),
});
const signin = () => {
  const router = useRouter();
  return (
    <AppSafeAreaView>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.titleText}>Sign In</Text>
          <Formik
            initialValues={{ username: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={(values) => console.log(values)}
          >
            {({ handleChange, handleSubmit, values, errors, touched }) => (
              <>
                <AppTextInput
                  iconName="mail"
                  secureTextEntry={false}
                  onChangeText={handleChange("username")}
                  value={values.username}
                  autoCapitalize="none"
                  placeholder="Email"
                />
                {touched.username && errors.username && (
                  <InputErrorMessage error={errors.username} />
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
                <TouchableOpacity
                  onPress={() => router.push("/forgotPassword")}
                >
                  <Text
                    style={{
                      color: COLORS.primaryColor,
                      marginTop: 5,
                      alignSelf: "flex-end",
                    }}
                  >
                    Forgot Password
                  </Text>
                </TouchableOpacity>
                <AppButton
                  btnColor="primaryColor"
                  title="Login"
                  textColor="white"
                  onPress={handleSubmit}
                  borderRadius={"smallRadius"}
                />
                <View style={styles.textContainer}>
                  <Text
                    style={{
                      fontWeight: "bold",
                      color: "gray",
                      fontSize: 18,
                      marginVertical: 10,
                    }}
                  >
                    OR
                  </Text>
                  <View style={styles.linkContainer}>
                    <Text style={{ color: "gray" }}>Register as a </Text>
                    <TouchableOpacity onPress={() => router.push("signup")}>
                      <Text style={styles.text}>Vendor</Text>
                    </TouchableOpacity>
                    <Text style={{ marginHorizontal: 5, color: "gray" }}>
                      or
                    </Text>
                    <TouchableOpacity
                      onPress={() => router.push("dispatchSignUp")}
                    >
                      <Text style={styles.text}>Dispatch</Text>
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

export default signin;

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
    marginVertical: 45,
    alignSelf: "center",
  },
});
