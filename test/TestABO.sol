pragma solidity ^0.4.24;

import "../contracts/ABO.sol";
import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";

contract TestABO {
    ABO abo = ABO(DeployedAddresses.ABO());

    // function testBloodType() public {
    //     uint bloodType = 1;
    //     abo.setBloodType(bloodType);
    //     uint retBloodType = abo.getBloodType();

    //     Assert.equal(bloodType, retBloodType, "bloodType get,set ok");
    // }

    // function testBloodPackID() public {
    //     abo.setBloodPackID("test1234");
    //     bytes32 retBloodPackID = abo.getBloodPackID();

    //     Assert.equal(keccak256(abi.encodePacked("test1234")), retBloodPackID, "bloodPackID get,set ok"); 
    // } 

    // function testBloodInfo() public {
    //     uint bloodInfo = 0;
    //     abo.setBloodInfo(bloodInfo);
    //     uint retBloodInfo = abo.getBloodInfo();

    //     Assert.equal(bloodInfo, retBloodInfo, "bloodInfo get,set ok");
    // }
}

