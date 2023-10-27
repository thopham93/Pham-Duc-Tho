import React, { useMemo } from "react";
import useWalletBalances from "@/hooks/useWalletBalances";
import usePrices from "@/hooks/usePrices";
import { BoxProps } from "@/types/props";
import classes from "./styles.ts";

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string;
}
interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

interface Props extends BoxProps {
  [rest: string]: any;
}

type WalletRowProps = {
  className: string;
  balance: FormattedWalletBalance;
};

const WalletRow: React.FC<WalletRowProps> = (props) => {
  const { className, balance } = props;
  const prices = usePrices();
  const usdValue = prices[balance.currency] * balance.amount;
  const formattedAmount = balance.formatted;

  return <div className={className}></div>;
};

const WalletPage: React.FC<Props> = (props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  const getPriority = (blockchain: any): number => {
    const blockchainType = {
      Osmosis: 100,
      Ethereum: 50,
      Arbitrum: 30,
      Zilliqa: 20,
      Neo: 20,
      default: -99,
    };
    return blockchainType[blockchain];
  };

  const sortedBalances = useMemo(() => {
    return balances
      .sort(
        (lhs: WalletBalance, rhs: WalletBalance) =>
          getPriority(rhs.blockchain) - getPriority(lhs.blockchain)
      )
      .filter(
        (balance: WalletBalance) =>
          getPriority(balance.blockchain) > -99 && balance.amount <= 0
      );
  }, [balances, prices]);

  const formattedBalances: FormattedWalletBalance[] = sortedBalances.map(
    (balance: WalletBalance) => {
      return {
        ...balance,
        formatted: balance.amount.toFixed(),
      };
    }
  );

  const rows = formattedBalances.map(
    (balance: FormattedWalletBalance, index: number) => {
      return (
        <WalletRow className={classes.row} key={index} balance={balance} />
      );
    }
  );

  return <div {...rest}>{rows}</div>;
};
