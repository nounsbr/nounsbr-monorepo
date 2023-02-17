import { useEtherBalance } from '@usedapp/core';
import useLidoBalance from './useLidoBalance';
import { useCoingeckoPrice } from '@usedapp/coingecko';
import config from '../config';
import { ethers } from 'ethers';

/**
 * Computes treasury balance (ETH + Lido)
 *
 * @returns Total balance of treasury (ETH + Lido) as EthersBN
 */
export const useTreasuryBalance = () => {
  const ethBalance = useEtherBalance(config.addresses.nounsbrDaoExecutor);
  const lidoBalanceAsETH = useLidoBalance();
  return ethBalance && lidoBalanceAsETH && ethBalance.add(lidoBalanceAsETH);
};

/**
 * Computes treasury usd value of treasury assets (ETH + Lido) at current ETH-USD exchange rate
 *
 * @returns USD value of treasury assets (ETH + Lido) at current exchange rate
 */
export const useTreasuryUSDValue = () => {
  const etherPrice = Number(useCoingeckoPrice('ethereum', 'usd'));
  const treasuryBalanceETH = Number(
    ethers.utils.formatEther(useTreasuryBalance()?.toString() || '0'),
  );
  return etherPrice * treasuryBalanceETH;
};

/**
 * Computes treasury usd value of treasury assets (ETH + Lido) at current ETH-BRL exchange rate
 *
 * @returns BRL value of treasury assets (ETH + Lido) at current exchange rate
 */
export const useTreasuryBRLValue = () => {
  const etherPrice = Number(useCoingeckoPrice('ethereum', 'brl'));
  const treasuryBalanceETH = Number(
    ethers.utils.formatEther(useTreasuryBalance()?.toString() || '0'),
  );
  return etherPrice * treasuryBalanceETH;
};

//debug
//const etherPriceBRL = Number(useCoingeckoPrice('ethereum', 'brl'));
//console.log(`ETH em reais: `, etherPriceBRL);
//