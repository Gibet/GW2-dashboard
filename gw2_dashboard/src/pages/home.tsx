import { useEffect, useState } from "react";
import { useAccount } from "../contexts/accountContext";
import { getAccount } from "../utils/services/account";
import AccountView from "../components/accountView";
import type { AccountProps } from "../utils/types";

const Home = () => {
  const account = useAccount();
  const [input, setInput] = useState(account?.token || "");
  const [currentAccount, setCurrentAccount] = useState<AccountProps>()

  const handleSubmit = () => {
    account?.setToken(input);
    // more logic to come
  };

  const resetToken = () => {
    account?.setToken(undefined)
  }

  useEffect(() => {
    if (!account?.token) setInput('')
    if (account?.token) {
      getAccount()
        .then((data) => {
          setCurrentAccount(data)
        })
    }
  }, [account?.token])

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleSubmit();
        }}
      >
        <div>
          <input
            value={input}
            type="text"
            onChange={(e) => {
              setInput(e.target.value);
            }}
            placeholder="Insert GW2 API key"
          />
          <button type="submit">Submit</button>
        </div>
      </form>
      <button onClick={resetToken}>Reset</button>
      {currentAccount && <AccountView {...currentAccount} />}
    </div>
  );
};

export default Home;
