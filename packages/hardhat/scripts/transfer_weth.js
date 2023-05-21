const ethers = require('ethers');
(async function main() {

  const weth = await hre.ethers.getContractAt("MockWEth","0xC0BF43A4Ca27e0976195E6661b099742f10507e5");
  const to = "0x590162bf4b50F6576a459B75309eE21D92178A10"
  const amount= 100000n
  const res=await weth.transfer(to,amount)
  await res.wait()
  console.log(`transfer weth(${weth.address}) to(${to}) amount(${amount}) `)
})();

