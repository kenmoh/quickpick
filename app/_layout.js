import { Stack } from "expo-router";
import { COLORS } from "../constants/colors_font";
import { AuthProvider, LocationProvider } from "../auth/context";

export default () => (
  <>
    <AuthProvider>
      <LocationProvider>
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: COLORS.primaryColor,
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 22,
            },
            headerShadowVisible: false,
          }}
        >
          <Stack.Screen
            name="(auth)"
            options={{
              title: "",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="main"
            options={{
              title: "",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="index"
            options={{
              title: "",
            }}
          />
          <Stack.Screen
            name="dispatchSignUp"
            options={{
              title: "",
            }}
          />

          <Stack.Screen
            name="orderDetails"
            options={{
              title: "",
              headerTransparent: true,
              headerTintColor: COLORS.white,
              headerStyle: {
                backgroundColor: null,
              },
            }}
          />
          <Stack.Screen
            name="addRider"
            options={{
              title: "",
            }}
          />
          <Stack.Screen
            name="editRider"
            options={{
              title: "",
            }}
          />
          <Stack.Screen
            name="addOrder"
            options={{
              title: "",
              headerTransparent: true,
              headerTintColor: COLORS.white,
              headerStyle: {
                backgroundColor: null,
              },
            }}
          />
          <Stack.Screen
            name="pickLocations"
            options={{
              title: "",
            }}
          />
          <Stack.Screen
            name="updateVendorProfile"
            options={{
              title: "",
            }}
          />
          <Stack.Screen
            name="paymentUrl"
            options={{
              title: "",
            }}
          />
          <Stack.Screen
            name="listRiderScreen"
            options={{
              title: "My Rider(s)",
            }}
          />
        </Stack>
      </LocationProvider>
    </AuthProvider>
  </>
);
