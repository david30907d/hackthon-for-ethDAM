// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import {SimpleAuth} from "../contracts/SimpleAuth.sol";

contract SimpleAuthTest is Test {
  bytes16 public constant APP_ID = 0x112a692a2005259c25f6094161007967;

  SimpleAuth public simpleAuth;

  function setUp() public {
    simpleAuth = new SimpleAuth(APP_ID);
  }

  function test_SimpleAuth() public {
    assertEq(simpleAuth.counter(), 0);

    // Data Vault ownership
    // signature of uint256 3
    bytes
      memory response = hex"0000000000000000000000000000000000000000000000000000000000000020112a692a2005259c25f609416100796700000000000000000000000000000000b8e2054f8a912367e38a22ce773328ff000000000000000000000000000000007369736d6f2d636f6e6e6563742d76310000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000e0000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000030000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000001a068796472612d73322e310000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001c000000000000000000000000000000000000000000000000000000000000004a0000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000012d495b4c6618a926b0a741ad2e1ff25ace5558f09c853bac3aa5306aba598bd300000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002c00ea6ac5f91a82865f04f748fe43b06c037ce2dedab96d31a1a96b065853c5aed134b53467afd11e8e408bf99f5ab5962c8a923797054a638cc3da688f253cc892b297918ba598ed01a8974fb7a6b55cb7dff34e73b6f470cad5f03f53475491f0f060514b49e3e827495bc32ca8b127f0c0f6e48e3122aecab3c462c9c4675e325aa1d68fd4314bef85839d2b226ad877c164551450312063f4b9c731093f9462a8c34c161c4f9828753051e659c013286b31d476220420cedbd1be4ec2d39301117eea318b3fdf9b4b295b6d9773f572aa7e414107591f6ea01487e2e61841408643471d5f86a0684b2330e8493062d787ece50ed920cd8a1675b6ab1f3c1f2000000000000000000000000000000000000000000000000000000000000000000c620431992bb5a1818e1ef290d79b3c8f39838541f408b4e9d3ff4af71f8572ab71fb864979b71106135acfa84afc1d756cda74f8f258896f896b4864f025630423b4c502f1cd4179a425723bf1e15c843733af2ecdee9aef6a0451ef2db740000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002d495b4c6618a926b0a741ad2e1ff25ace5558f09c853bac3aa5306aba598bd30a13966ba7f5bb9e347b50a2b7fa12a296b75b5e901fdee64c14cc69b5645bc2000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000";

    simpleAuth.incrementWithSismoConnect(response, 3);
    assertEq(simpleAuth.counter(), 3);
  }
}
