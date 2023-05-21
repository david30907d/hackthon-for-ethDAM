const hre = require("hardhat");

async function main() {
  const MockWEth = await hre.ethers.getContractFactory("MockWEth");
  let mockWEth = await MockWEth.deploy();
  console.log('Deployed mockWEth Address:', mockWEth.address);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
