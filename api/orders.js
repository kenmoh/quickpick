import client from "./client";

// TODO Add all order related operations

const endpoint = "/orders/";
const getListings = () => client.get(endpoint);
const getCustomerListings = () => client.get(`${endpoint}customer-order`);
const getVendorListings = () => client.get(`${endpoint}vendor-orders`);
const pickUpOrder = (order_id) =>
  client.put(`${endpoint}${order_id}/pick-up-order`);
const orderDetails = (orderId) => client.get(`${endpoint}${orderId}`);
const confirmOrderDelivery = (order_id) =>
  client.put(`${endpoint}${order_id}/confirm-delivery`);
const orderDelievered = (order_id) =>
  client.put(`${endpoint}${order_id}/order-is-delivered`);

const addItem = (item) => {
  const data = new FormData();
  data.append("name", item.name);
  data.append("description", item.description);
  data.append("origin", item.origin);
  data.append("destination", item.destination);
  data.append("distance", item.distance);
  data.append("image", {
    type: "image/jpeg",
    uri: item.orderPhotoUrl,
    name: item.orderPhotoUrl,
  });

  return client.post(endpoint, data);
};

export default {
  addItem,
  confirmOrderDelivery,
  getListings,
  getCustomerListings,
  getVendorListings,
  pickUpOrder,
  orderDelievered,
  orderDetails,
};
