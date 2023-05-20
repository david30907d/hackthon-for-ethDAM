const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("My Dapp", function () {
  let surpriseBagNFT;
  let tokenizedVault;
  let mockWEth;

  // quick fix to let gas reporter fetch data from gas station & coinmarketcap
  before((done) => {
    setTimeout(done, 2000);
  });

  describe("YourContract", function () {
    it("Should deploy SupriseBagNFT", async function () {
      const MockWEth = await ethers.getContractFactory("MockWEth");
      mockWEth = await MockWEth.deploy();

      const TokenizedVault = await ethers.getContractFactory("TokenizedVault");
      tokenizedVault = await TokenizedVault.deploy(mockWEth.address);
      
      const SurpriseBagNFT = await ethers.getContractFactory("SurpriseBagNFT");
      surpriseBagNFT = await SurpriseBagNFT.deploy("0x02101dfB77FDE026414827Fdc604ddAF224F0921", mockWEth.address, tokenizedVault.address);
    });

    describe("createBoundAccount()", function () {
      it("Should be able to set a new purpose", async function () {
        let tx = await surpriseBagNFT.createBoundAccount("0xe3c8e910c80d65d79bb61e249bea66b7498ffe84", 1, "0xe3c8e910c80d65d79bb61e249bea66b7498ffe84", 1534, 0, '0x');;
        const receipt = await tx.wait();  // Wait for the transaction to be mined
        // The transaction should have emitted a ValueChanged event
        expect(receipt.events).to.not.be.undefined;
        // Find the ValueChanged event
        const event = receipt.events.find(e => e.event === 'createBoundAccountEvent');
        expect(event).to.not.be.undefined;
        const nftWalletAddress = receipt.events[0].args.boundAccountAddress;
        console.log(`nftWalletAddress: ${nftWalletAddress}`);

        await mockWEth.approve(surpriseBagNFT.address, ethers.utils.parseUnits("100", 18))
        await surpriseBagNFT.depositToVault(receipt.events[0].args.boundAccountAddress, 100);
        const mockWethBalance = await mockWEth.balanceOf(tokenizedVault.address);
        console.log("mockWethBalance of vault: ", mockWethBalance.toString())
        
        const tokenizedVaultBalance = await tokenizedVault.balanceOf(nftWalletAddress);
        console.log(`tokenizedVaultBalance of NFT address: ${nftWalletAddress}`, tokenizedVaultBalance.toString())
      });
    });
  });
});
