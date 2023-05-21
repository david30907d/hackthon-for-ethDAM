import {config} from "dotenv";
config()

export const RPC_ENDPOINT=process.env.RPC_ENDPOINT || "https://mainnet.infura.io/v3/460f40a260564ac4a4f4b3fffb032dad"

export const ADMIN_PRIVATE_KEY=process.env.ADMIN_PRIVATE_KEY || ""
export const RAILGUN_WALLET_ID=process.env.RAILGUN_WALLET_ID || ""
export const RAILGUN_WALLET_ADDRESS=process.env.RAILGUN_WALLET_ADDRESS || ""
export const RAILGUN_WALLET_MNEMONIC=process.env.RAILGUN_WALLET_MNEMONIC || ""
export const RAILGUN_WALLET_ENCRYTIONKEY=process.env.RAILGUN_WALLET_ENCRYTIONKEY || ""
export const AIRDROP_ADDRESS=process.env.AIRDROP_ADDRESS || ""
export const REWARD_TOKEN_ADDRESS=process.env.REWARD_TOKEN_ADDRESS || ""
