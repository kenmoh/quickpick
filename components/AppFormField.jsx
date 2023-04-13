import { StyleSheet, Text, View } from "react-native";

import { useFormikContext } from "formik";

import AppTextInput from "./AppTextInput";
import AppErrorMessage from "./AppErrorMessage";

const AppFormField = ({ field, ...props }) => {
  const { setFieldTouched, setFieldValue, touched, errors, values } =
    useFormikContext();
  return (
    <>
      <AppTextInput
        onChangeText={(text) => setFieldValue(field, text)}
        onBlur={() => setFieldTouched(field)}
        value={values[field]}
        {...props}
      />
      <AppErrorMessage error={errors[field]} visible={touched[field]} />
    </>
  );
};

export default AppFormField;

const styles = StyleSheet.create({});
