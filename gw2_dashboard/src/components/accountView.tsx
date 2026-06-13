import type React from "react";
import type { AccountType } from "../utils/types/account";
import { SecToHours } from "../utils/functions";


const AccountView: React.FC<AccountType> = (props: AccountType) => {
  return (
    <div className="flex flex-wrap text-left justify-between mb-3">
      <div className="flex flex-col">
        <span>Account name: {props.name}</span>
        <span>Played: {SecToHours(props.age)}</span>
        {/* <span>{props.world}</span> */}
        <span>Created: {new Date(props.created).toLocaleDateString()}</span>
        <span>Commander tag: {(props.commander) ? 'yes' : 'no'}</span>
        <span>Fractal level: {props.fractal_level}</span>
        <span>Daily AP: {props.daily_ap}</span>
        <span>Monthly AP: {props.monthly_ap}</span>
        <span>WvW Rank: {props.wvw_rank}</span>
      </div>
      {/* <ol>Guilds: {props.guilds.map((guild) => {return (
        <li key={guild}>{guild}</li>
      )})}</ol> */}
      <div>
        <ul>Access: {props.access.map((pack) => {return (
          <li key={pack}>{pack}</li>
        )})}</ul>
      </div>
    </div>
  )
}

export default AccountView