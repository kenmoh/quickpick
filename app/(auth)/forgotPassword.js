import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import { Stack, useRouter } from "expo-router";

import { Formik } from "formik";
import * as Yup from "yup";
import {
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
  return (
    <AppSafeAreaView>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.titleText}>Recover Password</Text>
          <Formik
            initialValues={{ email: "" }}
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
    fontSize: 16,
    fontWeight: "bold",
    color: "gray",
    marginVertical: 45,
    alignSelf: "center",
  },
});
