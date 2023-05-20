pragma solidity ^0.8.0;

// Import necessary interfaces from OpenZeppelin or define them yourself
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
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
    IERC20 public token;
    IERC4626 public vault;

    constructor(
        address _boundAccountRegistry,
        address _daiToken,
        address _vault
    ) {
        boundAccountRegistry = ERC6551Registry(_boundAccountRegistry);
        token = IERC20(_daiToken);
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
        return boundAccountAddress;
    }

    function depositToVault(uint256 amount, address from) external {
        token.transferFrom(from, address(this), amount); // Transfer DAI to this contract
        token.approve(address(vault), amount); // Approve the DAI transfer
        vault.deposit(amount); // Deposit to the vault
    }
}
