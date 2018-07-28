pragma solidity ^0.4.24;


import "./token/StandardToken.sol";


/**
 * @title ABOToken
 * @dev Very simple ERC20 Token example, where all tokens are pre-assigned to the creator.
 * Note they can later distribute these tokens as they wish using `transfer` and other
 * `StandardToken` functions.
 */
contract ABOToken is StandardToken {
    string public constant name = "ABOToken";
    string public constant symbol = "ABOT";
    uint8 public constant decimals = 18;

    // 토큰발행량 * 변환값
    uint256 public constant INITIAL_SUPPLY = 1 * (10 ** uint256(decimals));

    /**
    * @dev Constructor that gives msg.sender all of existing tokens.
    */
    constructor() public {
        totalSupply_ = INITIAL_SUPPLY;
        balances[msg.sender] = INITIAL_SUPPLY;
        emit Transfer(address(0), msg.sender, INITIAL_SUPPLY);
    }
}