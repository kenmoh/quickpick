import client from "./client";

// TODO Update user

const dispatchEndpoint = "/users/register-dispatch";
const riderEndpoint = "/users/register-rider";
const userEndpoint = "/users/register";

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
const addRider = (rider) => {
  const data = new FormData();
  data.append("email", rider.email.toLowerCase().trim());
  data.append("username", rider.username.toLowerCase().trim());
  data.append("full_name", rider.fullName.toLowerCase().trim());
  data.append("phone_number", rider.phoneNumber);
  data.append("bank_account_number", rider.bankAccountNumber);
  data.append("bank_name", rider.bankName);
  data.append("password", rider.password);

  return client.post(riderEndpoint, data);
};

export default {
  addDispatch,
  addUser,
  addRider,
};
