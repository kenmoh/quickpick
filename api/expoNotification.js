import client from "./client";

const register_notification = (pushToken) => {
  client.patch("/users/notification-token", {
    user_notification_token: pushToken,
  });
};

export default {
  register_notification,
};
