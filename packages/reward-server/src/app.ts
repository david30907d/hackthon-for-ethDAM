import * as process from "process";
import {
    ADMIN_PRIVATE_KEY, AIRDROP_ADDRESS,
    RAILGUN_WALLET_ADDRESS,
    RAILGUN_WALLET_ENCRYTIONKEY, RAILGUN_WALLET_ID,
    RAILGUN_WALLET_MNEMONIC, REWARD_TOKEN_ADDRESS,
    RPC_ENDPOINT
} from "./configs";
import {ethers, Wallet} from "ethers";
import {deserializeTransaction, NetworkName, RailgunERC20Amount} from "@railgun-community/shared-models";
import {
    loadProvider, setLoggers
} from "@railgun-community/quickstart";
import {ETH_PROVIDERS_JSON, initialize, privateTransfer, shield} from "./railgun";
const logMessage: (msg: any) => void = console.log;
const logError: (err: any) => void = console.error;

setLoggers(logMessage, logError);
initialize()
async function main() {
    const {feesSerialized} = await loadProvider(
        ETH_PROVIDERS_JSON,
        NetworkName.Ethereum,
        true,
    );
    const provider=new ethers.providers.JsonRpcProvider(RPC_ENDPOINT)
    const iface=new ethers.utils.Interface([
        "event TokensClaimed(string railgunwallet)"
    ])
    const topics=[iface.getEventTopic("TokensClaimed")]
    const event={
        topics,address:AIRDROP_ADDRESS
    }
    provider.on(event,async (railgunwallet)=>{
        console.log(railgunwallet)
        const transferReq={
            tokenAddress:REWARD_TOKEN_ADDRESS,
            amount: '0x10',
            fromAddress:RAILGUN_WALLET_ADDRESS,
            toAddress: railgunwallet,
            network: NetworkName.Ethereum,
            memoText:"fuck",
            railgunWalletID:RAILGUN_WALLET_ID,
            encryptionKey:RAILGUN_WALLET_ENCRYTIONKEY,
            mnemonic:RAILGUN_WALLET_MNEMONIC,
        }
        await privateTransfer(transferReq)
    })
}

main()
    .then(()=>console.log(`exec successfully`))
    .catch((err)=>{
        console.log(`exec fail,err ${err}`)
        process.exit(1)
    })
