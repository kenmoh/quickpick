import client from "./client";

const loginApi = (username, password) => {
  const data = new FormData();
  data.append("username", username.trim());
  data.append("password", password.trim());

  return client.post("/login", data);
};

export default {
  loginApi,
};
