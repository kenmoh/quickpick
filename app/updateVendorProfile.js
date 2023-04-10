import { StyleSheet, Text, View, ScrollView } from "react-native";

import { useRouter } from "expo-router";

import { Formik } from "formik";
import * as Yup from "yup";

import {
  AppButton,
  AppSafeAreaView,
  AppTextInput,
  ImagePickerForm,
  InputErrorMessage,
  RiderCard,
} from "../components";
import { PADDING } from "../constants/sizes";
import { COLORS } from "../constants/colors_font";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = Yup.object().shape({
  email: Yup.string().email().trim().required().label("Email"),
  username: Yup.string().required().label("Username"),
  firstName: Yup.string().required().label("First Name"),
  lastName: Yup.string().required().label("Last Name"),
  phoneNumber: Yup.string()
    .required()
    .matches(phoneRegExp, "Enter a valid phone number")
    .max(16)
    .min(7)
    .label("Phone Number"),
  location: Yup.string().required().label("Location"),
  profileImage: Yup.string().required().label("Profile Image"),
});

const updateVendorProfile = () => {
  const router = useRouter();

  return (
    <AppSafeAreaView>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.titleText}>Update Profile</Text>
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              username: "",
              email: "",
              phoneNumber: "",
              location: "",
              profileImage: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => console.log(values)}
          >
            {({ handleChange, handleSubmit, values, errors, touched }) => (
              <>
                <ImagePickerForm field={"profileImage"} />
                <AppTextInput
                  secureTextEntry={false}
                  onChangeText={handleChange("firstName")}
                  value={values.firstName}
                  autoCapitalize="words"
                  placeholder="First Name"
                />
                {touched.firstName && errors.firstName && (
                  <InputErrorMessage error={errors.firstName} />
                )}
                <AppTextInput
                  secureTextEntry={false}
                  onChangeText={handleChange("lastName")}
                  value={values.lastName}
                  autoCapitalize="words"
                  placeholder="Last Name"
                />
                {touched.lastName && errors.lastName && (
                  <InputErrorMessage error={errors.lastName} />
                )}
                <AppTextInput
                  secureTextEntry={false}
                  onChangeText={handleChange("email")}
                  value={values.email}
                  autoCapitalize="none"
                  placeholder="Email"
                  keyboardType="email-address"
                />
                {touched.email && errors.email && (
                  <InputErrorMessage error={errors.email} />
                )}
                <AppTextInput
                  secureTextEntry={false}
                  onChangeText={handleChange("username")}
                  value={values.username}
                  autoCapitalize="none"
                  placeholder="Username"
                />
                {touched.username && errors.username && (
                  <InputErrorMessage error={errors.username} />
                )}
                <AppTextInput
                  secureTextEntry={false}
                  onChangeText={handleChange("phoneNumber")}
                  value={values.phoneNumber}
                  autoCapitalize="none"
                  placeholder="Phone Number"
                  keyboardType="phone-pad"
                />
                {touched.phoneNumber && errors.phoneNumber && (
                  <InputErrorMessage error={errors.phoneNumber} />
                )}
                <AppTextInput
                  secureTextEntry={false}
                  onChangeText={handleChange("location")}
                  value={values.location}
                  placeholder="Location"
                />
                {touched.location && errors.location && (
                  <InputErrorMessage error={errors.location} />
                )}

                <AppButton
                  btnColor="primaryColor"
                  title="update profile"
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

export default updateVendorProfile;

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
    marginVertical: 15,
    alignSelf: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
    marginVertical: 10,
  },
  suspend: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
