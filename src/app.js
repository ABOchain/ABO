// Basic Library
var Express = require("express");
var Http = require("http");
var Web3 = require("web3");
var BodyParser = require("body-parser");
var Contract = require("truffle-contract");
var Path = require("path");
var JWT = require("jsonwebtoken");

// Custom Library
var Func = require("./js/func.js");
var BloodDoc = require("./js/bloodDoc.js");
var Static = require("./js/static.js");

// For Deploy
var aboJson = require(Path.join(__dirname, '../build/contracts/ABO.json'));
var aboTokenJson = require(Path.join(__dirname, '../build/contracts/ABOToken.json'));

var web3 = new Web3(new Web3.providers.HttpProvider("http://211.249.62.37:8545"));

var aboContract = Contract(aboJson);
var aboTokenContract = Contract(aboTokenJson);

aboContract.setProvider(web3.currentProvider);
aboTokenContract.setProvider(web3.currentProvider);

// For Express
var app = Express();
var server = Http.createServer(app);

app.use(BodyParser.json())
server.listen(8080);

// web3.personal.unlockAccount(Func.ORIGIN_ADDR, Func.ORIGIN_ADDR_PASS, 60);

// var aboToken = aboTokenContract.new(Func.ORIGIN_ADDR, {from: Func.ORIGIN_ADDR, gas : 7412340}).then(function (abo){
//     Func.TOKEN_ADDR = abo.address;
// });

// API Method

// Post Method
app.post("/create/bloodDoc", function (req, res, next){
    var reqData = req.body;
    var addr = reqData.address;
    var bloodDocID = new String(reqData.bloodDocID);
    var bloodingType = parseInt(reqData.bloodingType);
    var bloodAmount = parseInt(reqData.bloodAmount);
    var regTime = parseInt(Date.now() || +new Date());

    web3.personal.unlockAccount(Static.ORIGIN_ADDR, Static.ORIGIN_ADDR_PASS, 60);

    // aboTokenContract.deployed().then(function (aboToken){
    //     aboToken.transfer(addr, 1, {from : Func.ORIGIN_ADDR});
    // });

    aboContract.new(bloodDocID, bloodingType, bloodAmount, regTime, {from : Static.ORIGIN_ADDR, gas : 7412340}).then(function (abo){
        var contactAddress = abo.address;
        var txHash = abo.transactionHash;
        
        res.status(Static.OK).send({ contactAddress, txHash });
    });
});

app.post("/create/account", function (req, res, next) {
    var reqData = req.body;
    var jwt = reqData.jwt;

    var decodeData = JWT.verify(jwt, Static.SECRET_KEY, { algorithm : 'HS256'});
    var password = decodeData.password;

    var account = web3.personal.newAccount(password);
    
    res.status(Static.OK).send({account});
});

app.post("/create/sendToken", function (req, res, next){
    var reqData = req.body
    var toAddr = reqData.toAddr;
    var fromAddr = reqData.fromAddr;
    var value = 1;
    
    web3.personal.unlockAccount(Static.ORIGIN_ADDR, Static.ORIGIN_ADDR_PASS, 60);

    if (toAddr && fromAddr){
        aboTokenContract.deployed().then(function (aboToken){
            aboToken.approve()
            aboToken.transfer(toAddr, value, {from : Static.ORIGIN_ADDR}).then(function (result){
                res.status(Static.OK).send({txHash : result.tx});
            });
        });
    }
    else if (toAddr){
        aboTokenContract.deployed().then(function (aboToken){
            aboToken.transfer(toAddr, value, {from : Static.ORIGIN_ADDR}).then(function (result){
                res.status(Static.OK).send({txHash : result.tx});
            });
        });
    }
});

// Get Method
app.get("/get/bloodDoc", function (req, res, next){
    var contactAddr = req.query.contactAddr;

    aboContract.at(contactAddr).then(function (abo){
        abo.getBloodDocID.call().then( function (bloodDocID){
            BloodDoc.bloodDocID = bloodDocID;
            return abo;
        }).then( function (abo){
            abo.getBloodingType.call().then( function (bloodingType){
                BloodDoc.bloodingType = bloodingType;
                return abo;
            }).then( function (abo){
                abo.getBloodAmount.call().then( function (bloodAmount){
                    BloodDoc.bloodAmount = bloodAmount;
                    return abo;
                }).then( function (abo){
                    abo.getRegTime.call().then( function (timestamp){
                        BloodDoc.regTime = Func.translateTime(timestamp);
                        res.status(Static.OK).send({
                            bloodDocID : BloodDoc.bloodDocID,
                            bloodingType : BloodDoc.bloodingType,
                            bloodAmount : BloodDoc.bloodAmount,
                            regTime : BloodDoc.regTime});
                    });
                });
            });
        });
    });
});

app.get("/get/balance", function (req, res, next){
    var addr = req.query.addr;

    aboTokenContract.deployed().then(function (aboToken){
        aboToken.balanceOf(addr).then(function (result){
            res.status(Static.OK).send({balance : result.toString(10)});
        });
    });
});

