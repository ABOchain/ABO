var Static = require("../src/js/static.js")
var ABOToken = artifacts.require("./ABOToken.sol");

module.exports = function(deployer) {
  deployer.deploy(ABOToken, Static.ORIGIN_ADDR);
};
