pragma solidity ^0.4.24;

import "../contracts/ABO.sol";
import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";

contract TestABO {
    ABO abo = ABO(DeployedAddresses.ABO());

    function testBloodType() public {
        uint bloodType = 1;
        abo.setBloodingType(bloodType);
        uint retBloodType = abo.getBloodingType();

        Assert.equal(bloodType, retBloodType, "bloodType get,set ok");
    }

    function testBloodDocID() public {
        string bloodDocID = "18-07-000001";
        abo.setBloodDocID(bloodDoc);
        string retBloodDocID = abo.getBloodPackID();

        Assert.equal(bloodDocID, retBloodDocID, "bloodPackID get,set ok"); 
    } 

    function testBloodAmount() public {
        uint bloodAmount = 400;
        abo.setBloodAmount(bloodAmount);
        uint retBloodAmount = abo.getBloodAmount();

        Assert.equal(bloodAmount, retBloodAmount, "bloodInfo get,set ok");
    }
}

