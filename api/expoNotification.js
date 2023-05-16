import client from "./client";

const register_notification = (pushToken) => {
  client.patch("/notification", { token: pushToken });
};

export default {
  register_notification,
};
