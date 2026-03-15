import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Clipboard from 'expo-clipboard';

export default function BalanceCard({ balance, symbol, address }) {
  const copyAddress = () => {
    Clipboard.setStringAsync(address);
    alert('Address copied!');
  };

  return (
    <View style={styles.card}>
      <Text style={styles.balanceLabel}>Your Balance</Text>
      <Text style={styles.balance}>{balance} {symbol}</Text>
      <View style={styles.addressContainer}>
        <Text style={styles.addressLabel}>Address</Text>
        <Text style={styles.address} onPress={copyAddress}>
          {address.slice(0,6)}...{address.slice(-4)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    padding: 20,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#333',
  },
  balanceLabel: {
    color: '#888',
    fontSize: 14,
  },
  balance: {
    color: '#f59e0b',
    fontSize: 32,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  addressContainer: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  addressLabel: {
    color: '#888',
    fontSize: 12,
  },
  address: {
    color: '#f59e0b',
    fontSize: 14,
    marginTop: 4,
    textDecorationLine: 'underline',
  },
});
