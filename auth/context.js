import React from "react";
import { useRouter, useSegments } from "expo-router";
import * as SecureStore from "expo-secure-store";
// Storing a value
const storeValue = async (key = "alreadyLaunch", value = "") => {
  await SecureStore.setItemAsync(key, value);
};

// Example usage
// storeValue();

const AuthContext = React.createContext();
export const locationContext = React.createContext();

export default AuthContext;

// This hook is used to access the user info.
export function useAuth() {
  return React.useContext(AuthContext);
}
// This hook is used to access the order origin and destination.
export function useOriginDestination() {
  return React.useContext(locationContext);
}

// This hook will protect the route access based on user authentication.
function useProtectedRoute(user) {
  const [isFirstLaunch, setIsFirstLuanch] = React.useState(null);
  const segments = useSegments();
  const router = useRouter();

  // Retrieving a value
  const getValue = async () => {
    const value = await SecureStore.getItemAsync("alreadyLaunch");
    if (value === "" || null || undefined) {
      storeValue("alreadyLaunch", "true");
      setIsFirstLuanch(true);
    } else {
      setIsFirstLuanch(false);
    }
  };

  React.useEffect(() => {
    getValue();

    const inAuthGroup = segments[0] === "(auth)";

    // If isFirstLaunch, display onboarding
    if (isFirstLaunch && !user && !inAuthGroup) {
      router.replace("onboarding");
    } else if (
      // If the user is not signed in and the initial segment is not anything in the auth group.
      !user &&
      !inAuthGroup
    ) {
      // Redirect to the sign-in screen.
      router.replace("signin");
    } else if (user && inAuthGroup) {
      // Redirect away from the sign-in screen.
      router.replace("/");
      // setIsFirstLunch(true)
    }
  }, [user, segments, isFirstLaunch]);
}

export function AuthProvider({ children }) {
  const [user, setUser] = React.useState(null);

  useProtectedRoute(user);

  return (
    <AuthContext.Provider
      value={{
        signIn: () => setUser({}),
        signOut: () => setUser(null),
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export function LocationProvider({ children }) {
  const [origin, setOrigin] = React.useState(null);
  const [destination, setDestination] = React.useState(null);

  return (
    <locationContext.Provider
      value={{
        origin,
        destination,
        setOrigin,
        setDestination,
      }}
    >
      {children}
    </locationContext.Provider>
  );
}
