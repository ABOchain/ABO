var Func = require("../src/js/func.js")
var ABOToken = artifacts.require("./ABOToken.sol");

module.exports = function(deployer) {
  deployer.deploy(ABOToken, Func.ORIGIN_ADDR);
};
