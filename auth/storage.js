import * as SecureStore from "expo-secure-store";
import jwtDecode from "jwt-decode";

// TODO Delete log before build

const key = "authToken";
const storeToken = async (authToken) => {
  try {
    await SecureStore.setItemAsync(key, authToken);
  } catch (error) {
    console.log("Error storing auth token", error);
  }
};

const getUser = async () => {
  const token = await getToken();
  return token ? jwtDecode(token) : null;
};

const getToken = async () => {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    console.log("Could not get auth token", error);
  }
};

const removeToken = async () => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.log("Could not delete auth token", error);
  }
};

export default {
  getToken,
  getUser,
  removeToken,
  storeToken,
};
