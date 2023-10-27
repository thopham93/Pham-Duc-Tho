/**
 * Missing some import necessary
 * import React, { useMemo } from "react";
 * import hooks useWalletBalances, usePrices
 * import interface BoxProps
 * import classes from "./styles.ts"
 */

interface WalletBalance {
  currency: string;
  amount: number;
  /**
   * Missing declare parameter blockchain with datatype string
   */
}

/** Can extends params from interface WalletBalance without dupplicate params  */
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}

interface Props extends BoxProps {
  /** Missing delare parameter [rest: string]: any */
}

/** No need props: Props. Just only one props is enough */
const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  /** Need to refactor this function without using switch case to clean code */
  const getPriority = (blockchain: any): number => {
    switch (blockchain) {
      case "Osmosis":
        return 100;
      case "Ethereum":
        return 50;
      case "Arbitrum":
        return 30;
      case "Zilliqa":
        return 20;
      case "Neo":
        return 20;
      default:
        return -99;
    }
  };

  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain);
        /** Variable lhsPriority doesn't exist then exception  will occur in this condition.
         * Instead of it, this condition should replace with variable balancePriority above to complete this function
         * */
        if (lhsPriority > -99) {
          if (balance.amount <= 0) {
            return true;
          }
        }
        return false;
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        /**
         * Need refactor this check condition to shorthand
         */
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);
        if (leftPriority > rightPriority) {
          return -1;
        } else if (rightPriority > leftPriority) {
          return 1;
        }
      });
  }, [balances, prices]);

  /** Need add return type of this fuction to array of FormattedWalletBalance */
  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed(),
    };
  });

  /** rows are using formattedBalances not sortedBalances. Because sortedBalances has datatype WalletBalance and not exist parameter formatted to render all item value */
  const rows = sortedBalances.map(
    (balance: FormattedWalletBalance, index: number) => {
      const usdValue = prices[balance.currency] * balance.amount;
      return (
        /** This component has so many passing params then need to reduce params by collecting some relative params and removing duplicate params.
         * Variable usdValue should be calculate by calling usePrices hook inside component WalletRow.
         * Classes doesn't exist so need to declare or import it
         */
        <WalletRow
          className={classes.row}
          key={index}
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      );
    }
  );

  return <div {...rest}>{rows}</div>;
};
