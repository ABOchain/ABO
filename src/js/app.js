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
var web3 = new Web3(new Web3.providers.HttpProvider("http://211.249.62.37:8545"));

var aboContract = Contract(contractJson);
aboContract.setProvider(web3.currentProvider);



app.post("/create/bloodDoc", function (req, res, next){
    var reqData = req.body;
    var fromAddr = reqData.fromAddress;
    var bloodDocID = reqData.bloodDocID;
    var bloodingType = reqData.bloodingType;
    var bloodAmount = reqData.bloodAmount;
    
    try {
        aboContract.new(bloodDocID, bloodingType, bloodAmount, {from : fromAddr, gas : 7412340}).then(async function (abo){
            var address = abo.address;
            var txHash = abo.transactionHash;

            res.status(200).send({ address, txHash });
        });
    }
    catch (error) {
        res.status(503).send("this is post error");
    }
});

app.get("/select/myBloodDoc", function (req, res, next){
    var fromAddr = req.query.fromAddr;

    try {
        aboContract.at(fromAddr).then(function (abo){
            var bloodDocID = abo.getBloodDocID();
            var bloodingType = abo.getBloodingType();
            var bloodAmount = abo.getBloodAmount();
            var regDate = abo.getRegDate();

            res.status(200).send({ bloodDocID, bloodingType, bloodAmount, regDate });
        });
    }
    catch( error ) {
        res.status(505).send("this is get error")
    }
});