import { Container } from "@/components/Container";
import { Title } from "@/components/Title";
import { useRouter } from "next/router";
import { createRailgunWallet } from '@railgun-community/quickstart';

import { entropyToMnemonic, randomBytes } from 'ethers/utils';
import {
    deserializeTransaction,
    FallbackProviderJsonConfig, NETWORK_CONFIG,
    NetworkName,
    RailgunERC20Amount,
    StartRailgunEngineResponse
} from "@railgun-community/shared-models";
import {
  SismoConnectButton,
  SismoConnectClientConfig,
  SismoConnectResponse,
  AuthType
} from "@sismo-core/sismo-connect-react";
import axios from "axios";
import { useState } from "react";

export const sismoConnectConfig: SismoConnectClientConfig = {
  appId: "0xc86a85e076f3e031ae60b797950f4fed",
  devMode: {
    // enable or disable dev mode here to create development groups and use the development vault.
    enabled: true,
  },
};

export default function OffChainAuthAndClaim() {
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const router = useRouter();
  const creationBlockNumberMap: MapType<number> = {
      [NetworkName.Ethereum]: 15725700,
      [NetworkName.Polygon]: 3421400,
  }
  

const mnemonic = entropyToMnemonic(randomBytes(16));
  const railgunWallet = createRailgunWallet(
      "ethdam", 
      mnemonic, 
  );
  const id = railgunWallet.id;

  const verify = async (response: SismoConnectResponse) => {
    setVerifying(true);
    console.log(response)
    try {
        await axios.post(`/api/verify-two-auths-claim-and-signature`, {
            response,
        })
        setIsVerified(true);
    } catch (e) {
        setError("Invalid response")
        console.error(e);
    } finally {
        setVerifying(false);
    }
  }

  return (
    <Container>
        <Title>
            CREATE YOUR RAILGUN WALLET
        </Title>
        {
            !isVerified ?
            <>
                <SismoConnectButton
                    config={sismoConnectConfig}
                    auths={[
                      {authType: AuthType.TWITTER, isOptional: true},
                      {authType: AuthType.GITHUB}
                    ]}
                    claims={[{ groupId: "0x8b64c959a715c6b10aa8372100071ca7" }]}
                    signature={{message: "0x1234568"}}
                    onResponse={(response: SismoConnectResponse) => verify(response)}
                    verifying={verifying}
                    callbackPath={"/off-chain/two-auths-claim-and-signature"}
                    overrideStyle={{marginBottom: 10}}
                />
                <>
                {error}
                </>
            </>
            :
          <li onClick={() => router.push("/off-chain/claim")}>
            <h3>Claim your mystery box</h3>
          </li>
        }
    </Container>
  );
}
