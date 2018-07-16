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
        bloodPack.validTime = now; 
    }

    modifier restricted() {
        if (msg.sender != owner) _;
    }

    function getBloodInfo() public returns(uint) {
        return bloodPack.bloodInfo;
    }

    function getBloodPackID() public returns(bytes32) {
        return bloodPack.bloodPackID;
    }

    function setBloodType(uint bloodType) internal {
        if ( bloodType == 0 ){
            bloodPack.availBlood[0] = true;
            bloodPack.availBlood[3] = true;
        }
        else if ( bloodType == 1 ){
            bloodPack.availBlood[1] = true;
            bloodPack.availBlood[3] = true;
        }
        else if ( bloodType == 3 ){
            bloodPack.availBlood[3] = true;
        } 
        else if ( bloodType == 2 ){
            for (uint idx = 0; idx < 4; idx ++){
                bloodPack.availBlood[idx] = true;
            }
        }
    }
    
    function getBloodType() public returns(uint) {
        if ( bloodPack.availBlood[0] && bloodPack.availBlood[1] && bloodPack.availBlood[2] && bloodPack.availBlood[3] ){
            return 2;
        }
        else if ( bloodPack.availBlood[0] && bloodPack.availBlood[3] ) {
            return 0;
        }
        else if ( bloodPack.availBlood[1] && bloodPack.availBlood[3] ) {
            return 1;
        }
        else{
            return 3;
        }

        return 5;
    }
}
