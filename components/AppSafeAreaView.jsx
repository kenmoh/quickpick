import {
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React from "react";

const AppSafeAreaView = ({ children, style }) => {
  return (
    <SafeAreaView style={[styles.container, { ...style }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : 0}
        style={{ flex: 1 }}
        // keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 0}
      >
        {children}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AppSafeAreaView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
