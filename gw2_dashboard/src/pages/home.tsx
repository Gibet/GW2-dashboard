import { useEffect, useState } from "react";
import { useAccount } from "../contexts/accountContext";

const Home = () => {
  const account = useAccount();
  const [input, setInput] = useState(account?.token || "");

  const handleSubmit = () => {
    account?.setToken(input);
    // more logic to come
  };

  const resetToken = () => {
    account?.setToken(undefined)
  }

  useEffect(() => {
    if (!account?.token) setInput('')
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

      {account?.permissions && account.permissions.map((permission: string) => {
        return (
          <div>{permission}</div>
        )
      })}
    </div>
  );
};

export default Home;
