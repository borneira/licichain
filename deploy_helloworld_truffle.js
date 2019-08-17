const Web3 = require('web3');
const contract = require('truffle-contract');
const solc = require('solc');
const path = require('path');
const fs = require('fs');

const networks = require('./truffle/truffle-config.js');
const HWContractJSON = require('./truffle/build/contracts/HelloWorld.json')

//const myContractPath = 'c:/Users/jgonzalez/licichain/contracts/helloworld.sol';
//const sourceCode = fs.readFileSync(myContractPath, 'utf8');

//const HWContractFile = 'c:/Users/jgonzalez/licichain/truffle/build/contracts/HelloWorld.json';
//const HWContractJSON = JSON.parse(fs.readFileSync(HWContractFile, 'utf8'));
var HWContract = contract(HWContractJSON);

const provider = new Web3.providers.HttpProvider('http://localhost:8545');
HWContract.setProvider(provider);
HWContract.web3.networkType= 'quorum';
//console.log(HWContractFactory.web3);

web3 = new Web3();
const myPrivateKey = fs.readFileSync('c:/Users/jgonzalez/licichain/private_key', 'utf8');
var acc = web3.eth.accounts.privateKeyToAccount(myPrivateKey);
var wallet = web3.eth.accounts.wallet.create();
wallet.add(acc);

HWContract.defaults({
  from: acc.address,
});

HWContract.deployed().then(function(con) {
  con.setName('Juan').then(
  con.getMessage.call().then(function(res) {
    console.log(res);
  }))
})

//(async () => {const res =await con.getMessage().call()})();
//console.log(res);
//mes = await con.getMessage.call();
//console.log(mes);
//HWContractFactory.new('Juan').then(function(contract) {
  //console.log (contract.getMessage.call());

//});

