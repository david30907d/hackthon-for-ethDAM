import { ethers } from 'ethers';

const contractAddress = '0x123456789abcdef...'; // Replace with your contract address
const contractABI = [...]; // Replace with your contract's AB

const MyComponent = () => {
  const initializeMetaMask = async () => {
    await window.ethereum.enable();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    return new ethers.Contract(contractAddress, contractABI, signer);
  };

  const executeContractCall = async () => {
    try {
      const contract = await initializeMetaMask();
      const result = await contract.yourFunction(); // Replace `yourFunction` with the actual function you want to call
      console.log(result); // Handle or process the result of the contract call
    } catch (error) {
      console.error(error);
    }
  };

  const sendTransaction = async () => {
    try {
      const contract = await initializeMetaMask();
      const transaction = await contract.yourFunction(); // ReplaceI `yourFunction` with the actual function you want to call
      const receipt = await transaction.wait();
      console.log('Transaction receipt:', receipt)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button onClick={executeContractCall}>Execute Contract Call</button>
      <button onClick={sendTransaction}>Send Transaction</button>
    </div>
  );
};

export default MyComponent;
