var Config = require("config");
var ABOToken = artifacts.require("./ABOToken.sol");

module.exports = function(deployer) {
  deployer.deploy(ABOToken, Config.get("geth").origin_addr);
};
