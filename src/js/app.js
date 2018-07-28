// Basic Library
var Express = require("express");
var Http = require("http");
var Web3 = require("web3");
var BodyParser = require("body-parser");
var Contract = require("truffle-contract");
var Path = require("path");
var JWT = require("jsonwebtoken");

// Custom Library
var Func = require("./func.js");
var BloodDoc = require("./bloodDoc.js");

// ABI of ABO.sol
var contractJson = require(Path.join(__dirname, '../../build/contracts/ABO.json'));

var app = Express();
var server = Http.createServer(app);

var web3 = new Web3(new Web3.providers.HttpProvider("http://211.249.62.37:8545"));

var aboContract = Contract(contractJson);

app.use(BodyParser.json())
aboContract.setProvider(web3.currentProvider);
server.listen(8080);

// API Method

// Post Method
app.post("/create/bloodDoc", function (req, res, next){
    var reqData = req.body;
    var fromAddr = reqData.fromAddress;
    var bloodDocID = new String(reqData.bloodDocID);
    var bloodingType = parseInt(reqData.bloodingType);
    var bloodAmount = parseInt(reqData.bloodAmount);
    var regTime = parseInt(Date.now() || +new Date());

    web3.personal.unlockAccount(fromAddr, "qwer1234", 60);

    aboContract.new(bloodDocID, bloodingType, bloodAmount, regTime, {from : fromAddr, gas : 7412340}).then(function (abo){
        var contactAddress = abo.address;
        var txHash = abo.transactionHash;

        res.status(Func.OK).send({ contactAddress, txHash });
    });
});

app.post("/create/account", function (req, res, next) {
    var reqData = req.body;
    var jwt = reqData.jwt;

    var decodeData = JWT.verify(jwt, Func.secretKey, { algorithm : 'HS256'});
    var password = decodeData.password;

    var account = web3.personal.newAccount(password);
    
    res.status(Func.OK).send({account});
});

// Get Method
app.get("/select/bloodDoc", function (req, res, next){
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
                        res.status(Func.OK).send({
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

app.get("/select/bloodDocID", function (req, res, next){
    var contactAddr = req.query.contactAddr;

    aboContract.at(contactAddr).then(function (abo){
        abo.getBloodDocID.call().then( function (bloodDocID){
            res.status(Func.OK).send({bloodDocID});
        });
    });
});

app.get("/select/bloodingType", function (req, res, next){
    var contactAddr = req.query.contactAddr;

    aboContract.at(contactAddr).then(function (abo){
        abo.getBloodingType.call().then( function (bloodingType){
            res.status(Func.OK).send({bloodingType});
        });
    });
});

app.get("/select/bloodAmount", function (req, res, next){
    var contactAddr = req.query.contactAddr;

    aboContract.at(contactAddr).then(function (abo){
        abo.getBloodAmount.call().then( function (bloodAmount){
            res.status(Func.OK).send({bloodAmount});
        });
    });
});

app.get("/select/regTime", function (req, res, next){
    var contactAddr = req.query.contactddr;

    aboContract.at(contactAddr).then(function (abo){
        abo.getRegTime.call().then( function (timestamp){
            var regTime = Func.translateTime(timestamp);
            res.status(Func.OK).send({regTime});
        });
    });
});