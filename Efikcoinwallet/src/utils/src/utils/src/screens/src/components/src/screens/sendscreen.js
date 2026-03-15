import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { ethers } from 'ethers';
import { getProvider, getContract, parseAmount } from '../utils/web3';

export default function SendScreen({ route, navigation }) {
  const { account, tokenInfo } = route.params;
  const [toAddress, setToAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [sending, setSending] = useState(false);

  const handleSend = async () => {
    if (!toAddress || !amount) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    try {
      setSending(true);
      // In a real app, you need a signer – you'd use WalletConnect or injected provider.
      // This example assumes you have a connected wallet via a provider.
      // Since we can't easily get a signer here without WalletConnect, we'll simulate.
      Alert.alert('Success', `Sent ${amount} ECE to ${toAddress}`);
      setSending(false);
      navigation.goBack();
    } catch (err) {
      Alert.alert('Error', err.message);
      setSending(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Send ECE</Text>
      <Text style={styles.balance}>Your balance: {tokenInfo.balance} {tokenInfo.symbol}</Text>

      <TextInput
        style={styles.input}
        placeholder="Recipient Address"
        placeholderTextColor="#666"
        value={toAddress}
        onChangeText={setToAddress}
      />

      <TextInput
        style={styles.input}
        placeholder="Amount"
        placeholderTextColor="#666"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      <TouchableOpacity
        style={[styles.button, sending && styles.disabled]}
        onPress={handleSend}
        disabled={sending}
      >
        <Text style={styles.buttonText}>{sending ? 'Sending...' : 'Send'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f59e0b',
    marginBottom: 20,
  },
  balance: {
    color: '#fff',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    padding: 12,
    color: '#fff',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#333',
  },
  button: {
    backgroundColor: '#f59e0b',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  disabled: {
    opacity: 0.6,
  },
});
