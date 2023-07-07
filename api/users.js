import client from "./client";

// TODO Update user

const dispatchEndpoint = "/users/register-dispatch";
const riderEndpoint = "/users/register-rider";
const userEndpoint = "/users/register";
const user = "/users";
const passwordResetEndPoint = "/password/recover";
const changePasswordEndPoint = "/password/change-password";

const getDispatchRiders = () => client.get(`${user}/dispatcher-riders`);
const getOneUserById = (userId) => client.get(`${user}/${userId}`);
const dispatchDeleteRider = (riderId) =>
  client.delete(`${user}/${riderId}/delete-rider`);

const sendPasswordResetLink = (user_email) => {
  const data = new FormData();
  data.append("email", user_email.email.toLowerCase().trim());

  return client.post(passwordResetEndPoint, data);
};

const changePassword = (user_data) => {
  const data = new FormData();
  data.append("old_password", user_data.oldPassword);
  data.append("new_password", user_data.newPassword);

  return client.put(changePasswordEndPoint, data);
};

const addUser = (user) => {
  const data = new FormData();
  data.append("email", user.email.toLowerCase().trim());
  data.append("username", user.username);
  data.append("phone_number", user.phoneNumber);
  data.append("password", user.password);

  return client.post(userEndpoint, data);
};

const addDispatch = (dispatch) => {
  const data = new FormData();
  data.append("email", dispatch.email.toLowerCase().trim());
  data.append("phone_number", dispatch.phoneNumber);
  data.append("company_name", dispatch.companyName);
  data.append("company_reg_number", dispatch.companyRegNum);
  data.append("password", dispatch.password);

  return client.post(dispatchEndpoint, data);
};

const updateDispatch = (dispatch, companyName) => {
  const data = new FormData();

  data.append("location", dispatch.location);
  data.append("plate_number", dispatch.plateNumber);
  data.append("company_reg_number", dispatch.companyRegNum);
  data.append("bank_name", dispatch.bankName);
  data.append("bank_account_number", dispatch.accountNumber);
  data.append("account_holder_name", dispatch.accountHolderName);
  data.append("image", {
    type: "image/jpeg",
    uri: dispatch.profilePhotoUrl,
    name: dispatch.profilePhotoUrl.split("/").slice(-1)[0],
  });

  return client.patch(`${user}/dispatchers/${companyName}`, data);
};

const updateVendor = (vendor, username) => {
  const data = new FormData();

  data.append("location", vendor.location);
  data.append("first_name", vendor.firstName);
  data.append("last_name", vendor.lastName);
  data.append("image", {
    type: "image/jpeg",
    uri: vendor.profilePhotoUrl,
    name: vendor.profilePhotoUrl.split("/").slice(-1)[0],
  });

  return client.patch(`${user}/${username}`, data);
};
const addRider = (rider) => {
  const data = new FormData();
  data.append("email", rider.email.toLowerCase().trim());
  data.append("username", rider.username.toLowerCase().trim());
  data.append("full_name", rider.fullName);
  data.append("phone_number", rider.phoneNumber);
  data.append("plate_number", rider.plateNumber);
  data.append("password", rider.password);
  data.append("image", {
    type: "image/jpeg",
    uri: rider.profilePhotoUrl,
    name: rider.profilePhotoUrl.split("/").slice(-1)[0],
  });

  return client.post(riderEndpoint, data);
};

const updateRider = (rider, riderId) => {
  const data = new FormData();

  data.append("full_name", rider.fullName);
  data.append("plate_number", rider.plateNumber);
  data.append("image", {
    type: "image/jpeg",
    uri: rider.profilePhotoUrl,
    name: rider.profilePhotoUrl.split("/").slice(-1)[0],
  });

  return client.patch(`${user}/update/${riderId}/rider`, data);
};

const confirmAccount = (user) => {
  const data = new FormData();

  data.append("confrim_email", user.emailCode);
  data.append("confirm_phone_number", user.phoneCode);
  return client.patch(`${user}/confirm-account`, data);
};

export default {
  addDispatch,
  addUser,
  addRider,
  getDispatchRiders,
  updateDispatch,
  sendPasswordResetLink,
  changePassword,
  updateVendor,
  getOneUserById,
  updateRider,
  confirmAccount,
  dispatchDeleteRider,
};
