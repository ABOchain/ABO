var Express = require("express");
var Http = require("http");
var Web3 = require("web3");
var Contract = require("truffle-contract");
var Path = require("path");
var contractJson = require(Path.join(__dirname, '../../build/contracts/ABO.json'));

var app = Express();
var server = Http.createServer(app);
server.listen(8080);


web3 = new Web3.providers.HttpProvider("http://localhost:8545");


app.post("/create", function (req, res, next){
    res.status(200).send({ data: "This is create"});
    
});

app.get("/select", function (req, res, next){
    res.status(200).send({ data: "This is select"});
});