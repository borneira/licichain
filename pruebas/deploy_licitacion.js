const Web3 = require('web3');
//const Tx = require('ethereumjs-tx').Transaction;
const solc = require('solc');
const path = require('path');
const fs = require('fs');
const myContractPath = 'c:/Users/jgonzalez/licichain/contracts/licitacion.sol';
const sourceCode = fs.readFileSync(myContractPath, 'utf8');
var input = {
  language: 'Solidity',
  sources: {
    'licitacion.sol': {
      content: sourceCode,
    },
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*'],
      },
    },
  },
};

const rpcURL = 'http://localhost:22000';
const web3 = new Web3(rpcURL);
var contractJSON = JSON.parse(solc.compile(JSON.stringify(input)));
console.log(contractJSON);
abi = contractJSON.contracts['licitacion.sol']['Bid'].abi;

//La salida siguiente se puede cargar en la consola de Quorum Maker como ABI
//console.log(JSON.stringify(abi));
contract_data = '0x' + contractJSON.contracts['licitacion.sol']['Bid'].evm.bytecode.object;

const myPrivateKey = fs.readFileSync('c:/Users/jgonzalez/licichain/private_key', 'utf8');
var acc = web3.eth.accounts.privateKeyToAccount(myPrivateKey);
var wallet = web3.eth.accounts.wallet.create();
wallet.add(acc);
web3.eth.defaultAccount = wallet[0].address;

contract = new web3.eth.Contract(abi);

contract.options.gasPrice = 0;
contract.options.gas = 10000000;
contract.options.data = contract_data;
//El defaultAccount no sirve para deploy :-(
contract.options.from = acc.address;

contract.deploy({arguments: ['Suministro de PCs', 1565740800, 1565750800, 1565760800, 1565770800, 'Ayuntamiento de Vigo', 100000, '983718371987f987a987b98f', '983718371987f9873242398f', 'Criterios']}).send()
  .on('error', function(e) {
    console.log('Inside error');
    console.log(e);
  })
  .on('receipt', function(receipt) {
    console.log('Receipt de deploy');
    contract.options.address = receipt.contractAddress;

    contract.methods.setCPV('360123').send({
//        from: acc.address,
      gas: 10000000,
      gasPrice: 0,
    })
      .on('error', function(Error) {
        console.log(Error);
      })
      .on('receipt', function(receipt) {
        console.log('Receipt de setCPV');
        contract.methods.setFecha_subj(1565760800).send({
//        from: acc.address,
          gas: 10000000,
          gasPrice: 0,
        })
          .on('error', function(Error) {
            console.log(Error);
          })
          .on('receipt', function(receipt) {
            console.log('Receipt de setFecha_subj');
            contract.methods.getObjeto().call(function(result) {
              console.log(result);
            });
          });
      });
  });

