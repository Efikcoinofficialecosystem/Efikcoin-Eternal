import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as Linking from 'expo-linking';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function WalletConnectButton({ onConnect }) {
  const [connecting, setConnecting] = useState(false);

  const connectWallet = async () => {
    setConnecting(true);
    try {
      // For simplicity, we'll use a deep link to MetaMask or Trust Wallet
      // In production, you'd implement WalletConnect properly
      const appLink = 'https://metamask.app.link/wc?uri=...'; // You need to generate a WalletConnect URI

      // Open the wallet app
      const supported = await Linking.canOpenURL('metamask://');
      if (supported) {
        await Linking.openURL('metamask://');
        // After user approves, you'll receive the address via deep link callback
        // For now, simulate a delay and then pass a mock address
        setTimeout(() => {
          onConnect('0xc5ad5cfcf81ad63a94227334b898eafce6b27cca'); // Replace with actual
          setConnecting(false);
        }, 3000);
      } else {
        Alert.alert('Error', 'Please install MetaMask or Trust Wallet');
        setConnecting(false);
      }
    } catch (err) {
      Alert.alert('Error', err.message);
      setConnecting(false);
    }
  };

  return (
    <TouchableOpacity
      style={[styles.button, connecting && styles.disabled]}
      onPress={connectWallet}
      disabled={connecting}
    >
      <Text style={styles.buttonText}>
        {connecting ? 'Connecting...' : 'Connect Wallet'}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#f59e0b',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    alignSelf: 'center',
    marginVertical: 10,
  },
  disabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
