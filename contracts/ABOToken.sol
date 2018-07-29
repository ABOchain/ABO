pragma solidity ^0.4.24;

import "zeppelin-solidity/contracts/token/ERC20/StandardToken.sol";

contract ABOToken is StandardToken {

    string public constant name = "ABOToken";
    string public constant symbol = "ABOT";
    uint8 public constant decimals = 18;

    // 토큰발행량 * 변환값
    uint256 public INITIAL_SUPPLY = 1000 * (10 ** uint256(decimals));

    constructor(address initialAccount) public {
        totalSupply_ = INITIAL_SUPPLY;
        balances[initialAccount] = INITIAL_SUPPLY;
    }
}