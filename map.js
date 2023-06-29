// import React, { useState, useEffect } from 'react';
// import { View, Button, TextInput, StyleSheet } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';
// import MapboxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';
// import { useDebouncedCallback } from 'use-debounce';

// const geocodingClient = MapboxGeocoding({ accessToken: 'YOUR_MAPBOX_ACCESS_TOKEN' });

// const MapScreen = ({ navigation }) => {
//   const [startPoint, setStartPoint] = useState(null);
//   const [endPoint, setEndPoint] = useState(null);
//   const [startAddress, setStartAddress] = useState('');
//   const [endAddress, setEndAddress] = useState('');
//   const [startSuggestions, setStartSuggestions] = useState([]);
//   const [endSuggestions, setEndSuggestions] = useState([]);

//   // Use debounce to reduce the frequency of API requests while the user is typing
//   const debouncedStartSearch = useDebouncedCallback((text) => {
//     if (text) {
//       geocodingClient.forwardGeocode({
//         query: text,
//         countries: ['us'], // Limit results to the United States
//         types: ['address'], // Only return addresses
//       })
//         .send()
//         .then((response) => {
//           setStartSuggestions(response.body.features);
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//     } else {
//       setStartSuggestions([]);
//     }
//   }, 300);

//   const debouncedEndSearch = useDebouncedCallback((text) => {
//     if (text) {
//       geocodingClient.forwardGeocode({
//         query: text,
//         countries: ['us'], // Limit results to the United States
//         types: ['address'], // Only return addresses
//       })
//         .send()
//         .then((response) => {
//           setEndSuggestions(response.body.features);
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//     } else {
//       setEndSuggestions([]);
//     }
//   }, 300);

//   const handleStartSelect = (feature) => {
//     setStartAddress(feature.place_name);
//     setStartPoint(feature.center);
//     setStartSuggestions([]);
//   };

//   const handleEndSelect = (feature) => {
//     setEndAddress(feature.place_name);
//     setEndPoint(feature.center);
//     setEndSuggestions([]);
//   };

//   const handleCalculatePress = () => {
//     // Calculate travel times and distances using Mapbox Directions API
//     // ...
//   };

//   useEffect(() => {
//     if (!startAddress) {
//       setStartSuggestions([]);
//     }
//     if (!endAddress) {
//       setEndSuggestions([]);
//     }
//   }, [startAddress, endAddress]);

//   return (
//     <View style={styles.container}>
//       <MapView style={styles.map}>
//         {startPoint && <Marker coordinate={startPoint} />}
//         {endPoint && <Marker coordinate={endPoint} />}
//       </MapView>
//       <View style={styles.inputs}>
//         <TextInput
//           placeholder="Start Address"
//           value={startAddress}
//           onChangeText={(text) => {
//             setStartAddress(text);
//             debouncedStartSearch(text);
//           }}
//           style={styles.input}
//         />
//         <TextInput
//           placeholder="End Address"
//           value={endAddress}
//           onChangeText={(text) => {
//             setEndAddress(text);
//             debouncedEndSearch(text);

const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const arr3 = [...arr1, ...arr2];

let name = "ken";

console.log(arr3);
