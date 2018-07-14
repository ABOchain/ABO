pragma solidity ^0.4.24;

contract ABO {
    struct BloodPack {
        bool[4] availBlood;
        uint bloodInfo;
        bytes32 bloodPackID;
        uint validTime;
    }

    BloodPack bloodPack;

    constructor() public {
        bloodPack.validTime = 1; 
    }

    function setBloodInfo(uint bloodInfo) public {
        bloodPack.bloodInfo = bloodInfo;
    }

    function getBloodInfo() public returns(uint) {
        return bloodPack.bloodInfo;
    }

    function setBloodPackID(bytes32 bloodPackID) public {
        bloodPack.bloodPackID = keccak256(bloodPackID);
    }

    function getBloodPackID() public returns(bytes32) {
        return bloodPack.bloodPackID;
    }

    function setBlood(uint blood) public {
        if (blood == 0) {
            bloodPack.availBlood[0] = true;
            bloodPack.availBlood[3] = true;
        }
        else if (blood == 1) {
            bloodPack.availBlood[1] = true;
            bloodPack.availBlood[3] = true;
        }
        else if (blood == 2) {
            for (uint i = 0; i < bloodPack.availBlood.length; i++) {
                bloodPack.availBlood[i] = true;
            }
        }
        else if (blood == 3) {
            bloodPack.availBlood[3] = true;
        }
    }

    function getBlood() public returns(uint) {
        if (bloodPack.availBlood[0] && bloodPack.availBlood[1] && bloodPack.availBlood[2] && bloodPack.availBlood[3]){
            return 2;
        }
        else if (bloodPack.availBlood[0] && bloodPack.availBlood[3]) {
            return 0;
        }
        else if (bloodPack.availBlood[1] && bloodPack.availBlood[3]) {
            return 1;
        }
        else if (bloodPack.availBlood[3]) {
            return 3;
        }

    }
}
