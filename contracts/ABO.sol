pragma solidity ^0.4.24;

contract ABO {
    struct BloodDoc {
        string bloodDocID;
        uint bloodingType;
        uint bloodAmount;
        uint regDate;
    }
    address owner;
    BloodDoc bloodDoc;

    constructor() public {
        owner = msg.sender;
        bloodDoc.regDate = now; 
    }

    modifier restricted() {
        if (msg.sender != owner) _;
    }

    function setBloodDocID(string bloodDocID) public restricted {
        bloodDoc.bloodDocID = bloodDocID;
    }

    function getBloodDocID() public view restricted returns(string) {
        return bloodDoc.bloodDocID;
    }

    function setBloodingType(uint bloodingType) public restricted {
        bloodDoc.bloodingType = bloodingType;
    }
    
    function getBloodingType() public view returns(uint) {
        return bloodDoc.bloodingType;
    }

    function setBloodAmount(uint bloodAmount) public restricted {
        bloodDoc.bloodAmount = bloodAmount;
    }

    function getBloodAmount() public view returns(uint) {
        return bloodDoc.bloodAmount;
    }

    function getRegDate() public view returns(uint) {
        return bloodDoc.regDate;
    }
}
