import { StyleSheet, SafeAreaView } from "react-native";
import React from "react";

const AppSafeAreaView = ({ children, style }) => {
  return (
    <SafeAreaView style={[styles.container, { ...style }]}>
      {children}
    </SafeAreaView>
  );
};

export default AppSafeAreaView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
