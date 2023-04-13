import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { useFormikContext } from "formik";

import AppButton from "./AppButton";

const SubmitButton = ({ title, width = "largeBtnWidth" }) => {
  const { handleSubmit } = useFormikContext();
  return (
    <AppButton
      title={title}
      btnColor="primaryColor"
      textColor="white"
      borderRadius="smallRadius"
      onPress={handleSubmit}
      width={width}
    />
  );
};

export default SubmitButton;

const styles = StyleSheet.create({});
