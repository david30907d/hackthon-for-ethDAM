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
    getProver, Groth16,
    loadProvider, setLoggers
} from "@railgun-community/quickstart";
import {ETH_PROVIDERS_JSON, initialize, privateTransfer, shield} from "./railgun";
// @ts-ignore
import {groth16} from 'snarkjs';

const logMessage: (msg: any) => void = console.log;
const logError: (err: any) => void = console.error;

setLoggers(logMessage, logError);
initialize()
getProver().setSnarkJSGroth16(groth16 as Groth16);

async function main() {
    const {feesSerialized} = await loadProvider(
        ETH_PROVIDERS_JSON,
        NetworkName.Ethereum,
        true,
    );
    const provider = new ethers.providers.JsonRpcProvider(RPC_ENDPOINT)
    const shieldReq = {
        tokenAddress: REWARD_TOKEN_ADDRESS,
        amount: '0x10',
        railgunAddress: RAILGUN_WALLET_ADDRESS,
        network: NetworkName.Ethereum,
    }
    const wallet=new Wallet(ADMIN_PRIVATE_KEY,provider)
    await shield(wallet, shieldReq)
}

main()
    .then(() => console.log(`exec successfully`))
    .catch((err) => {
        console.log(`exec fail,err ${err}`)
        process.exit(1)
    })
