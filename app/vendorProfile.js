import { StyleSheet, ScrollView, View, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";
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
  firstName: Yup.string(),
  lastName: Yup.string(),
  location: Yup.string().required().label("Location"),
  profilePhotoUrl: Yup.string(),
});

const vendorProfile = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const navigation = useNavigation();

  const username = user?.username;

  const handleUpdate = async (vendor) => {
    setIsLoading(true);
    const result = await usersApi.updateVendor(vendor, username);
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

  const onRefresh = async () => {
    setRefreshing(true);
    user;
    setRefreshing(false);
  };

  useEffect(() => {
    onRefresh();
  }, [user]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <AppActivityIndicator visible={isLoading} height="100%" />

      <View style={styles.container}>
        <Formik
          initialValues={{
            firstName: "" || user?.first_name,
            lastName: "" || user?.last_name,
            location: "" || user?.location,
            profilePhotoUrl: "" || user?.photo_url,
          }}
          validationSchema={validationSchema}
          onSubmit={handleUpdate}
        >
          {({ handleChange, handleSubmit, values, errors, touched }) => (
            <>
              <ImagePickerForm field={"profilePhotoUrl"} />

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
                name="username"
                secureTextEntry={false}
                onChangeText={handleChange("username")}
                value={values.username || user?.username?.toUpperCase()}
                autoCapitalize="none"
                placeholder="Username"
                editable={false}
                label="Username"
                inputHeight={40}
                paddingHorizontal={1}
                isEditable
              />

              <AppTextInput
                name="firstName"
                secureTextEntry={false}
                onChangeText={handleChange("firstName")}
                value={values.firstName || user?.first_name}
                autoCapitalize="none"
                placeholder="First Name"
                label="First Name"
                inputHeight={40}
                paddingHorizontal={1}
              />
              {touched.firstName && errors.firstName && (
                <InputErrorMessage error={errors.firstName} />
              )}
              <AppTextInput
                name="lastName"
                secureTextEntry={false}
                onChangeText={handleChange("lastName")}
                value={values.lastName || user?.last_name}
                autoCapitalize="none"
                placeholder="Last Name"
                label="Last Name"
                inputHeight={40}
                paddingHorizontal={1}
              />
              {touched.lastName && errors.lastName && (
                <InputErrorMessage error={errors.lastName} />
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

export default vendorProfile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
    paddingHorizontal: PADDING.horizontalPaddingSmall,
  },
});
