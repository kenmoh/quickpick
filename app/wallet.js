import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRouter } from "expo-router";

import { showMessage } from "react-native-flash-message";

import { COLORS } from "../constants/colors_font";
import { BUTTON_SIZE, PADDING } from "../constants/sizes";
import { AppActivityIndicator, Transaction } from "../components";
import { useAuth } from "../auth/context";
import walletsApi from "../api/wallets";

const wallet = () => {
  const navigation = useNavigation();
  const router = useRouter();
  const { user } = useAuth();
  const [wallet, setWallet] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);

  const getDispatcUserhWallet = async () => {
    setIsLoading(true);
    const result = await walletsApi.getDispatchWallet(user?.id);
    setIsLoading(false);

    setWallet(result.data);

    // Separate deposits and withdrawals from the result data
    const { withdrawals, deposits } = result?.data || {};

    // Combine deposits and withdrawals arrays in the desired order
    const combinedTransactions = [...deposits, ...withdrawals];

    // Group transactions by date
    const groupedTransactions = combinedTransactions.reduce(
      (acc, transaction) => {
        const date = transaction.created_at.split("T")[0]; // Extract date portion

        // If date key already exists, append the transaction to the existing array
        if (acc[date]) {
          acc[date].push(transaction);
        } else {
          // If date key doesn't exist, create a new array with the transaction
          acc[date] = [transaction];
        }

        return acc;
      },
      {}
    );

    // Sort the combined transactions based on their timestamps (assuming a timestamp property exists)
    // const sortedTransactions = combinedTransactions.sort((a, b) => {
    //   if (a.transaction_type !== b.transaction_type) {
    //     return a.transaction_type.localeCompare(b.transaction_type);
    //   }
    //   return new Date(b.created_at) - new Date(a.created_at);
    // });

    // Flatten the grouped transactions array
    const sortedTransactions = Object.values(groupedTransactions).flatMap(
      (transactions) => transactions
    );

    setTransactions(sortedTransactions);
  };

  const handleMakeWithdrawal = async () => {
    setIsLoading(true);
    const result = await walletsApi.makeWithdrawal();
    setIsLoading(false);
    router.replace("wallet");

    if (result.ok) {
      showMessage({
        message: "Withdrawal request sent successfully!",
        type: "success",
      });
      return;
    }
    if (!result.ok) {
      showMessage({
        message: result.data.detail,
        type: "danger",
      });
      return;
    }
  };

  useEffect(() => {
    if (navigation.isFocused()) {
      getDispatcUserhWallet();
    }
  }, [navigation.isFocused()]);
  return (
    <View style={styles.container}>
      <AppActivityIndicator visible={isLoading} height="100%" />
      <View style={styles.wallet}>
        <Text style={styles.text}>Balance</Text>
        <Text style={styles.balText}>{`N ${wallet?.balance}`}</Text>
        <Text style={styles.text}>
          Account Number: {user?.bank_account_number}
        </Text>
      </View>

      <Pressable style={styles.reqFund} onPress={handleMakeWithdrawal}>
        <Text style={styles.btnText}>Request Fund</Text>
      </Pressable>
      {/* <AppErrorMessage error={error} visible={error} /> */}
      {/* <ScrollView showsVerticalScrollIndicator={false}>
        {transactions?.map((transaction) => (
          <Transaction
            key={transaction.id}
            bgColor={`${
              transaction.transaction_type === "deposit"
                ? COLORS.success
                : COLORS.pendingColor
            }`}
            iconColor={`${
              transaction.transaction_type === "deposit"
                ? COLORS.successColor
                : COLORS.errorText
            }`}
            icon={`${
              transaction.transaction_type === "deposit"
                ? "arrow-down-left"
                : "arrow-up-right"
            }`}
            vendorName={
              transaction?.vendor_username || transaction?.company_name
            }
            amount={
              transaction?.amount_payable || transaction?.withdrawal_amount
            }
            date={
              transaction?.updated_at?.split("T")[0] ||
              transaction?.created_at?.split("T")[0]
            }
          />
        ))}
      </ScrollView> */}
      <View style={styles.transaction}>
        <FlatList
          data={transactions}
          keyExtractor={(item) => item.id.toString()}
          estimatedItemSize={200}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          vertical
          renderItem={({ item }) => (
            <Transaction
              key={item.id}
              bgColor={`${
                item.transaction_type === "deposit"
                  ? COLORS.success
                  : COLORS.pendingColor
              }`}
              iconColor={`${
                item.transaction_type === "deposit"
                  ? COLORS.successColor
                  : COLORS.errorText
              }`}
              icon={`${
                item.transaction_type === "deposit"
                  ? "arrow-down-left"
                  : "arrow-up-right"
              }`}
              vendorName={item?.vendor_username || item?.company_name}
              amount={item?.amount_payable || item?.withdrawal_amount}
              date={
                item?.updated_at?.split("T")[0] ||
                item?.created_at?.split("T")[0]
              }
            />
          )}
        />
      </View>
    </View>
  );
};

export default wallet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: PADDING.horizontalPaddingSmall,
  },

  wallet: {
    backgroundColor: COLORS.activeTrackColor,
    height: 110,
    width: "100%",
    borderRadius: BUTTON_SIZE.smallRadius,
    marginVertical: BUTTON_SIZE.btnVerticalMarginLarge,
    justifyContent: "center",
    paddingHorizontal: PADDING.horizontalPaddingSmall,
  },
  reqFund: {
    width: "70%",
    backgroundColor: COLORS.inputBackgroundColor,
    alignItems: "center",
    paddingVertical: 12.5,
    marginTop: -35,
    alignSelf: "center",
    borderRadius: BUTTON_SIZE.smallRadius,
    marginBottom: 15,
  },

  text: {
    color: COLORS.inputBackgroundColor,
    fontSize: 15,
    fontWeight: "100",
  },

  balText: {
    color: COLORS.inputBackgroundColor,
    fontSize: 22,
    fontWeight: "bold",
  },
  btnText: {
    color: COLORS.darkBlue,
    fontWeight: "bold",
    fontSize: 14,
  },
  transaction: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});
