var Express = require("express");
var Http = require("http");
var Web3 = require("web3");
var BodyParser = require("body-parser");
var Contract = require("truffle-contract");
var Path = require("path");

var contractJson = require(Path.join(__dirname, '../../build/contracts/ABO.json'));
var OK = 200;

var app = Express();
var server = Http.createServer(app);
server.listen(8080);

app.use(BodyParser.json())
var provider = new Web3(new Web3.providers.HttpProvider("http://211.249.62.37:8545"));

var aboContract = Contract(contractJson);
aboContract.setProvider(provider.currentProvider);

app.post("/create/bloodDoc", function (req, res, next){
    var reqData = req.body;
    var fromAddr = reqData.fromAddress;
    var bloodDocID = reqData.bloodDocID;
    var bloodType = reqData.bloodType;
    var bloodAmount = reqData.bloodAmount;
    
    aboContract.at(fromAddr).then(function (abo){
        res.status(200).send("create complete");
    })
    //     var abo = instance;
    //     abo.setBloodDocID(bloodDocID);
    //     abo.setBloodType(bloodType);
    //     abo.setBloodAmount(bloodAmount);
    // })

    // res.status(200).send("create complete");
});

app.get("/select/myDoc", function (req, res, next){
    res.status(200).send({ data: "This is select"});
});