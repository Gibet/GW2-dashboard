import { useEffect, useState } from "react";
import { useAccount } from "../contexts/accountContext";
import { getAccount } from "../utils/services/account";
import AccountView from "../components/accountView";

const Home = () => {
  const account = useAccount();
  const [input, setInput] = useState(account?.token || "");

  const handleSubmit = () => {
    account?.setToken(input);
    // more logic to come
  };

  const resetToken = () => {
    account?.setToken(undefined);
  };

  useEffect(() => {
    if (!account?.token) setInput("");
    if (account?.token) {
      getAccount().then((data) => {
        account.setData(data);
      });
    }
  }, [account?.token]);

  return (
    <div className="p-4">
      <div className="flex gap-2 justify-end">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="flex justify-center gap-2">
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
      </div>
      {account?.data && account?.permissions?.includes("account") && (
        <div className="h-full w-full flex">
          <div className="items-center justify-center">Welcome {account.data.name}</div>
        </div>
      )}
    </div>
  );
};

export default Home;
