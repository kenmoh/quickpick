import { StyleSheet, ScrollView, View } from "react-native";
import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { showMessage } from "react-native-flash-message";
import {
  AppActivityIndicator,
  AppButton,
  AppTextInput,
  ImagePickerForm,
  InputErrorMessage,
} from "../components";
import { COLORS } from "../constants/colors_font";
import { PADDING } from "../constants/sizes";
import { useAuth } from "../auth/context";
import usersApi from "../api/users";
import { useNavigation } from "expo-router";

const validationSchema = Yup.object().shape({
  accountHolderName: Yup.string().required().label("Full Name"),
  companyRegNum: Yup.string().required().label("Company Reg. Number"),
  plateNumber: Yup.string().required().label("Plate Number"),
  location: Yup.string().required().label("Location"),
  accountNumber: Yup.string().required().label("Account Number"),
  bankName: Yup.string().required().label("Bank Name"),
  profilePhotoUrl: Yup.string().required().label("Image"),
});

const userProfile = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const companyName = user?.company_name;

  const handleUpdate = async (dispatch) => {
    setIsLoading(true);
    const result = await usersApi.updateDispatch(dispatch, companyName);
    setIsLoading(false);
    navigation.goBack();
    if (result.ok) {
      showMessage({
        message: "Profile updated successfully!",
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
    <ScrollView showsVerticalScrollIndicator={false}>
      <AppActivityIndicator visible={isLoading} height="100%" />

      <View style={styles.container}>
        <Formik
          initialValues={{
            accountHolderName: user ? user?.account_holder_name : "",
            companyRegNum: user ? user?.company_reg_number : "",
            plateNumber: user ? user?.plate_number : "",
            location: user ? user?.location : "",
            accountNumber: user ? user?.bank_account_number : "",
            bankName: user ? user?.bank_name : "",
            profilePhotoUrl: user ? user?.photo_url : "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleUpdate}
        >
          {({ handleChange, handleSubmit, values, errors, touched }) => (
            <>
              <ImagePickerForm field={"profilePhotoUrl"} />
              <AppTextInput
                name="accountHolderName"
                secureTextEntry={false}
                onChangeText={handleChange("accountHolderName")}
                value={
                  values.accountHolderName ||
                  user?.account_holder_name?.toUpperCase()
                }
                autoCapitalize="none"
                placeholder="Account Holder Name "
                label="Full Name"
                inputHeight={40}
                paddingHorizontal={1}
              />
              {touched.accountHolderName && errors.accountHolderName && (
                <InputErrorMessage error={errors.accountHolderName} />
              )}
              <AppTextInput
                name="email"
                secureTextEntry={false}
                onChangeText={handleChange("email")}
                value={values.email || user?.email?.toUpperCase()}
                autoCapitalize="none"
                placeholder="Email"
                editable={false}
                label="Email"
                inputHeight={40}
                paddingHorizontal={1}
                isEditable
              />

              <AppTextInput
                name="companyName"
                secureTextEntry={false}
                onChangeText={handleChange("companyName")}
                value={values.companyName || user?.company_name?.toUpperCase()}
                autoCapitalize="none"
                placeholder="Company Name"
                editable={false}
                label="Company Name"
                inputHeight={40}
                paddingHorizontal={1}
                isEditable
              />

              <AppTextInput
                name="companyRegNum"
                secureTextEntry={false}
                onChangeText={handleChange("companyRegNum")}
                value={values.companyRegNum || user?.company_reg_number}
                autoCapitalize="none"
                placeholder="Company Reg. Number"
                label="Company Reg. Number"
                inputHeight={40}
                paddingHorizontal={1}
              />
              {touched.companyRegNum && errors.companyRegNum && (
                <InputErrorMessage error={errors.companyRegNum} />
              )}
              <AppTextInput
                name="phoneNumber"
                secureTextEntry={false}
                onChangeText={handleChange("phoneNumber")}
                value={values.phoneNumber || user?.phone_number}
                autoCapitalize="none"
                placeholder="Phone Number"
                editable={false}
                label="Phone Number"
                inputHeight={40}
                paddingHorizontal={1}
                isEditable
              />

              <AppTextInput
                name="plateNumber"
                secureTextEntry={false}
                onChangeText={handleChange("plateNumber")}
                value={values.plateNumber || user?.plate_number}
                autoCapitalize="none"
                placeholder="Plate Number"
                label="Plate Number"
                inputHeight={40}
                paddingHorizontal={1}
              />
              {touched.plateNumber && errors.plateNumber && (
                <InputErrorMessage error={errors.plateNumber} />
              )}
              <AppTextInput
                name="location"
                secureTextEntry={false}
                onChangeText={handleChange("location")}
                value={values.location || user?.location}
                autoCapitalize="none"
                placeholder="Location"
                label="Location"
                inputHeight={40}
                paddingHorizontal={1}
              />
              {touched.location && errors.location && (
                <InputErrorMessage error={errors.location} />
              )}

              <AppTextInput
                name="bankName"
                secureTextEntry={false}
                onChangeText={handleChange("bankName")}
                value={values.bankName || user?.bank_name}
                autoCapitalize="none"
                placeholder="Bank Name"
                label="Bank Name"
                inputHeight={40}
                paddingHorizontal={1}
              />
              {touched.bankName && errors.bankName && (
                <InputErrorMessage error={errors.bankName} />
              )}
              <AppTextInput
                name="accountNumber"
                secureTextEntry={false}
                onChangeText={handleChange("accountNumber")}
                value={values.accountNumber || user?.bank_account_number}
                autoCapitalize="none"
                placeholder="Account Number"
                label="Account Number"
                inputHeight={40}
                paddingHorizontal={1}
              />
              {touched.accountNumber && errors.accountNumber && (
                <InputErrorMessage error={errors.accountNumber} />
              )}

              <AppButton
                btnColor="primaryColor"
                title="update"
                textColor="white"
                onPress={handleSubmit}
                borderRadius={"smallRadius"}
              />
            </>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};

export default userProfile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
    paddingHorizontal: PADDING.horizontalPaddingSmall,
  },
});
