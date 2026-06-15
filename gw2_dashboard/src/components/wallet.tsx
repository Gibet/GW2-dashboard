import { useQuery } from "@tanstack/react-query";
import React, { useMemo } from "react";
import { getAccountWallet, getCurrencies } from "../utils/services/account";

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
    return [...new Set(wallet.flatMap((currency) => currency.id)),]
  }, [wallet]);

  const {
    data: currencies,
    isLoading: loadingCurrencies,
    isError: isErrorCurrencies,
    error: errorCurrencies,
  } = useQuery({
    queryKey: ["currencies", currenciesIds.join(',')],
    queryFn: () => getCurrencies(currenciesIds),
    enabled: currenciesIds.length > 0
  });

  return (
    <div className="flex flex-col flex-wrap">
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
          <div className="w-full flex justify-between">
            <span>{currencies[index].name}</span>
            <div className="flex gap-3">
              <span>{currency.value}</span>
              <img src={currencies[index].icon} alt=""  className="w-6 h-6"/>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Wallet;
