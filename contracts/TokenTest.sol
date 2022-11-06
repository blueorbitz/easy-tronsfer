// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";

contract TronTest is ERC20 {
    uint public INITIAL_SUPPLY = 100_000_000_000_000_000_000;

    constructor() ERC20("TronToken", "T20") { 
	    _mint(msg.sender, INITIAL_SUPPLY);
    }
}