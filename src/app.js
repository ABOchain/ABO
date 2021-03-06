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

var web3 = new Web3(new Web3.providers.HttpProvider(Static.GETH_SERVER_ADDRESS));

var aboContract = Contract(aboJson);
var aboTokenContract = Contract(aboTokenJson);

aboContract.setProvider(web3.currentProvider);
aboTokenContract.setProvider(web3.currentProvider);

// For Express
var app = Express();
var server = Http.createServer(app);

app.use(BodyParser.json())
server.listen(Static.HTTP_PORT);

// API Method

// Post Method
app.post("/create/bloodDoc", async (req, res, next) => {
    var reqData = req.body;
    var bloodDocID = new String(reqData.bloodDocID);
    var bloodingType = parseInt(reqData.bloodingType);
    var bloodAmount = parseInt(reqData.bloodAmount);
    var regTime = parseInt(Date.now() || +new Date());
    var bloodAgency = new String(reqData.bloodAgency);

    if (bloodAgency == "undefined" || bloodAgency == "" )
        bloodAgency = new String("null");

    web3.personal.unlockAccount(Static.ORIGIN_ADDR, Static.ORIGIN_ADDR_PASS, 60);

    await aboContract.new(bloodAgency, bloodDocID, bloodingType, bloodAmount, regTime, {from : Static.ORIGIN_ADDR, gas : 7412340}).then( abo => {
        var contactAddress = abo.address;
        var txHash = abo.transactionHash;

        res.status(Static.HTTP_OK).send({ contactAddress, txHash });
    });
});

app.post("/create/account", async (req, res, next) => {
    var reqData = req.body;
    var jwt = reqData.jwt;

    var decodeData = JWT.verify(jwt, Static.SECRET_KEY, { algorithm : 'HS256'});
    var password = decodeData.password;

    var account = await web3.personal.newAccount(password);

    res.status(Static.HTTP_OK).send({account});
});

app.post("/create/initToken", (req, res, next) => {
    var reqData = req.body;
    var jwt = reqData.jwt;

    try{
        var decodeData = JWT.verify(jwt, Static.SECRET_KEY, { algorithm : 'HS256'});
    }
    catch (error){
        res.status(Static.HTTP_ERROR).send({msg : error.message});
        return ;
    }
    var addr = decodeData.address;
    var value = 1;

    web3.personal.unlockAccount(Static.ORIGIN_ADDR, Static.ORIGIN_ADDR_PASS, 60);

    aboTokenContract.deployed().then( aboToken => {
        aboToken.transfer(addr, value, {from : Static.ORIGIN_ADDR}).then( result => {
            res.status(Static.HTTP_OK).send({txHash : result.tx});
        });
    });
});

app.post("/create/sendToken", (req, res, next) => {
    var reqData = req.body;
    var jwt = reqData.jwt;

    try{
        var decodeData = JWT.verify(jwt, Static.SECRET_KEY, { algorithm : 'HS256'});
    }
    catch (error){
        res.status(Static.HTTP_ERROR).send({msg : error.message});
        return ;
    }

    var fromPass = decodeData.password;
    var fromAddr = decodeData.fromAddr;
    var toAddr = decodeData.toAddr;
    var value = parseInt(decodeData.value);

    web3.personal.unlockAccount(Static.ORIGIN_ADDR, Static.ORIGIN_ADDR_PASS, 60);

    if (web3.eth.getBalance(fromAddr) < 148246800000000000)
        web3.eth.sendTransaction({from: Static.ORIGIN_ADDR, to: fromAddr, value: 148246800000000000});


    try {
        web3.personal.unlockAccount(fromAddr, fromPass, 60);
    }
    catch (error){
        res.status(Static.HTTP_ERROR).send({msg : "Account Password incorrect"});
        return ;
    }

    aboTokenContract.deployed().then( aboToken => {
        aboToken.balanceOf.call(fromAddr).then(balance => {
            try{
                if (balance < value){
                    throw new Error("Not enough Token");
                }
            }
            catch (error){
                res.status(Static.HTTP_ERROR).send({msg : error.message});
                return ;
            }

            return aboToken;
        }).then( aboToken => {
            aboToken.approve(Static.ORIGIN_ADDR, value, {from : fromAddr, gas: 7412340}).then( result => {
                return aboToken;
            }).then( aboToken => {
                aboToken.transferFrom(fromAddr, toAddr, value, {from : Static.ORIGIN_ADDR}).then( result => {
                    res.status(Static.HTTP_OK).send({txHash : result.tx});
                });
            });
        });
    });
});

// Get Method
app.get("/get/bloodDoc", async (req, res, next) => {
    var contactAddr = req.query.contactAddr;

    try{

    	await aboContract.at(contactAddr).then( abo => {
            abo.getBloodAgency.call().then( bloodAgency => {
                BloodDoc.bloodAgency = bloodAgency;
            })
    	});

	await aboContract.at(contactAddr).then( abo => {
            abo.getBloodDocID.call().then( bloodDocID => {
                BloodDoc.bloodDocID = bloodDocID;
            });
    	});

    	await aboContract.at(contactAddr).then( abo => {
            abo.getBloodingType.call().then( bloodingType => {
                BloodDoc.bloodingType= bloodingType;
            });
        });

        await aboContract.at(contactAddr).then( abo => {
            abo.getBloodAmount.call().then( bloodAmount => {
                BloodDoc.bloodAmount = bloodAmount;
            });
        });

        await aboContract.at(contactAddr).then( abo => {
            abo.getRegTime.call().then( timestamp => {
                BloodDoc.regTime = Func.translateTime(timestamp);
            });
        });

        res.status(Static.HTTP_OK).send({
            bloodAgency : BloodDoc.bloodAgency,
            bloodDocID : BloodDoc.bloodDocID,
            bloodingType : BloodDoc.bloodingType,
            bloodAmount : BloodDoc.bloodAmount,
            regTime : BloodDoc.regTime
        });
    }
    catch (error){
        res.status(Static.HTTP_ERROR).send({msg : error.message});
        return ;
    }
});

app.get("/get/balance", (req, res, next) => {
    var addr = req.query.addr;

    try{
    	aboTokenContract.deployed().then( aboToken => {
            aboToken.balanceOf.call(addr).then( balance => {
                res.status(Static.HTTP_OK).send({balance : balance.toString(10)});
            });
        });
    }
    catch (error){
        res.status(Static.HTTP_ERROR).send({msg: error.message});
	return ;
    }
});