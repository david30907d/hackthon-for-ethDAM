const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("My Dapp", function () {
  let surpriseBagNFT;
  let tokenizedVault;

  // quick fix to let gas reporter fetch data from gas station & coinmarketcap
  before((done) => {
    setTimeout(done, 2000);
  });

  describe("YourContract", function () {
    it("Should deploy SupriseBagNFT", async function () {
      const TokenizedVault = await ethers.getContractFactory("TokenizedVault");
      tokenizedVault = await TokenizedVault.deploy("0x6B175474E89094C44Da98b954EedeAC495271d0F", "vault", "vDAI");
      
      const SurpriseBagNFT = await ethers.getContractFactory("SurpriseBagNFT");
      surpriseBagNFT = await SurpriseBagNFT.deploy("0x02101dfB77FDE026414827Fdc604ddAF224F0921", "0x6B175474E89094C44Da98b954EedeAC495271d0F", tokenizedVault.address);
    });

    describe("setPurpose()", function () {
      it("Should be able to set a new purpose", async function () {
        const address = await surpriseBagNFT.createBoundAccount("0xe3c8e910c80d65d79bb61e249bea66b7498ffe84", 1, "0xe3c8e910c80d65d79bb61e249bea66b7498ffe84", 1534, 0, '0x');;
        console.log(address)
      });
    });
  });
});
