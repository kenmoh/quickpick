import client from "./client";

// TODO Update user

const walletsEndpoint = "/wallets/";

// Get All wallet
const getWallets = () => client.get(walletsEndpoint);

// Get user wallet
const getWallet = (walletId) => client.get(`${walletsEndpoint}${walletId}`);
const getDispatchWallet = (userId) =>
  client.get(`${walletsEndpoint}${userId}/wallet`);

export default { getWallet, getWallets, getDispatchWallet };
