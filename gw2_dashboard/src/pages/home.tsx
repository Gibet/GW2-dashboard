import { useEffect, useState } from "react";
import { useAccount } from "../contexts/accountContext";
import { getAccount } from "../utils/services/account";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { demoAccount } from "../utils/demo/demoAccount";
import { demoPermissions } from "../utils/demo/demoPermissions";

const Home = () => {
  const account = useAccount();
  const queryClient = useQueryClient();
  const [input, setInput] = useState(account?.token || "");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["account"],
    queryFn: getAccount,
    enabled: !!account?.token,
  });

  const handleSubmit = () => {
    account?.setToken(input);
    queryClient.invalidateQueries({ queryKey: ["account"] });
    // more logic to come
  };

  const resetToken = () => {
    account?.setToken(undefined);
    account?.setData(undefined);
    account?.setIsDemo(false);
  };

  const handleDemo = () => {
    account?.setIsDemo(true);
    account?.setData(demoAccount);
    account?.setPermissions(demoPermissions);
  };

  useEffect(() => {
    !account?.isDemo && account?.setData(data);
  }, [data, account]);

  return (
    <div className="page_content justify-center flex-col p-4">
      <div className="main-logo mt-40 w-full h-32"></div>
      <div className="h-full w-full flex flex-col gap-3 items-center">
        <div className="flex gap-2 w-1/2 justify-center">
          <form
            className="w-full"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <div className="flex justify-center items-start gap-2">
              <input
                value={input}
                type="text"
                className="w-full"
                disabled={!!account?.token || account?.isDemo}
                onChange={(e) => {
                  setInput(e.target.value);
                }}
                placeholder="Insert GW2 API key..."
              />
              <button
                type="submit"
                className="homeButton px-2"
                disabled={!!account?.token || account?.isDemo}
              >
                Submit
              </button>
            </div>
          </form>
          <button className="homeButton px-2" onClick={resetToken}>
            Reset
          </button>
          <button className="homeButton px-2 text-nowrap" onClick={handleDemo}>
            Use Demo Account
          </button>
        </div>
        {isLoading && <div>Loading...</div>}
        {isError && <div className="text-red-500">Error: {error?.message}</div>}
        {account?.data && account?.permissions && (
          <div className="flex flex-col gap-3 items-center">
            <div className="h-full flex items-center">
              <div className="items-center justify-center Cagliostro">
                Welcome {account.data.name}
              </div>
            </div>
            <span className="text-sm Lato">API Permissions: </span>
            <div className="flex text-xs flex-wrap gap-2 Lato">
              {account?.permissions?.map((permission, index) => (
                <>
                  <span key={permission}>{permission}</span>
                  {account.permissions &&
                    index < account?.permissions?.length - 1 && <span>|</span>}
                </>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
