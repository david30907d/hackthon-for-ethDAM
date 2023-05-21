import { Container } from "@/components/Container";
import MetaMaskOnboarding from '@metamask/onboarding';
import { MyComponent } from "@/components/Wallet";
import { ethers } from "ethers";
import { Title } from "@/components/Title";
import { useRouter } from "next/router";
import {
  SismoConnectButton,
  SismoConnectClientConfig,
  SismoConnectResponse,
  AuthType
} from "@sismo-core/sismo-connect-react";
import axios from "axios";
import { useState, useRef, useEffect } from "react";

const ONBOARD_TEXT = 'Click here to install MetaMask!';
const CONNECT_TEXT = 'Connect';
const CONNECTED_TEXT = 'Connected';

export function OnboardingButton() {
  const [buttonText, setButtonText] = useState(ONBOARD_TEXT);
  const [isDisabled, setDisabled] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const onboarding = useRef();

  useEffect(() => {
    if (!onboarding.current) {
      onboarding.current = new MetaMaskOnboarding();
    }
  }, []);

  useEffect(() => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      if (accounts.length > 0) {
        setButtonText(CONNECTED_TEXT);
        setDisabled(true);
        onboarding.current.stopOnboarding();
      } else {
        setButtonText(CONNECT_TEXT);
        setDisabled(false);
      }
    }
  }, [accounts]);

  useEffect(() => {
    function handleNewAccounts(newAccounts) {
      setAccounts(newAccounts);
    }
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then(handleNewAccounts);
      window.ethereum.on('accountsChanged', handleNewAccounts);
      return () => {
        window.ethereum.removeListener('accountsChanged', handleNewAccounts);
      };
    }
  }, []);

  const onClick = () => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((newAccounts) => setAccounts(newAccounts));
    } else {
      onboarding.current.startOnboarding();
    }
  };
  return (
    <button disabled={isDisabled} onClick={onClick}>
      {buttonText}
    </button>
  );
}


// const contract = new ethers.Contract(contractAddress, contractABI, provider);
async function executeContractCall() {
  const result = await contract.claimTokens();

  console.log(result); // Handle or process the result of the contract call
}


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
  const [RailgunWallet, setRailgunWallet] = useState('');
  const router = useRouter();

const handleInputChange = (event) => {
    setRailgunWallet(event.target.value);
  };

const executeFunction = () => {
    // Use the inputValue in your function
    console.log('Input value:', inputValue);
  };

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
           Claim your airdrop!
        </Title>
        <OnboardingButton />
        <br />
        <br />
        <br />
        <br />
        <br />
        <div>
        go <a href="https://app.railway.xyz/" >[here]</a> to create a railgun wallet and enter it below
        </div>
        <br />
        <br />
        <br />
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
            :(
<div>
      <input type="text" value={RailgunWallet} onChange={handleInputChange} />
      <button onClick={executeContractCall()}>Execute</button>
      {/* Other elements and functionality */}
    </div>
    )
        }
    </Container>
  );
}
