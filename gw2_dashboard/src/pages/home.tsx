import { useEffect, useState } from "react";
import { useAccount } from "../contexts/accountContext";
import { getAccount } from "../utils/services/account";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const Home = () => {
  const account = useAccount();
  const queryClient = useQueryClient()
  const [input, setInput] = useState(account?.token || "");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['account'],
    queryFn: getAccount,
    enabled: !!(account?.token)
  })

  const handleSubmit = () => {
    account?.setToken(input);
    queryClient.invalidateQueries({queryKey: ['account']})
    // more logic to come
  };

  const resetToken = () => {
    account?.setToken(undefined);
    account?.setData(undefined);
  };

  useEffect(() => {
    account?.setData(data)
  }, [data, account]);

  return (
    <div className="page_content justify-center flex-col p-4">
      <div className="main-logo mt-40 w-full h-32"></div>
      <div className="h-full w-full flex flex-col gap-3 items-center">
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
        {isLoading && <div>Loading...</div>}
        {isError && <div className="text-red-500">Error: {error?.message}</div>}
        {(account?.data && account?.permissions) && (<div className="flex flex-col gap-3 items-center">
          <div className="h-full flex items-center">
            <div className="items-center justify-center">Welcome {account.data.name}</div>
          </div>
          <span>API Permissions: </span>
          <div className="flex gap-2">
            {account?.permissions?.map((permission) => (
              <span key={permission}>{permission}</span>
            ))}
          </div>
        </div>)}
      </div>
    </div>
  );
};

export default Home;
