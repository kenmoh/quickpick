import { create } from "apisauce";

import authStorage from "../auth/storage";

const apiClient = create({
  baseURL: "https://mohdelivery.up.railway.app/api",
});

apiClient.addAsyncRequestTransform(async (request) => {
  const authToken = await authStorage.getToken();
  if (!authToken) return;
  request.headers["Authorization"] = "Bearer " + authToken;
});
// apiClient.get("/orders");
export default apiClient;
