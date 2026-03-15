import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import * as Clipboard from 'expo-clipboard';

export default function ReceiveScreen({ route }) {
  const { account } = route.params;

  const copyAddress = () => {
    Clipboard.setStringAsync(account);
    alert('Address copied!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Receive ECE</Text>
      <Text style={styles.subtitle}>Scan QR code or copy address below</Text>

      <View style={styles.qrContainer}>
        <QRCode
          value={`ethereum:${account}`}
          size={200}
          color="#f59e0b"
          backgroundColor="#1a1a1a"
        />
      </View>

      <Text style={styles.addressLabel}>Your Address</Text>
      <Text style={styles.address} onPress={copyAddress}>
        {account}
      </Text>
      <Text style={styles.note}>Only send ECE or BNB on BSC network</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    padding: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f59e0b',
    marginBottom: 10,
  },
  subtitle: {
    color: '#888',
    marginBottom: 20,
  },
  qrContainer: {
    padding: 10,
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    marginBottom: 20,
  },
  addressLabel: {
    color: '#888',
    fontSize: 14,
    marginBottom: 5,
  },
  address: {
    color: '#f59e0b',
    fontSize: 14,
    textAlign: 'center',
    padding: 10,
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    marginBottom: 20,
    textDecorationLine: 'underline',
  },
  note: {
    color: '#666',
    fontSize: 12,
    textAlign: 'center',
  },
});
