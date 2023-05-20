pragma solidity ^0.8.0;

// Import necessary interfaces from OpenZeppelin or define them yourself
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {WETH} from "solmate/src/tokens/WETH.sol";
// import "@openzeppelin/contracts/token/ERC20/extensions/ERC4626.sol";
import "@openzeppelin/contracts/interfaces/IERC4626.sol";

interface ERC6551Registry {
    function createAccount(
        address implementation,
        uint256 chainId,
        address tokenContract,
        uint256 tokenId,
        uint256 seed,
        bytes calldata initData
    ) external returns (address);
}

contract SurpriseBagNFT {
    ERC6551Registry public boundAccountRegistry;
    WETH weth;
    IERC4626 public vault;
    event createBoundAccountEvent(address boundAccountAddress, uint256 tokenId);

    constructor(
        address _boundAccountRegistry,
        address _weth,
        address _vault
    ) {
        boundAccountRegistry = ERC6551Registry(_boundAccountRegistry);
        weth = WETH(payable(_weth));
        vault = IERC4626(_vault);
    }

    function createBoundAccount(
        address implementation,
        uint256 chainId,
        address tokenContract,
        uint256 tokenId,
        uint256 seed,
        bytes calldata initData
    ) external returns (address) {
        address boundAccountAddress = boundAccountRegistry.createAccount(
            implementation,
            chainId,
            tokenContract,
            tokenId,
            seed,
            initData
        );
        emit createBoundAccountEvent(boundAccountAddress, tokenId);
        return boundAccountAddress;
    }

    function depositToVault(address nftWalletAddress, uint256 amount) external {
        weth.transferFrom(msg.sender, address(this), amount); // Transfer weth to this contract
        weth.approve(address(vault), amount); // Approve the wDAI transfer
        // vault.deposit(amount, address(this)); // Deposit to the vault
        vault.deposit(amount, nftWalletAddress); // Deposit to nftWalletAddress's vault   
    }
}
