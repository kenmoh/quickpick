import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { useFormikContext } from "formik";

import AppErrorMessage from "./AppErrorMessage";
import AppImagePicker from "./AppImagePicker";

const FormImagePicker = ({ field }) => {
  const { setFieldValue, touched, errors, values } = useFormikContext();

  const handleAdd = (uri) => {
    setFieldValue(field, uri);
  };
  return (
    <>
      <AppImagePicker imageUri={values[field]} onChangeImage={handleAdd} />
      <AppErrorMessage error={errors[field]} visible={touched[field]} />
    </>
  );
};

export default FormImagePicker;

const styles = StyleSheet.create({});
