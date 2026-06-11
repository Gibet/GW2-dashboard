import type React from "react";
import type { AccountProps } from "../utils/types";
import { SecToHours } from "../utils/functions";


const AccountView: React.FC<AccountProps> = (props: AccountProps) => {
  return (
    <div className="flex flex-col">
      <span>Account name: {props.name}</span>
      <span>Account age:{SecToHours(props.age)}</span>
      <span>{props.world}</span>
      <span>Created: {new Date(props.created).toLocaleDateString()}</span>
      <span>Commander tag: {props.commander}</span>
      <span>Fractal level: {props.fractal_level}</span>
      <span>Daily AP: {props.daily_ap}</span>
      <span>Monthly AP: {props.monthly_ap}</span>
      <span>WvW Rank: {props.wvw_rank}</span>
      <ol>Guilds: {props.guilds.map((guild) => {return (
        <li key={guild}>{guild}</li>
      )})}</ol>
      <ul>Access: {props.access.map((pack) => {return (
        <li key={pack}>{pack}</li>
      )})}</ul>
    </div>
  )
}

export default AccountView