import { getAccountBank, getSharedInventory } from "../../utils/services/account";
import Inventory from "../items/inventoryView";
import useAccountData from "../../hooks/useAccountData";
import { demoBank } from "../../utils/demo/demoBank";
import { demoShared } from "../../utils/demo/demoShared";


const Bank = () => {

  const { data: bank , isLoading: isLoadingBank, isError: isErrorBank, error: errorBank } = useAccountData({
    queryKey: ['bank'],
    queryFn: getAccountBank,
    demoData: demoBank
  })

  const { data: shared , isLoading, isError, error } = useAccountData({
    queryKey: ['shared'],
    queryFn: getSharedInventory,
    demoData: demoShared
  })

  return (
    <div className="flex flex-col items-center py-3 h-full overflow-auto text-xs">
      <div className="">
        {isLoading && <div>Loading...</div>}
        {isError && <div className="text-red-500">Error: {error?.message}</div>}
        {shared && ( <div className="flex flex-col justify-start text-left">
            <span>Shared Inventory</span>
            <Inventory bags={[{inventory: shared}]}/> 
          </div>
        )}
      </div>
      <div className="flex flex-col items-center justify-center">
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