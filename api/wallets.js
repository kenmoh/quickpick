import client from "./client";

// TODO Update user

const walletsEndpoint = "/wallets/";

// Get All wallet
const getWallets = () => client.get(walletsEndpoint);

// Get user wallet
const getWallet = (walletId) => client.get(`${walletsEndpoint}${walletId}`);

export default { getWallet, getWallets };
