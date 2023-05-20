require('dotenv').config();
const ethers = require('ethers');
const ethersProvider = new ethers.providers.JsonRpcProvider("https://eth-sepolia.g.alchemy.com/v2/Ejxd3o1JAwdP6X67VxVwAMW1zcVmTKn3");
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, ethersProvider);
const daiContract = new ethers.Contract('0xaeB7E4617dD35C594246f368278b62E1107978dc', require('../IERC20.json').abi, signer);

(async function main() {
    console.log(await daiContract.approve("0x6093480B61B068E57260cB0827A001BF91748e0F", ethers.utils.parseUnits("100000000", 18)));
    console.log((await daiContract.allowance(process.env.PUBLIC_KEY, "0x6093480B61B068E57260cB0827A001BF91748e0F")).toString());
})();

