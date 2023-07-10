import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { showMessage } from "react-native-flash-message";

import { COLORS } from "../constants/colors_font";
import {
  AppActivityIndicator,
  AppButton,
  AppTextInput,
  InputErrorMessage,
} from "../components";
import { PADDING } from "../constants/sizes";
import { useAuth } from "../auth/context";
import { useNavigation, useSearchParams } from "expo-router";
import ordersApi from "../api/orders";

const validationSchema = Yup.object().shape({
  message: Yup.string().required().label("Message"),
  subject: Yup.string().required().label("Subject"),
});

const reportMessageModal = () => {
  const { user } = useAuth();
  const params = useSearchParams();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  const handleRaiseDispute = async (msg, { resetForm }) => {
    setIsLoading(true);
    const result = await ordersApi.raiseDispute(msg, params.id);
    setIsLoading(false);

    navigation.goBack();
    resetForm();
    if (result.ok) {
      showMessage({
        message: "Dispute raised successfully",
        type: "success",
      });
      return;
    }
    if (!result.ok) {
      showMessage({
        message: result.data.detail,
        type: "danger",
      });
      return;
    }
  };
  return (
    <View style={styles.container}>
      <AppActivityIndicator visible={isLoading} height="100%" />
      <Formik
        initialValues={{ message: "", subject: "" }}
        validationSchema={validationSchema}
        onSubmit={handleRaiseDispute}
      >
        {({ handleChange, handleSubmit, values, errors, touched }) => (
          <>
            <Text style={styles.titleText}>Raise Dispute</Text>
            <AppTextInput
              label={"Subject"}
              secureTextEntry={false}
              onChangeText={handleChange("subject")}
              value={values.subject}
              autoCapitalize="sentences"
              placeholder="Subject"
            />
            {touched.subject && errors.subject && (
              <InputErrorMessage error={errors.subject} />
            )}
            <AppTextInput
              label={"Message"}
              secureTextEntry={false}
              onChangeText={handleChange("message")}
              value={values.message}
              autoCapitalize="sentences"
              placeholder="Message"
              isMultiline={true}
            />
            {touched.message && errors.message && (
              <InputErrorMessage error={errors.message} />
            )}
            <AppButton
              title="send"
              onPress={handleSubmit}
              btnColor="primaryColor"
              textColor="white"
              borderRadius={"mediumRadius"}
            />
          </>
        )}
      </Formik>
    </View>
  );
};

export default reportMessageModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: PADDING.horizontalPaddingLarge,
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "gray",
    marginVertical: 45,
    alignSelf: "center",
  },
});
