import type React from "react";
import type { AccountType } from "../../utils/types/account";
import { SecToHours } from "../../utils/functions";


const AccountView: React.FC<AccountType> = (props: AccountType) => {
  return (
    <div className="grid grid-cols-4 gap-3 text-left justify-between mb-3">
      <div className="flex flex-col col-span-3">
        <span>Account name: {props.name}</span>
        <span>Played: {SecToHours(props.age)}</span>
        {/* <span>{props.world}</span> */}
        <span>Created: {new Date(props.created).toLocaleDateString()}</span>
        {props.commander && <span>Commander tag: acquired</span>}
      </div>
      <div className="col-span-1 flex flex-col">
        <span>Fractal level: {props.fractal_level}</span>
        <span>Daily AP: {props.daily_ap}</span>
        <span>Monthly AP: {props.monthly_ap}</span>
        <span>WvW Rank: {props.wvw_rank}</span>
      </div>
      {/* <ol>Guilds: {props.guilds.map((guild) => {return (
        <li key={guild}>{guild}</li>
      )})}</ol> */}
      {/* <div className="col-span-1">
        <ul>Access: {props.access.map((pack) => {return (
          <li key={pack}>{pack}</li>
        )})}</ul>
      </div> */}
    </div>
  )
}

export default AccountView