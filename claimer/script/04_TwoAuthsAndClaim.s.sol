// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import {TwoAuthsAndClaim} from "contracts/TwoAuthsAndClaim.sol";

contract DeployTwoAuthsAndClaim is Script {
    bytes16 public constant APP_ID = 0xc86a85e076f3e031ae60b797950f4fed;
    bytes16 public constant GROUP_ID = 0xe9ed316946d3d98dfcd829a53ec9822e;

    function run() public {
        vm.startBroadcast();
        TwoAuthsAndClaim twoAuthsAndClaim = new TwoAuthsAndClaim({_appId: APP_ID, _groupId: GROUP_ID});
        console.log("TwoAuthsAndClaim Contract deployed at", address(twoAuthsAndClaim));
        vm.stopBroadcast();
    }
}