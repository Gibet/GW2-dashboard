import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const STORAGE_KEY = "GW2API";
type AccountContextValue = {
  key?: string;
  setKey: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const getStoredApiKey = () => {
  try {
    const savedKey = localStorage.getItem(STORAGE_KEY);
    if (savedKey) return savedKey;
  } catch {}
};

const AccountContext = createContext<AccountContextValue | undefined>(undefined);

export const AccountProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [key, setKey] = useState<string | undefined>(getStoredApiKey);

  useEffect(() => {
    try {
      if (key) { localStorage.setItem(STORAGE_KEY, key); }
      else {  localStorage.removeItem(STORAGE_KEY) }
    } catch {}
  }, [key]);

  const value = useMemo(() => ({ key, setKey }), [key, setKey]);

  return (
    <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
  );
};

export const useAccount = () => useContext(AccountContext);
