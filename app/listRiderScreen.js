import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import {
  AppActivityIndicator,
  AppErrorMessage,
  AppSafeAreaView,
  RiderCard,
} from "../components";
import usersApi from "../api/users";
import useApi from "../hooks/useApi";
import { useNavigation, useRouter } from "expo-router";
import { useAuth } from "../auth/context";
import { COLORS } from "../constants/colors_font";

const listRiderScreen = () => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);

  const {
    data: riders,
    error,
    loading,
    requestData: loadUserRiders,
  } = useApi(usersApi.getDispatchRiders);

  useEffect(() => {
    if (navigation.isFocused()) {
      loadUserRiders();
    }
  }, [navigation.isFocused()]);
  return (
    <AppSafeAreaView>
      <AppActivityIndicator visible={loading} height="100%" />
      <View style={styles.container}>
        <AppErrorMessage error={error} visible={error} />

        <FlatList
          data={riders}
          keyExtractor={(item) => item.id.toString()}
          estimatedItemSize={200}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          vertical
          renderItem={({ item }) =>
            item.dispatch_id === user?.id && (
              <RiderCard
                fullName={`${item?.full_name.toUpperCase()}`}
                phoneNumber={item?.phone_number}
                plateNumber={item?.plate_number}
                imageUrl={item?.photo_url}
                onPress={() =>
                  navigation.navigate("riderDetails", {
                    fullName: item.full_name,
                    username: item.username,
                    email: item.email,
                    phoneNumber: item.phone_number,
                    plateNumber: item.plate_number,
                    profilePhotoUrl: item.photo_url,
                    riderId: item.id,
                  })
                }
              />
            )
          }
          refreshing={refreshing}
          onRefresh={loadUserRiders}
        />
      </View>
    </AppSafeAreaView>
  );
};

export default listRiderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  text: {
    marginVertical: 15,
    color: "gray",
    textTransform: "uppercase",
  },
});
