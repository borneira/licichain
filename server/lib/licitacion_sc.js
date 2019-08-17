
const Web3 = require('web3');
const solc = require('solc');
const path = require('path');
const hash = require('js-sha256')
const {readFileSync} = require('fs');

const myContractPath = './contracts/licitacion.sol';

const rpcURL = 'http://localhost:22000';
const web3 = new Web3(rpcURL);
const myPrivateKey = readFileSync('c:/Users/jgonzalez/licichain/private_key',
  'utf8');
const acc = web3.eth.accounts.privateKeyToAccount(myPrivateKey);
const wallet = web3.eth.accounts.wallet.create();
wallet.add(acc);
web3.eth.defaultAccount = wallet[0].address;

module.exports = {

  /**
   * Retrieves gas estimate multiplied by the set gas multiplier for a `sendTransaction` call.
   * @param  {Object}            Licitacion
   * @return {Object}            Web3.eth.Contract
   */
  deployLicitacion: async function(licitacion) {
    const sourceCode = readFileSync(myContractPath, 'utf8');
    const input = {
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

    // TODO: Controlar errores de compilación
    const contractJSON = JSON.parse(solc.compile(JSON.stringify(input)));
    const abi = contractJSON.contracts['licitacion.sol']['Bid'].abi;

    // La salida siguiente se puede cargar en la consola de Quorum Maker como ABI
    // console.log(JSON.stringify(abi));
    const contractData = '0x' + contractJSON
      .contracts['licitacion.sol']['Bid'].evm.bytecode.object;
    contract = new web3.eth.Contract(abi);
    contract.options.gasPrice = 0;
    contract.options.gas = 10000000;
    contract.options.data = contractData;
//El defaultAccount no sirve para deploy :-(
    contract.options.from = acc.address;

    // No almacenaremos el PPT y PCA completos, sino sus hashes
    licitacion.PPTHash = hash.sha256(licitacion.ppt);
    licitacion.PCAHash = hash.sha256(licitacion.pca);

    let contractDeployed = await contract.deploy({
      arguments: [
        licitacion.objeto,
        Math.round(licitacion.fecha_inicio.getTime() / 1000),
        Math.round(licitacion.fecha_fin.getTime() / 1000),
        Math.round(licitacion.fecha_mesa_adm.getTime() / 1000),
        Math.round(licitacion.fecha_mesa_obj.getTime() / 1000),
        licitacion.org_contratacion,
        licitacion.importe_max,
        licitacion.PPTHash,
        licitacion.PCAHash,
        licitacion.criterios
      ]
    }).send();
    licitacion.sc = {
      address: contractDeployed.options.address,
      jsonInterface: JSON.stringify(contractDeployed.options.jsonInterface)
    };

    if (licitacion.CPV) {
      await contractDeployed.methods.setCpv(licitacion.CPV);
    }

    if (licitacion.fecha_mesa_subj) {
      await contractDeployed.methods.setFecha_subj(Math.round((licitacion.fecha_mesa_subj).getTime() / 1000));
    }
    return licitacion;
  },

  /**
   * Retrieves gas estimate multiplied by the set gas multiplier for a `sendTransaction` call.
   * @param  {String}            Address
   * @param  {String}            JSONInterface
   * @return {Object}            Web3.eth.Contract
   */
  getLicitacion: async function(address, jsonInterface) {
    abi = JSON.parse(jsonInterface);
    contract = new web3.eth.Contract(abi, address, {
      from: acc.address,
      gasPrice: 0,
      gas: 1000000
    });
    let licitacion = {};
    licitacion.objeto = await contract.methods.objeto().call();
    licitacion.CPV = await contract.methods.cpv().call();
    licitacion.fecha_inicio = new Date(await contract.methods.fecha_inicio().call()*1000);
    licitacion.fecha_fin = new Date(await contract.methods.fecha_fin().call()*1000);
    licitacion.fecha_mesa_adm = new Date(await contract.methods.fecha_mesa_adm().call()*1000);
    licitacion.fecha_mesa_subj = new Date(await contract.methods.fecha_mesa_subj().call()*1000);
    licitacion.fecha_mesa_obj = new Date(await contract.methods.fecha_mesa_obj().call()*1000);
    licitacion.org_contratacion = await contract.methods.org_contratacion().call();
    licitacion.importe_max = await contract.methods.importe_max().call();
    licitacion.importe_adj = await contract.methods.importe_adj().call();
    licitacion.PPTHash = await contract.methods.PPT_hash().call();
    licitacion.PCAHash = await contract.methods.PCA_hash().call();
    licitacion.criterios = await contract.methods.criterios().call();
    licitacion.sc = {
      address: address,
      jsonInterface: jsonInterface
    };

    return licitacion;
  }
};






