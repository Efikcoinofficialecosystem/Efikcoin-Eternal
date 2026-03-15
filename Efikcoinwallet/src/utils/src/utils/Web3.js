import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, ECE_ABI, RPC_URL } from './constants';

export const getProvider = () => {
  return new ethers.providers.JsonRpcProvider(RPC_URL);
};

export const getContract = (provider) => {
  return new ethers.Contract(CONTRACT_ADDRESS, ECE_ABI, provider);
};

export const formatBalance = (balance, decimals) => {
  return ethers.utils.formatUnits(balance, decimals);
};

export const parseAmount = (amount, decimals) => {
  return ethers.utils.parseUnits(amount, decimals);
};
