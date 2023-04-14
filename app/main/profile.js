import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

import { useRouter } from "expo-router";

import { AppSafeAreaView } from "../../components";
import { COLORS } from "../../constants/colors_font";
import { PADDING } from "../../constants/sizes";
import { useAuth } from "../../auth/context";

const profile = () => {
  const router = useRouter();
  const { signOut } = useAuth();
  const handleDeleteAccount = () => {
    console.log("Account Deleted!!!");
  };
  return (
    <AppSafeAreaView>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Text>profile</Text>
          <Text>profile</Text>
        </View>
        <View style={styles.btmContainer}>
          <TouchableOpacity onPress={signOut}>
            <Text style={styles.logout}>Logout</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDeleteAccount}>
            <Text style={styles.delete}>Dele My Accout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </AppSafeAreaView>
  );
};

export default profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: PADDING.horizontalPaddingSmall,
  },

  topContainer: {},
  btmContainer: {
    alignSelf: "flex-start",
    flexDirection: "row",
    columnGap: 50,
    marginVertical: 15,
  },
  logout: {
    color: COLORS.darkText,
    fontSize: 14,
  },
  delete: {
    color: COLORS.errorText,
    fontSize: 14,
  },
});
