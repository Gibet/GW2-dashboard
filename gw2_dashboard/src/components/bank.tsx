import type React from "react";
import { useQuery } from "@tanstack/react-query";
import { getAccountBank, getSharedInventory } from "../utils/services/account";
import Inventory from "./inventory";


const Bank = () => {

  const { data: bank , isLoading: isLoadingBank, isError: isErrorBank, error: errorBank } = useQuery({
    queryKey: ['bank'],
    queryFn: getAccountBank,
  })

  const { data: shared , isLoading, isError, error } = useQuery({
    queryKey: ['shared'],
    queryFn: getSharedInventory,
  })

  return (
    <div className="flex flex-col gap 3">
      <div className="">
        {isLoading && <div>Loading...</div>}
        {isError && <div className="text-red-500">Error: {error?.message}</div>}
        {shared && ( <div className="flex flex-col justify-start text-left">
            <span>Shared Inventory</span>
            <Inventory bags={[{inventory: shared}]}/> 
          </div>
        )}
      </div>
      <div>
        {isLoadingBank && <div>Loading...</div>}
        {isErrorBank && <div className="text-red-500">Error: {errorBank?.message}</div>}
        {bank && ( <div className="flex flex-col justify-start text-left">
            <span>Bank</span>
            <Inventory bags={[{inventory: bank}]}/> 
          </div>
          )}
      </div>
    </div>
  )
}

export default Bank