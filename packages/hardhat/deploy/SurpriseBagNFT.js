const hre = require("hardhat");

async function main() {
  const MockWEth = await hre.ethers.getContractFactory("MockWEth");
  let mockWEth = await MockWEth.deploy();
  console.log('Deployed mockWEth Address:', mockWEth.address);

  const TokenizedVault = await hre.ethers.getContractFactory("TokenizedVault");
  let tokenizedVault = await TokenizedVault.deploy(mockWEth.address);
  console.log('Deployed tokenizedVault Address:', tokenizedVault.address);
  
  const SurpriseBagNFT = await hre.ethers.getContractFactory("SurpriseBagNFT");
  let surpriseBagNFT = await SurpriseBagNFT.deploy("0x02101dfB77FDE026414827Fdc604ddAF224F0921", mockWEth.address, tokenizedVault.address);
  console.log('Deployed surpriseBagNFT Address:', surpriseBagNFT.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })