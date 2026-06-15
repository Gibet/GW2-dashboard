export interface AccountType {
  name: string;
  age: number;
  world: number;
  guilds: string[];
  guild_leader: string[];
  created: string;
  access: string[];
  commander: boolean;
  fractal_level: number;
  daily_ap: number;
  monthly_ap: number;
  wvw_rank: number;
}

export interface WalletType {
  id: number
  value: number
}

export interface CurrencyType {
  id: number
  name: string
  description: string
  icon: string
  order: number
}