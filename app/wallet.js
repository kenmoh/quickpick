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

    // Sort the object by date(desc)
    combinedTransactions.sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );

    setTransactions(combinedTransactions);
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
        <View>
          <Text style={styles.text}>Balance</Text>
          <Text style={styles.balText}>{`N ${wallet?.balance}`}</Text>
          <Text style={styles.text}>
            Acc. Number: {user?.bank_account_number}
          </Text>
        </View>
        <Pressable style={styles.reqFund} onPress={handleMakeWithdrawal}>
          <Text style={styles.btnText}>Request Fund</Text>
        </Pressable>
      </View>

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
  },

  wallet: {
    backgroundColor: COLORS.secondaryColor,
    height: "100%",
    width: "100%",
    justifyContent: "space-between",
    padding: PADDING.horizontalPaddingSmall,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  reqFund: {
    width: "40%",
    backgroundColor: COLORS.inputBackgroundColor,
    alignItems: "center",
    paddingVertical: 12.5,
    borderRadius: BUTTON_SIZE.smallRadius,
    marginVertical: 15,
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
    flex: 4,
    backgroundColor: COLORS.white,
    paddingHorizontal: PADDING.horizontalPaddingSmall,
  },
});
