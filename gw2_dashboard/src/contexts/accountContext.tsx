import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { STORAGE_KEY } from "../utils/variables";
import { type AccountType } from "../utils/types/account";
import API from "../utils/api";

type AccountContextValue = {
  token?: string;
  setToken: React.Dispatch<React.SetStateAction<string | undefined>>;
  permissions?: string[];
  setPermissions: React.Dispatch<React.SetStateAction<string[]>>;
  data?: AccountType;
  setData: React.Dispatch<React.SetStateAction<AccountType | undefined>>;
  isDemo: boolean;
  setIsDemo: React.Dispatch<React.SetStateAction<boolean>>;
};

const getStoredApiKey = () => {
  try {
    const savedToken = localStorage.getItem(STORAGE_KEY);
    if (savedToken) return savedToken;
  } catch {}
};

const validateToken = async (token: string) => {
  try {
    const query = await API.get("tokeninfo", {
      params: { access_token: token },
    });
    return query.data;
  } catch {
    return null;
  }
};

const AccountContext = createContext<AccountContextValue | undefined>(
  undefined,
);

export const AccountProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | undefined>(getStoredApiKey);
  const [permissions, setPermissions] = useState<string[]>([]);
  const [data, setData] = useState<AccountType>();
  const [isDemo, setIsDemo] = useState<boolean>(false)

  useEffect(() => {
    try {
      if (!token) {
        localStorage.removeItem(STORAGE_KEY);
        setPermissions([]);
        return;
      }
      validateToken(token).then((response) => {
        if (!response) return;
        localStorage.setItem(STORAGE_KEY, token);
        Array.isArray(response.permissions) &&
          setPermissions(response.permissions);
      });
    } catch {}
  }, [token]);

  const value = useMemo(
    () => ({ token, setToken, permissions, setPermissions, data, setData, isDemo, setIsDemo }),
    [token, setToken, permissions, setPermissions, data, setData, isDemo, setIsDemo],
  );

  return (
    <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
  );
};

export const useAccount = () => useContext(AccountContext);
