import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from "react-native";
import React, { useContext, useState } from "react";
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
import { useAuth } from "../../auth/context";
import authStorage from "../../auth/storage";
import authApi from "../../api/auth";
import jwtDecode from "jwt-decode";
import { showMessage } from "react-native-flash-message";

const validationSchema = Yup.object().shape({
  username: Yup.string().email().trim().required().label("Email"),
  password: Yup.string().required().label("Password"),
});
const signin = () => {
  const router = useRouter();
  const authContext = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async ({ username, password }) => {
    setIsLoading(true);
    const result = await authApi.loginApi(username, password);

    setIsLoading(false);

    if (!result.ok) {
      showMessage({
        message: result.data.detail,
        type: "danger",
      });
      return;
    }

    const user = jwtDecode(result.data.access_token);
    authContext.setUser(user);
    authStorage.storeToken(result.data.access_token);

    if (result.ok) {
      showMessage({
        message: "Login successfully!",
        type: "success",
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
          <Text style={styles.titleText}>Sign In</Text>
          <Formik
            initialValues={{ username: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ handleChange, handleSubmit, values, errors, touched }) => (
              <>
                <AppActivityIndicator visible={isLoading} />
                {/* <AppErrorMessage
                  error="Invalid email and/or password!"
                  visible={loginFailed}
                /> */}
                <AppTextInput
                  iconName="mail"
                  label="Email"
                  secureTextEntry={false}
                  onChangeText={handleChange("username")}
                  value={values.username}
                  autoCapitalize="none"
                  placeholder="Email"
                  keyboardType="email-address"
                  marginBtm={1}
                />
                {touched.username && errors.username && (
                  <InputErrorMessage error={errors.username} />
                )}
                <AppTextInput
                  iconName="lock"
                  label="Password"
                  password={true}
                  onChangeText={handleChange("password")}
                  value={values.password}
                  autoCapitalize="none"
                  textContentType="password"
                  placeholder="Password"
                  marginBtm={1}
                />
                {touched.password && errors.password && (
                  <InputErrorMessage error={errors.password} />
                )}
                <TouchableOpacity onPress={() => router.push("forgotPassword")}>
                  <Text
                    style={{
                      color: COLORS.primaryColor,
                      marginTop: 20,
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
