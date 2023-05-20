const hre = require("hardhat");

async function main() {
  const lottery = await hre.ethers.getContractFactory("Lottery");
  const Lottery = await lottery.deploy("0xdb46d1dc155634fbc732f92e853b10b288ad5a1d","0xdb46d1dc155634fbc732f92e853b10b288ad5a1d", "0x6B175474E89094C44Da98b954EedeAC495271d0F", "0xab7FA2B2985BCcfC13c6D86b1D5A17486ab1e04C");
  await Lottery.deployed();
  console.log('Deployed Lottery Address:', Lottery.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })