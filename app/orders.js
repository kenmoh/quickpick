// import React, { useState, useEffect } from "react";
// import { StyleSheet, FlatList, View, StatusBar } from "react-native";

// import {
//   AppSafeAreaView,
//   AppTextInput,
//   Card,
//   //   Error,
//   //   ActivityIndicator,
// } from "../components";

// // import listingsApi from "../api/listings";
// // import useApi from "../../hooks/useApi";
// import { COLORS } from "../constants/colors_font";
// import ORDERS from "../constants/orders";

// const orders = () => {
//   //   const [refreshing, setRefreshing] = useState(false);

//   //   const {
//   //     data: listings,
//   //     error,
//   //     loading,
//   //     requestData: loadListings,
//   //   } = useApi(listingsApi.getListings);

//   //   useEffect(() => {
//   //     loadListings();
//   //   }, [route]);

//   return (
//     <>
//       {/* <ActivityIndicator visible={loading} /> */}
//       <AppSafeAreaView>
//         <StatusBar
//           barStyle="light-content"
//           backgroundColor={COLORS.secondaryColor}
//         />
//         <View style={styles.search}>
//           <AppTextInput iconName="search1" placeholder="Search Location" />
//         </View>
//         <View style={styles.listContainer}>
//           {error && <Error loadListings={loadListings} />}
//           <FlatList
//             data={listings}
//             keyExtractor={(item) => item.id.toString()}
//             estimatedItemSize={200}
//             showsHorizontalScrollIndicator={false}
//             showsVerticalScrollIndicator={false}
//             vertical
//             renderItem={({ item }) =>
//               !item.is_picked_up && (
//                 <Card
//                   order={item}
//                   onPress={() => navigation.navigate("Details", item)}
//                 />
//               )
//             }
//             refreshing={refreshing}
//             // TODO: function to call new data from backend
//             onRefresh={() => {}}
//           />
//         </View>
//       </AppSafeAreaView>
//     </>
//   );
// };

// export default orders;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.white,
//   },

//   listContainer: {
//     flex: 1,
//     backgroundColor: COLORS.appBackgroundColor,
//   },
//   // TODO rmove search
//   search: {
//     padding: 10,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: COLORS.appBackgroundColor,
//   },
// });
