/*
 * NB: since truffle-hdwallet-provider 0.0.5 you must wrap HDWallet providers in a 
 * function when declaring them. Failure to do so will cause commands to hang. ex:
 * ```
 * mainnet: {
 *     provider: function() { 
 *       return new HDWalletProvider(mnemonic, 'https://mainnet.infura.io/<infura-key>') 
 *     },
 *     network_id: '1',
 *     gas: 4500000,
 *     gasPrice: 10000000000,
 *   },
 */

var config = require("src/config.js");

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    abo: {
      host: config.GETH_SERVER_ADDRESS,
      port: config.GETH_SERVER_PORT,
      network_id: config.GETH.NETWORK_ID,
      from: "0xc89842ab97cb9028328be4a94b34327540c4f148",
      gas: 7412340
    }
  }
};