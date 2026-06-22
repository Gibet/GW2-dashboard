import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { getAccountWallet, getCurrencies } from "../../utils/services/account";
import type { CurrencyType } from "../../utils/types/account";
import useAccountData from "../../hooks/useAccountData";
import { demoWallet } from "../../utils/demo/demoWallet";
import { convertGoldFormat } from "../../utils/functions";

const Wallet = () => {
  const {
    data: wallet,
    isLoading: loadingWallet,
    isError: isErrorWallet,
    error: errorWallet,
  } = useAccountData({
    queryKey: ["wallet"],
    queryFn: getAccountWallet,
    demoData: demoWallet
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

    return convertGoldFormat(value)
  };

  return (
    <div className="flex flex-col gap-1 h-full overflow-auto p-4 text-sm">
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
