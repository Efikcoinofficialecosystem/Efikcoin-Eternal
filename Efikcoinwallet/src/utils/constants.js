export const CONTRACT_ADDRESS = '0x9F8C29E496ECB6C39c221458f211234DfCB233E0';
export const RPC_URL = 'https://bsc-dataseed.binance.org/';
export const CHAIN_ID = 56;
export const EXPLORER_URL = 'https://bscscan.com';

export const ECE_ABI = [
  // Minimal ABI for balance and transfer
  "function balanceOf(address owner) view returns (uint256)",
  "function transfer(address to, uint256 amount) returns (bool)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",
  "function name() view returns (string)",
  "function totalSupply() view returns (uint256)"
];
