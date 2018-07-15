pragma solidity ^0.4.24;

contract ABO {
    struct BloodPack {
        bool[4] availBlood;
        uint bloodInfo;
        bytes32 bloodPackID;
        uint validTime;
    }
    address owner;
    BloodPack bloodPack;

    constructor() public {
        owner = msg.sender;
        bloodPack.availBlood[1] = true;
        bloodPack.validTime = 1; 
    }

    modifier restricted() {
        if (msg.sender != owner) _;
    }

    function setBloodInfo(uint bloodInfo) public restricted {
        bloodPack.bloodInfo = bloodInfo;
    }

    function getBloodInfo() public returns(uint) {
        return bloodPack.bloodInfo;
    }

    function setBloodPackID(bytes bloodPackID) public restricted{
        bloodPack.bloodPackID = keccak256(bloodPackID);
    }

    function getBloodPackID() public returns(bytes32) {
        return bloodPack.bloodPackID;
    }
}
