import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ethers } from 'ethers';
import { getProvider, getContract, formatBalance } from '../utils/web3';
import { CONTRACT_ADDRESS, EXPLORER_URL } from '../utils/constants';
import BalanceCard from '../components/BalanceCard';
import WalletConnectButton from '../components/WalletConnectButton';

export default function HomeScreen({ navigation }) {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState('0');
  const [tokenInfo, setTokenInfo] = useState({ name: '', symbol: '', decimals: 18 });
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (account) {
      loadTokenInfo();
      loadBalance();
      // loadTransactions();
    }
  }, [account]);

  const loadTokenInfo = async () => {
    try {
      const provider = getProvider();
      const contract = getContract(provider);
      const name = await contract.name();
      const symbol = await contract.symbol();
      const decimals = await contract.decimals();
      setTokenInfo({ name, symbol, decimals });
    } catch (err) {
      console.log(err);
    }
  };

  const loadBalance = async () => {
    try {
      const provider = getProvider();
      const contract = getContract(provider);
      const bal = await contract.balanceOf(account);
      const formatted = formatBalance(bal, tokenInfo.decimals);
      setBalance(formatted);
    } catch (err) {
      console.log(err);
    }
  };

  const handleConnect = (addr) => {
    setAccount(addr);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>EfikCoin Wallet</Text>
        <Text style={styles.subtitle}>ECE · BSC</Text>
      </View>

      <WalletConnectButton onConnect={handleConnect} />

      {account ? (
        <>
          <BalanceCard
            balance={balance}
            symbol={tokenInfo.symbol}
            address={account}
          />

          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Send', { account, tokenInfo })}
            >
              <Text style={styles.buttonText}>Send</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Receive', { account })}
            >
              <Text style={styles.buttonText}>Receive</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.transactions}>
            <Text style={styles.sectionTitle}>Recent Transactions</Text>
            {/* Placeholder - you can integrate with BscScan API later */}
            <Text style={styles.placeholder}>No transactions yet</Text>
          </View>
        </>
      ) : (
        <Text style={styles.placeholder}>Connect your wallet to get started</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    paddingHorizontal: 16,
  },
  header: {
    alignItems: 'center',
    marginVertical: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#f59e0b',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#f59e0b',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  transactions: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  placeholder: {
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
});
