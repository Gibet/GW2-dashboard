import { useQuery } from "@tanstack/react-query";
import React, { useMemo } from "react";
import { getAccountWallet, getCurrencies } from "../../utils/services/account";
import type { CurrencyType } from "../../utils/types/account";

const Wallet = () => {
  const {
    data: wallet,
    isLoading: loadingWallet,
    isError: isErrorWallet,
    error: errorWallet,
  } = useQuery({
    queryKey: ["wallet"],
    queryFn: getAccountWallet,
  });

  const currenciesIds = useMemo(() => {
    if (!wallet) return [];
    return [...new Set(wallet.flatMap((currency) => currency.id))];
  }, [wallet]);

  const {
    data: currencies,
    isLoading: loadingCurrencies,
    isError: isErrorCurrencies,
    error: errorCurrencies,
  } = useQuery({
    queryKey: ["currencies", currenciesIds.join(",")],
    queryFn: () => getCurrencies(currenciesIds),
    enabled: currenciesIds.length > 0,
  });

  const convertCurrencyFormat = (currency: CurrencyType, value: number) => {
    if (currency.name !== "Coin") {
      return <span>{value.toLocaleString()}</span>
    }

    let gold = Math.floor(value / 10000);
    let silver = Math.floor((value % 10000) / 100);
    let copper = value - gold * 10000 - silver * 100;

    let format = (
      <span className="flex gap-1">
        <span>
          <span>{gold}</span>
          <span className="sprite-gold"></span>
        </span>
        <span>
          <span>{silver}</span>
          <span className="sprite-silver"></span>
        </span>
        <span>
          <span>{copper}</span>
          <span className="sprite-copper"></span>
        </span>
      </span>
      
      )
    return format
  };

  return (
    <div className="flex flex-col gap-1 h-full overflow-auto p-4">
      {(loadingWallet || loadingCurrencies) && <div>Loading Wallet...</div>}
      {(isErrorWallet || isErrorCurrencies) && (
        <>
          <div className="text-red-500">Error: {errorWallet?.message}</div>
          <div className="text-red-500">Error: {errorCurrencies?.message}</div>
        </>
      )}
      {wallet &&
        currencies &&
        wallet.map((currency, index) => (
          <div key={currency.id} className="w-full flex justify-between">
            <span>{currencies[index].name}</span>
            <div className="flex gap-3">
              <span className="text-sm">{convertCurrencyFormat(currencies[index], currency.value)}</span>
              <img src={currencies[index].icon} alt="" className="w-6 h-6" />
            </div>
          </div>
        ))}
    </div>
  );
};

export default Wallet;
