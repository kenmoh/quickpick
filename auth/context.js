import React from "react";
import { useRouter, useSegments } from "expo-router";

const AuthContext = React.createContext();
export const locationContext = React.createContext();

export default AuthContext;

// This hook can be used to access the user info.
export function useAuth() {
  return React.useContext(AuthContext);
}
// This hook can be used to access the order origin and destination.
export function useOriginDestination() {
  return React.useContext(AuthContext);
}

// This hook will protect the route access based on user authentication.
function useProtectedRoute(user) {
  const segments = useSegments();
  const router = useRouter();

  React.useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";

    if (
      // If the user is not signed in and the initial segment is not anything in the auth group.
      !user &&
      !inAuthGroup
    ) {
      // Redirect to the sign-in page.
      router.replace("/signin");
    } else if (user && inAuthGroup) {
      // Redirect away from the sign-in page.
      router.replace("/");
    }
  }, [user, segments]);
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
  const [origin, seOrigin] = React.useState(null);
  const [destination, setDestination] = React.useState(null);

  return (
    <locationContext.Provider
      value={{
        origin,
        destination,
        seOrigin,
        setDestination,
      }}
    >
      {children}
    </locationContext.Provider>
  );
}
