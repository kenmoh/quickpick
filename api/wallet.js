import client from "./client";

const walletEndpoint = "/withdrawals/";

const makeWithdrawal = () => client.post(`${walletEndpoint}`);

export default { makeWithdrawal };
