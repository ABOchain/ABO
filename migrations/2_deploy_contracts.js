var ABO = artifacts.require("./ABO.sol");

module.exports = function(deployer) {
  deployer.deploy(ABO, "00-00-0000000", 0, 0);
};
