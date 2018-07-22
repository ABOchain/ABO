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

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    rinkeby: {
      host: "211.249.62.37",
      port: 8545,
      network_id: "4",
      from: "0x5dce3d6ca5c650323aa9d2e627c206df13be1149",
      gas: 7412340
    },
    abo: {
      host: "211.249.62.37",
      port: 8545,
      network_id: "116",
      from: "0x150e93417cbe71c1692831eb91c77e20e4ba8a4c",
      gas: 7412340
    }
  }
};
