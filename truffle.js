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
      host: config.GETH.SERVER_ADDRESS,
      port: config.GETH.SERVER_PORT,
      network_id: config.GETH.NETWORK_ID,
      from: config.GETH.ORIGIN_ADDRESS,
      gas: 7412340
    }
  }
};