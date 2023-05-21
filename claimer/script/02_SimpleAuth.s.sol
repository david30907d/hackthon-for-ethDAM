// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import {SimpleAuth} from "contracts/SimpleAuth.sol";

contract DeploySimpleAuth is Script {
    bytes16 public constant APP_ID = 0xc86a85e076f3e031ae60b797950f4fed;

    function run() public {
        vm.startBroadcast();
        SimpleAuth simpleAuth = new SimpleAuth({_appId: APP_ID});
        console.log("SimpleAuth Contract deployed at", address(simpleAuth));
        vm.stopBroadcast();
    }
}
