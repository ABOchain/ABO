pragma solidity ^0.4.24;

contract ABO {
    struct BloodDoc {
        string bloodDocID;
        uint bloodingType;
        uint bloodAmount;
        uint regTime;
    }

    BloodDoc bloodDoc;

    constructor(string bloodDocID, uint bloodingType, uint bloodAmount, uint regTime) public {
        bloodDoc.bloodDocID = bloodDocID;
        bloodDoc.bloodingType = bloodingType;
        bloodDoc.bloodAmount = bloodAmount;
        bloodDoc.regTime = regTime; 
    }

    function getBloodDocID() public view returns(string) {
        return bloodDoc.bloodDocID;
    }
    
    function getBloodingType() public view returns(uint) {
        return bloodDoc.bloodingType;
    }

    function getBloodAmount() public view returns(uint) {
        return bloodDoc.bloodAmount;
    }

    function getRegTime() public view returns(uint) {
        return bloodDoc.regTime;
    }
}
