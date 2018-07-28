var ABOToken = artifacts.require("./ABOToken.sol");

module.exports = function(deployer) {
  deployer.deploy(ABOToken, "0x150e93417cbe71c1692831eb91c77e20e4ba8a4c");
};
