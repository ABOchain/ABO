[![Nodejs Version](https://img.shields.io/badge/Node.js-v10.6.0-blue.svg)](https://nodejs.org/dist/v10.6.0/docs/api/)
[![Geth Version](https://img.shields.io/badge/geth-v1.8.13-blue.svg)](https://github.com/ethereum/go-ethereum/wiki/geth)
![Doc Version](https://img.shields.io/badge/docs-latest-brightgreen.svg)
  
  
ABO Box
===========

[ABO Box](https://abobox.kr) is The service of the electronic blood certificate system.

The block wallet that stores electronic blood certificates is called a blood donation wallet.
Allows service users (donors) to create a blood donation wallet containing the ABO Token and help keep blood donations permanently stored in the blood donation wall.
In addition, 'ABO BOX' can be used to donate and donate electronic donations to other people's blood donation wallets.

More information at https://abobox.kr  

-----  

### Design Principles

* Keep blood certificate permanently

* Disclosure of transaction details of blood certificate

* Prevent the sale of illicit blood certificate

### Installation

* Require  
    * Install [Node.js](https://nodejs.org/en/download/releases/) (v10.6.0)
    * Install [Geth](https://github.com/ethereum/go-ethereum/wiki/geth>) (v1.8.13) and Geth in running state

* Commands
    * Install source code  
        > mkdir abobox  
        > cd abobox  
        > git clone https://github.com/ABOchain/ABO.git  

    * Configure __src/config.js__
        >  
        > __GETH.SERVER_ADDRESS__ : Server IP address running geth.  
        >  
        > __GETH.SERVER_PORT__ : Server Port running geth.  
        >  
        > __GETH.NETWORK_ID__ : Network id of geth.  
        >  
        > __GETH.ORIGIN_ADDR__ : Etherbase address.  
        >  
        > __GETH.ORIGIN_ADDR_PASS__ : Password of etherbase address.  
        >  
        >  
        > __JWT.SECRET_KEY__ : JWT Secret key for encryption.  
        >  
        >
        > __HTTP.PORT__ : HTTP Port of ABO box.  

    * Start __ABO Box__
        > node src/app.js

### Authors

[ABO Box](https://abobox.kr) was created by `혈맹`.