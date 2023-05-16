import client from "./client";

// TODO Add all order related operations

const endpoint = "/orders/";
const getListings = () => client.get(endpoint);

// Get Listings by logged in vendor
const getVendorListings = () => client.get(`${endpoint}vendor-orders`);

// Get Listings by logged in dispatch
const getDispatchListings = () => client.get(`${endpoint}user-orders`);

// Pickup order by dispatch/rider
const pickUpOrder = (order_id) =>
  client.put(`${endpoint}${order_id}/pick-up-order`);

// Order details
const orderDetails = (orderId) => client.get(`${endpoint}${orderId}`);

// Mark order as delivered [dispatch/rider users only]
const orderDelievered = (order_id) =>
  client.put(`${endpoint}${order_id}/order-is-delivered`);

// Cancel picked up order [dispatch/rider users only]
const cancelOrder = (order_id) =>
  client.put(`${endpoint}${order_id}/cancel-order`);

// Mark order as received [vendor users only]
const orderReceived = (order_id) =>
  client.put(`${endpoint}${order_id}/order-received`);

// create new order
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
    name: item.orderPhotoUrl.split("/").slice(-1)[0],
  });
  return client.post(endpoint, data);
};

export default {
  addItem,
  cancelOrder,
  getListings,
  getVendorListings,
  getDispatchListings,
  pickUpOrder,
  orderDelievered,
  orderDetails,
  orderReceived,
};
