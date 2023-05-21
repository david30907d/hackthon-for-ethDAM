import fs from "fs";
import {
    ArtifactStore, createRailgunWallet, gasEstimateForUnprovenTransfer,
    getShieldPrivateKeySignatureMessage,
    populateShieldBaseToken,
    startRailgunEngine,
    populateProvedTransfer, generateTransferProof
} from "@railgun-community/quickstart";
import {Level} from "level";
import {
    deserializeTransaction, EVMGasType,
    FallbackProviderJsonConfig, FeeTokenDetails, NetworkName,
    RailgunERC20Amount, RailgunERC20AmountRecipient, RailgunWalletInfo,
    StartRailgunEngineResponse, TransactionGasDetailsSerialized
} from "@railgun-community/shared-models";
import {ethers, Wallet} from "ethers";

export const ETH_PROVIDERS_JSON: FallbackProviderJsonConfig = {
    // "chainId": 1,
    // "providers": [
    //     {
    //         "provider": "http://127.0.0.1:8545/",
    //         "priority": 1,
    //         "weight": 1
    //     },
    //     // {
    //     //     "provider": "https://cloudflare-eth.com/",
    //     //     "priority": 1,
    //     //     "weight": 1
    //     // },
    //     {
    //         "provider": "https://rpc.ankr.com/eth",
    //         "priority": 2,
    //         "weight": 1
    //     }
    // ],
    "chainId": 31337,
    "providers": [
        {
            "provider": "http://127.0.0.1:8545/",
            "priority": 1,
            "weight": 1
        },
    ],
}


const createDownloadDirPath = (documentsDir: string, path: string) => {
    return `${documentsDir}/${path}`;
};

const createArtifactStore = (documentsDir: string): ArtifactStore => {
    const getFile = async (path: string) => {
        return fs.promises.readFile(createDownloadDirPath(documentsDir, path));
    };

    const storeFile = async (
        dir: string,
        path: string,
        item: string | Buffer,
    ) => {
        await fs.promises.mkdir(createDownloadDirPath(documentsDir, dir), {
            recursive: true,
        });
        await fs.promises.writeFile(
            createDownloadDirPath(documentsDir, path),
            item,
        );
    };

    const fileExists = (path: string): Promise<boolean> => {
        return new Promise(resolve => {
            fs.promises
                .access(createDownloadDirPath(documentsDir, path))
                .then(() => resolve(true))
                .catch(() => resolve(false));
        });
    };

    return new ArtifactStore(getFile, storeFile, fileExists);
};

export const initialize = (): StartRailgunEngineResponse => {

    // Name for your wallet implementation.
    // Encrypted and viewable in private transaction history.
    // Maximum of 16 characters, lowercase.
    const walletSource = 'quickstart demo';

    // LevelDOWN compatible database for storing encrypted wallets.
    const db = new Level('./db');

    // Whether to forward Engine debug logs to Logger.
    const shouldDebug = true;

    // Persistent store for downloading large artifact files.
    // See Quickstart Developer Guide for platform implementations.

    // Whether to download native C++ or web-assembly artifacts.
    // True for mobile. False for nodejs and browser.
    const useNativeArtifacts = false;

    // Whether to skip merkletree syncs and private balance scans.
    // Only set to TRUE in shield-only applications that don't
    //  load private wallets or balances.
    const skipMerkletreeScans = false;

    const artifactStore = createArtifactStore('./store');
    return startRailgunEngine(
        walletSource,
        db,
        shouldDebug,
        artifactStore,
        useNativeArtifacts,
        skipMerkletreeScans,
    )
}


export interface ShieldReq{
    railgunAddress: string
    tokenAddress: string
    amount: string
    network: NetworkName
}

export async function shield(wallet: Wallet,req: ShieldReq){
    const shieldSignatureMessage = getShieldPrivateKeySignatureMessage();
    const shieldPrivateKey = ethers.utils.keccak256(
        await wallet.signMessage(shieldSignatureMessage),
    );
    const wrappedERC20Amount: RailgunERC20Amount = {
        tokenAddress: req.tokenAddress,
        amountString: req.amount,
    };
    const {serializedTransaction, error} = await populateShieldBaseToken(
        req.network,
        req.railgunAddress,
        shieldPrivateKey,
        wrappedERC20Amount,
    );
    if (error || !serializedTransaction) {
        console.log(`populateShieldBaseToken:${error}`)
        return
    }

    const txnReq = deserializeTransaction(serializedTransaction,null,await wallet.getChainId());
    const res=await wallet.sendTransaction(txnReq);
    await res.wait()
}


export interface PrivateTransfer{
    network: NetworkName
    tokenAddress: string
    fromAddress: string
    toAddress: string
    amount: string
    railgunWalletID: string
    encryptionKey: string
    mnemonic:string
    memoText:string
}
export async function privateTransfer(wallet: Wallet,req: PrivateTransfer){
    // Gas price, used to calculate Relayer Fee iteratively.
    const originalGasDetailsSerialized: TransactionGasDetailsSerialized = {
        evmGasType: EVMGasType.Type2, // Depends on the chain (BNB uses type 0)
        gasEstimateString: '0x00', // Always 0, we don't have this yet.
        maxFeePerGasString: '0x100000', // Current gas Max Fee
        maxPriorityFeePerGasString: '0x010000', // Current gas Max Priority Fee
    }

// Token Fee for selected Relayer.
    const feeTokenDetails: FeeTokenDetails = {
        tokenAddress: req.tokenAddress,
        feePerUnitGas: '0x100000',
    }

// Whether to use a Relayer or self-signing wallet.
// true for self-signing, false for Relayer.
    const sendWithPublicWallet = false;

    const erc20AmountRecipients: RailgunERC20AmountRecipient[] = [
        {
            tokenAddress: req.toAddress,
            amountString: req.amount,
            recipientAddress: req.toAddress,
        },
    ];

    const overallBatchMinGasPrice = '0x10000';

    const progressCallback = (progress: number) => {
        // Handle proof progress (show in UI).
        // Proofs can take 20-30 seconds on slower devices.
    };

    const {error:genTransferErr} = await generateTransferProof(
        req.network,
        req.railgunWalletID,
        req.encryptionKey,
        true,
        req.memoText,
        erc20AmountRecipients,
        [], // nftAmountRecipients
        feeTokenDetails,
        sendWithPublicWallet,
        overallBatchMinGasPrice,
        progressCallback,
    );
    if (genTransferErr) {
        console.log(`generateTransferProof: ${genTransferErr}`)
    }
    let {serializedTransaction, error} = await populateProvedTransfer(
        req.network,
        req.railgunWalletID,
        true,
        req.memoText,
        erc20AmountRecipients,
        [], // nftAmountRecipients
        feeTokenDetails,
        sendWithPublicWallet,
        null,
        originalGasDetailsSerialized,
    );
    if (error || !serializedTransaction) {
        console.log(`populateProvedTransfer:${error}`)
        return
    }
    const txnReq = deserializeTransaction(serializedTransaction,null,await wallet.getChainId());
    const res=await wallet.sendTransaction(txnReq);
    await res.wait()
}
