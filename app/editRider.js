import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Switch,
  Pressable,
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";

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

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = Yup.object().shape({
  email: Yup.string().email().trim().required().label("Email"),
  username: Yup.string().required().label("Username"),
  fullName: Yup.string().required().label("Username"),
  phoneNumber: Yup.string()
    .required()
    .matches(phoneRegExp, "Enter a valid phone number")
    .max(16)
    .min(7)
    .label("Phone Number"),
  bankAccountNumber: Yup.string().required().label("Bank Account Number"),
});

const editRider = () => {
  const router = useRouter();
  const [isEnabled, setIsEnabled] = useState(false);

  const handleSwitchToggle = async (value) => {
    setIsEnabled(value);
    console.log("The value is: ", value);
  };
  return (
    <AppSafeAreaView>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.titleText}>Update Rider</Text>
          <Formik
            initialValues={{
              fullName: "",
              username: "",
              email: "",
              phoneNumber: "",
              bankAccountNumber: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => console.log(values)}
          >
            {({ handleChange, handleSubmit, values, errors, touched }) => (
              <>
                <AppTextInput
                  secureTextEntry={false}
                  onChangeText={handleChange("fullName")}
                  value={values.fullName}
                  autoCapitalize="words"
                  placeholder="Full Name"
                />
                {touched.fullName && errors.fullName && (
                  <InputErrorMessage error={errors.fullName} />
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
                  onChangeText={handleChange("bankAccountNumber")}
                  value={values.bankAccountNumber}
                  placeholder="Bank Account Number"
                  keyboardType="phone-pad"
                />
                {touched.bankAccountNumber && errors.bankAccountNumber && (
                  <InputErrorMessage error={errors.bankAccountNumber} />
                )}

                <AppButton
                  btnColor="primaryColor"
                  title="update rider"
                  textColor="white"
                  onPress={handleSubmit}
                  borderRadius={"smallRadius"}
                />
              </>
            )}
          </Formik>
        </ScrollView>
        <View style={styles.suspend}>
          <Text style={{ textTransform: "uppercase", color: "grey" }}>
            Suspend Rider
          </Text>
          <Pressable onPress={() => handleSwitchToggle(!isEnabled)}>
            <Switch
              trackColor={{
                false: COLORS.inActivetrackColor,
                true: COLORS.activeTrackColor,
              }}
              thumbColor={isEnabled ? COLORS.primaryColor : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={handleSwitchToggle}
              value={isEnabled}
            />
          </Pressable>
        </View>
      </View>
    </AppSafeAreaView>
  );
};

export default editRider;

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
