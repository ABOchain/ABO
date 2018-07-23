var Express = require("express");
var Http = require("http");
var Web3 = require("web3");
var BodyParser = require("body-parser");
var Contract = require("truffle-contract");
var Path = require("path");
var Time = require("./time.js");

var contractJson = require(Path.join(__dirname, '../../build/contracts/ABO.json'));
var OK = 200;

var app = Express();
var server = Http.createServer(app);
server.listen(8080);

app.use(BodyParser.json())
var web3 = new Web3(new Web3.providers.HttpProvider("http://211.249.62.37:8545"));

var aboContract = Contract(contractJson);
aboContract.setProvider(web3.currentProvider);

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

        res.status(200).send({ contactAddress, txHash });
    });
});

app.get("/doc/bloodDocID", function (req, res, next){
    var fromAddr = req.query.fromAddr;

    aboContract.at(fromAddr).then(function (abo){
        abo.getBloodDocID.call().then( function (bloodDocID){
            res.status(200).send({bloodDocID});
        });
    });
});

app.get("/doc/bloodingType", function (req, res, next){
    var fromAddr = req.query.fromAddr;

    aboContract.at(fromAddr).then(function (abo){
        abo.getBloodingType.call().then( function (bloodingType){
            res.status(200).send({bloodingType});
        });
    });
});

app.get("/doc/bloodAmount", function (req, res, next){
    var fromAddr = req.query.fromAddr;

    aboContract.at(fromAddr).then(function (abo){
        abo.getBloodAmount.call().then( function (bloodAmount){
            res.status(200).send({bloodAmount});
        });
    });
});

app.get("/doc/regTime", function (req, res, next){
    var fromAddr = req.query.fromAddr;

    aboContract.at(fromAddr).then(function (abo){
        abo.getRegTime.call().then( function (timestamp){
            var regTime = Time.translateTime(timestamp);
            res.status(200).send({regTime});
        });
    });
});