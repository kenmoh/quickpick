import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import * as imagePicker from "expo-image-picker";

import { AntDesign } from "@expo/vector-icons";
import { COLORS } from "../constants/colors_font";

const AppImagePicker = ({ imageUri, onChangeImage }) => {
  const handlePress = () => {
    if (!imageUri) selectImage();
    else {
      Alert.alert("Delete", "Are you sure you want to delete this image?", [
        {
          text: "Yes",
          onPress: () => onChangeImage(null),
        },
        { text: "No" },
      ]);
    }
  };

  const selectImage = async () => {
    let result = await imagePicker.launchImageLibraryAsync({
      mediaTypes: imagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      onChangeImage(result.assets[0].uri);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.imageContainer}>
        {!imageUri && (
          <AntDesign name="camera" size={50} color={COLORS.darkText} />
        )}
        {imageUri && (
          <Image
            source={{ uri: imageUri }}
            style={styles.image}
            resizeMode="cover"
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AppImagePicker;

const styles = StyleSheet.create({
  imageContainer: {
    width: 70,
    height: 70,
    backgroundColor: COLORS.lightColor,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    marginBottom: 5,
    marginTop: 15,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
