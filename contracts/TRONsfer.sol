// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;
import "./ITRC20.sol";

contract TRONsfer {
    address owner;

    mapping(string => uint256) public trxBalance;
    mapping(string => ITRC20[]) public trc20Accounts; // user => lists of trc20
    mapping(string => mapping(ITRC20 => uint256)) public trc20AccountBalance; // user => trc20Address => amount

    constructor() {
        owner = msg.sender;
    }

    modifier _ownerOnly() {
        require(msg.sender == owner, "owner only transaction.");
        _;
    }

    event TransferTrxDetail(string providerId, uint256 amount);
    function transferTrx(string calldata providerId) external payable {
        trxBalance[providerId] += msg.value;
        emit TransferTrxDetail(providerId, msg.value);
    }

    event TransferTrc20Detail(string providerId, ITRC20 token, uint256 amount);
    function transferTrc20(string calldata providerId, ITRC20 token, uint256 amount) external {
        uint256 trc20balance = token.balanceOf(address(msg.sender));
        require(amount <= trc20balance, "insufficient balance");

        token.transferFrom(msg.sender, address(this), amount);

        if (trc20AccountBalance[providerId][token] == 0) { // is 0 if not explicitly set
            trc20Accounts[providerId].push(token);
        }

        trc20AccountBalance[providerId][token] += amount;
        emit TransferTrc20Detail(providerId, token, amount);
    }

    event WithdrawTrxToWalletDetail(string providerId, uint256 amount, address wallet);
    function withdrawTrxToWallet(string calldata providerId, uint256 amountInSun, address payable wallet) _ownerOnly external payable {
        require(amountInSun <= trxBalance[providerId], "insufficient balance");

        payable(wallet).transfer(amountInSun);
        trxBalance[providerId] -= amountInSun;

        emit WithdrawTrxToWalletDetail(providerId, amountInSun, wallet);
    }
    
    event WithdrawTrc20ToWalletDetail(string providerId, uint256 amount, address wallet, ITRC20 token);
    function withdrawTrc20ToWallet(string calldata providerId, ITRC20 token, uint256 amount, address wallet) _ownerOnly external payable {
        require(amount <= trc20AccountBalance[providerId][token], "insufficient balance");

        ITRC20(token).transfer(wallet, amount);
        trc20AccountBalance[providerId][token] -= amount;

        emit WithdrawTrc20ToWalletDetail(providerId, amount, wallet, token);
    }

    event TransferTrxToProviderDetail(string providerId, string toProviderId, uint256 amount);
    function transferTrxToProvider(string calldata providerId, string calldata toProviderId, uint256 amount) _ownerOnly external {
        require(amount <= trxBalance[providerId], "insufficient balance");

        trxBalance[providerId] -= amount;
        trxBalance[toProviderId] += amount;

        emit TransferTrxToProviderDetail(providerId, toProviderId, amount);
    }

    event TransferTrc20ToProviderDetail(string providerId, string toProviderId, uint256 amount, ITRC20 token);
    function transferTrc20ToProvider(string calldata providerId, string calldata toProviderId, ITRC20 token, uint256 amount) _ownerOnly external payable {
        require(amount <= trc20AccountBalance[providerId][token], "insufficient balance");

        trc20AccountBalance[providerId][token] -= amount;
        trc20AccountBalance[toProviderId][token] += amount;

        emit TransferTrc20ToProviderDetail(providerId, toProviderId, amount, token);
    }
}
