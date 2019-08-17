const Web3 = require('web3');
const Tx = require('ethereumjs-tx').Transaction;
const solc = require('solc');
const path = require('path');
const fs = require('fs');
const myContractPath = 'c:/Users/jgonzalez/licichain/contracts/basic.sol';
const sourceCode = fs.readFileSync(myContractPath, 'utf8');
var input = {
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

var contractJSON = JSON.parse(solc.compile(JSON.stringify(input)));
console.log(contractJSON);
abi = contractJSON.contracts['basic.sol']['SimpleStorage'].abi;
console.log(abi);
contract_data = '0x' + contractJSON.contracts['basic.sol']['SimpleStorage'].evm.bytecode.object;

const txObject = {
  nonce:    web3.utils.toHex(0),
  value:    web3.utils.toHex(0),
  gasLimit: web3.utils.toHex(1000000),
  gasPrice: web3.utils.toHex(0),
  data: web3.utils.toHex(contract_data, 'hex')
};

var tx = new Tx(txObject);

const myPrivateKey = fs.readFileSync('c:/Users/jgonzalez/licichain/private_key', 'utf8');
var  acc = web3.eth.accounts.privateKeyToAccount(myPrivateKey);
var wallet = web3.eth.accounts.wallet.create();
wallet.add(acc);

web3.eth.defaultAccount = wallet[0].address;

web3.eth.getTransactionCount(acc.address, function(err, txCount)
{
  console.log('Inside1');
  console.log(err);
  web3.eth.sendTransaction({
      /* De la cuenta 0 en el wallet defaultAccount*/
//      gasLimit: 3058096300,
      gas: 3058096300,
      gasPrice: 0,
      data: contract_data,
//    data: "608060405234801561001057600080fd5b5060e68061001f6000396000f3fe6080604052600436106043576000357c01000000000000000000000000000000000000000000000000000000009004806360fe47b11460485780636d4ce63c14607f575b600080fd5b348015605357600080fd5b50607d60048036036020811015606857600080fd5b810190808035906020019092919050505060a7565b005b348015608a57600080fd5b50609160b1565b6040518082815260200191505060405180910390f35b8060008190555050565b6000805490509056fea165627a7a723058204e46499eb9fbc13eb01d8b9fd0a16c1537ac9ce41f83bc24685887e8ee5e7f560029",
      nonce: web3.utils.toHex(txCount),
      chainId: web3.utils.toHex(89519)
    })
    .on('error', function (e) {console.log('Inside error');console.log(e);})
    .on('receipt',function(receipt) {
      console.log('Inside receipt');
      contract = new web3.eth.Contract(abi,receipt.contractAddress);
      console.log(contract.methods);
      contract.methods.set(10).send({
        from: acc.address,
        gas: 3058096300,
        gasPrice: 0,
      })
        .on('error',function(Error) {console.log(Error)})
        .on('receipt', function(receipt) {
          console.log('Inside receipt 2');
          //console.log(receipt);
          contract.methods.get().call({
            from: acc.address
          }, function(err, result) {
            console.log('Callback');
            console.log(result);
            })
            .on('error',function(Error) {console.log(Error)})
            .on('receipt', function(receipt) {
              console.log('Inside receipt 3');
              console.log(receipt);
            })
        })
        .on('transactionHash', function(hash) {console.log(hash)})
      })
    .on('transactionHash', function(hash) {console.log('Inside hash');console.log(hash)})
});

console.log('Saliendo');
/*
var private_key = Buffer.from(acc.privateKey.substr(2), 'hex');

tx.sign(private_key);
var serializedTx = tx.serialize();
const raw = '0x' + serializedTx.toString('hex');
*/

/*
web3.eth.sendSignedTransaction(raw, function(err, transactionHash)  {
  console.log('err:', err, 'txHash:', transactionHash);
  const txHash = transaciontHash;
  // Use this txHash to find the contract on Etherscan!
//'0x50f7d03AEe73E4f74a6A7401056a44AeAbeaEeC4'
})
*/

/*contract2.deploy({data: contract_data, arguments: []}).send({ from: acc.address, gas: 100000, gasPrice: 0}, function(error, transactionHash) {console.log}).on('transactionHash', function( transactionHash) {console.log}).on('error', function(error) {console.log}).on(
'receipt', function(receipt) {console.log(receipt.contract.address)}).then(function(newContractInstance) { console.log(newContractInstance.option.address)})
*/
//web3.eth.accounts.signTransaction(tx, acc.privateK)

/*
const contract2 = new web3.eth.Contract(abi, Buffer.from(txHash.substr(2), 'hex'));
data2=contract2.methods.setName("Juan").encodeABI()

const txObject2 = {
  nonce:    web3.utils.toHex(1),
  value:    web3.utils.toHex(0),
  gasLimit: web3.utils.toHex(1000000),
  gasPrice: web3.utils.toHex(0),
  data: data2
};

tx2 = new Tx(txObject2);
var acc2 = web3.eth.accounts.create();
var private_key2 = Buffer.from(acc2.privateKey.substr(2), 'hex');

tx2.sign(private_key2);
var serializedTx2 = tx2.serialize();
const raw2 = '0x' + serializedTx2.toString('hex');
*/

/*web3.eth.sendSignedTransaction(raw2, (err, txHash) => {
  console.log('err:', err, 'txHash:', txHash)
  // Use this txHash to find the contract on Etherscan!
})

data3=contract2.methods.getMessage().encodeABI;

const txObject3 = {
  nonce:    web3.utils.toHex(2),
  value:    web3.utils.toHex(0),
  gasLimit: web3.utils.toHex(1000000),
  gasPrice: web3.utils.toHex(0),
  data: data2
};

tx3 = new Tx(txObject3);
var acc3 = web3.eth.accounts.create();
var private_key3 = Buffer.from(acc3.privateKey.substr(2), 'hex');

tx3.sign(private_key3);
var serializedTx3 = tx3.serialize();
const raw3 = '0x' + serializedTx3.toString('hex');

web3.eth.sendSignedTransaction(raw2, (err, txHash) => {
  console.log('err:', err, 'txHash:', txHash)
  // Use this txHash to find the contract on Etherscan!
})*/

