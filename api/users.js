import client from "./client";

// TODO Login
// TODO Update user
// TODO Update vendor
// TODO List users
// TODO List vendors
// TODO User and Vendor profile

const dispatchEndpoint = "/users/register-dispatch";
const vendorEndpoint = "/users/register";

const addUser = (user) => {
  const data = new FormData();
  data.append("email", user.email.toLowerCase().trim());
  data.append("username", user.username);
  data.append("phone_number", user.phoneNumber);
  data.append("password", user.password);

  return client.post(vendorEndpoint, data);
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

export default {
  addUser,
  addDispatch,
};
