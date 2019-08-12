const Web3 = require('web3');
const Tx = require('ethereumjs-tx').Transaction;
const solc = require('solc');
const path = require('path');
const fs = require('fs');
const myContractPath = 'c:/Users/jgonzalez/licichain/contracts/basic.sol';
const sourceCode = fs.readFileSync(myContractPath, 'utf8');
const input = {
  language: 'Solidity',
  sources: {
    'basic.sol' : {
      content: sourceCode
    }
  },
  settings: {
    outputSelection: {
      '*': {
        '*': [ '*' ]
      }
    }
  }
};

const rpcURL = "http://localhost:22000";
const web3 = new Web3(rpcURL);

let  contractJSON = JSON.parse(solc.compile(JSON.stringify(input)));
let abi = contractJSON.contracts['basic.sol']['SimpleStorage'].abi;

//La salida siguiente se puede cargar en la consola de Quorum Maker como ABI
//console.log(JSON.stringify(abi));
contract_data = '0x' + contractJSON.contracts['basic.sol']['SimpleStorage'].evm.bytecode.object;

const myPrivateKey = fs.readFileSync('c:/Users/jgonzalez/licichain/private_key', 'utf8');
const  acc = web3.eth.accounts.privateKeyToAccount(myPrivateKey);
const wallet = web3.eth.accounts.wallet.create();
wallet.add(acc);
web3.eth.defaultAccount = wallet[0].address;

let contract = new web3.eth.Contract(abi);

contract.options.gasPrice=0;
contract.options.gas=3058096300;
contract.options.data=contract_data;
//El defaultAccount no sirve para deploy :-(
contract.options.from=acc.address;

contract.deploy().send()
    .on('error', function (e) {console.log('Inside error');console.log(e);})
    .on('receipt',function(receipt) {
      contract.options.address = receipt.contractAddress;

      contract.methods.set(10).send({
//        from: acc.address,
        gas: 3058096300,
        gasPrice: 0,
      })
        .on('error', function(Error) {console.log(Error)})
        .on('receipt', function(receipt) {
          contract.methods.get().call({
//            from: acc.address
          }, function(err, result) {
            console.log(result);
            })
        })
      })

