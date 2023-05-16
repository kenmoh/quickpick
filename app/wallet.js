import { StyleSheet, Text, View, Pressable, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "expo-router";

import { COLORS } from "../constants/colors_font";
import { BUTTON_SIZE, PADDING } from "../constants/sizes";
import { Transaction } from "../components";
import { useAuth } from "../auth/context";
import walletsApi from "../api/wallets";

const wallet = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [wallet, setWallet] = useState(null);
  const [transactions, setTransactions] = useState([]);

  console.log(transactions);

  const getDispatcUserhWallet = async () => {
    const result = await walletsApi.getDispatchWallet(user.id);
    setWallet(result.data);
    setTransactions(result.data.received_funds);

    if (!result.ok) {
      if (result.data) setError(result.problem);
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
      <View style={styles.wallet}>
        <Text style={styles.text}>Balance</Text>
        <Text style={styles.balText}>{`N ${wallet?.balance}`}</Text>
        <Text style={styles.text}>Account Number: 2020334455</Text>
      </View>
      <Pressable
        style={styles.reqFund}
        onPress={() => console.log("Resquest Send")}
      >
        <Text style={styles.btnText}>Request Fund</Text>
      </Pressable>
      <ScrollView showsVerticalScrollIndicator={false}>
        {transactions?.map((transaction) => (
          <Transaction
            key={transaction.id}
            bgColor="#A9FBC3"
            iconColor="green"
            icon="arrow-down-left"
            vendorName={transaction?.vendor_username}
            amount={transaction?.amount_payable}
            date={transaction?.updated_at}
          />
        ))}
      </ScrollView>

      <Transaction icon="arrow-up-right" />
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
    marginBottom: 25,
  },

  text: {
    color: COLORS.inputBackgroundColor,
    fontSize: 12,
    fontWeight: "100",
  },

  balText: {
    color: COLORS.inputBackgroundColor,
    fontSize: 14,
    fontWeight: "bold",
  },
  btnText: {
    color: COLORS.darkBlue,
    fontWeight: "bold",
    fontSize: 14,
  },
});
