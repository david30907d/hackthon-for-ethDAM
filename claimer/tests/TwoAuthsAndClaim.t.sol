// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import {TwoAuthsAndClaim} from "../contracts/TwoAuthsAndClaim.sol";
import {BaseTest} from "./base/BaseTest.t.sol";

contract TwoAuthsAndClaimTest is BaseTest {
  bytes16 public constant APP_ID = 0x112a692a2005259c25f6094161007967;
  bytes16 public constant GROUP_ID = 0xe9ed316946d3d98dfcd829a53ec9822e;

  TwoAuthsAndClaim public twoAuthsAndClaim;

  function setUp() public {
    twoAuthsAndClaim = new TwoAuthsAndClaim(APP_ID, GROUP_ID);
  }

  function test_TwoAuthsAndClaim() public {
    assertEq(twoAuthsAndClaim.counter(), 0);

    // Twitter account ownership (optional)
    // GitHub account ownership (required)
    // group membership of GROUP_ID
    // signature of uint256 3
    bytes
      memory response = hex"0000000000000000000000000000000000000000000000000000000000000020112a692a2005259c25f609416100796700000000000000000000000000000000b8e2054f8a912367e38a22ce773328ff000000000000000000000000000000007369736d6f2d636f6e6e6563742d76310000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000e00000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000300000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000052000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000c068796472612d73322e310000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001e000000000000000000000000000000000000000000000000000000000000004c00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000e9ed316946d3d98dfcd829a53ec9822e000000000000000000000000000000006c617465737400000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000c0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002c00bbf22ffab6eab49d6b2bd83fda286872ee8ee523c6334cb865b3559d70ebbd6218e51c6bf02b5790b1e3514d39f1305efeaf5d3ad4f4e8a3b0afd3db7da3ea01c6bba8056df39964113ba5404f8739e7907537285f4d2403bc1e74617947853305e834f4cf638992780d658084e64bfa0594a7d3d56eefe243fda9d5bce6bd717fe8fd7bb1b43707a57b639e106a6bda8bb23133e9395dcd60d48466d422f0d216dd77c5e8d3e210a9d1dd0c1d8a0bbe9bc562777ed845939e8cb5e90772fa00e43a9474bcb8d9e2fe50b56902d73ff39df12d49260d825288f58b489011da609fd0ade5669ffbdf2a71a12cbc7d10260cdc93283a723a8d786d8806813c625000000000000000000000000000000000000000000000000000000000000000000c620431992bb5a1818e1ef290d79b3c8f39838541f408b4e9d3ff4af71f8572ab71fb864979b71106135acfa84afc1d756cda74f8f258896f896b4864f025630423b4c502f1cd4179a425723bf1e15c843733af2ecdee9aef6a0451ef2db741747819efd5874bbd3fbe5b752aa2289f5fd40a5471928df07e35aab71f3d5ce21a63725868405196971cad8f2e46ed111118a9869929d0f87c154c9c60d015f124bd705fd7680828b9d00982d08a5baef8249ad2e0dbcce3597a9afb1ad0cb90000000000000000000000000000000000000000000000000000000000000001285bf79dc20d58e71b9712cb38c420b9cb91d3438c8e3dbaf07829b03ffffffc00000000000000000000000000000000000000000000000000000000000000002d495b4c6618a926b0a741ad2e1ff25ace5558f09c853bac3aa5306aba598bd30a13966ba7f5bb9e347b50a2b7fa12a296b75b5e901fdee64c14cc69b5645bc200000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000001a068796472612d73322e310000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001c000000000000000000000000000000000000000000000000000000000000004a000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000100100000000000000000000000000009999037000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002c02796ece48617e3bdb79c6c366779fc7e487db852eb6ad220eee1e4c977130f681ebd5181715b9cab3b4db5c77d95b27b0dace696c3e4573124d88b596980fd670b3faf6ac3da4f16722fbee4f1f9ad972a670910b70427019f344963050af2e919bf256a448f572bc9e9f902746bfb662d9c1c755a20054067e33c611b8be81127f17f5ebf853129ccb0c84c1e4a4d8ef10ef7bf678d8adad25de6e7a8b6916d0f912d88ad130639a8a5cef363756dba3baef35f5fb1af66c52224ea59e3567d0ce2ba739214a0e78540077933f39a1bc55791c25914478775a2622155d0aafd29cc7e2e10e15b373a6b5ff54374515bf371a028aae6bf491447c46bcadda46c000000000000000000000000100100000000000000000000000000009999037000c620431992bb5a1818e1ef290d79b3c8f39838541f408b4e9d3ff4af71f8572ab71fb864979b71106135acfa84afc1d756cda74f8f258896f896b4864f025630423b4c502f1cd4179a425723bf1e15c843733af2ecdee9aef6a0451ef2db740000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002d495b4c6618a926b0a741ad2e1ff25ace5558f09c853bac3aa5306aba598bd30a13966ba7f5bb9e347b50a2b7fa12a296b75b5e901fdee64c14cc69b5645bc2000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000";

    twoAuthsAndClaim.incrementWithSismoConnect(response, 3);
    assertEq(twoAuthsAndClaim.counter(), 3);
  }
}