var ABO = artifacts.require("./ABO.sol");

module.exports = function(deployer) {
  deployer.deploy(ABO, "", -1, 0);
};
