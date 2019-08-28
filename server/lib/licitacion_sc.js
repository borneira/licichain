const Web3 = require('web3');
const solc = require('solc');
const path = require('path');
const hash = require('js-sha256');
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
   * Despliega una nueva licitación en blockchain y devuelve una nueva instancia de Licitacion con los datos del SmartContract
   * @param  {Object}            Licitacion
   * @return {Object}            Licitacion
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
//    console.log(contractJSON);
    const abi = contractJSON.contracts['licitacion.sol']['Bid'].abi;

    // La salida siguiente se puede cargar en la consola de Quorum Maker como ABI
    // console.log(JSON.stringify(abi));
    const contractData = '0x' + contractJSON
      .contracts['licitacion.sol']['Bid'].evm.bytecode.object;
    let contract = new web3.eth.Contract(abi);
    contract.options.gasPrice = 0;
    contract.options.gas = 40000000;
    contract.options.data = contractData;
//  El defaultAccount no sirve para deploy :-(
    contract.options.from = acc.address;

    // No almacenaremos el PPT y PCA completos, sino sus hashes
    licitacion.PPTHash = hash.sha256(licitacion.ppt);
    licitacion.PCAHash = hash.sha256(licitacion.pca);

    // let contractDeployed = await contract.deploy({
    //   arguments: [
    //     licitacion.objeto,
    //     Math.round(licitacion.fecha_inicio.getTime() / 1000),
    //     Math.round(licitacion.fecha_fin.getTime() / 1000),
    //     Math.round(licitacion.fecha_mesa_adm.getTime() / 1000),
    //     Math.round(licitacion.fecha_mesa_obj.getTime() / 1000),
    //     licitacion.org_contratacion,
    //     licitacion.importe_max,
    //     licitacion.PPTHash,
    //     licitacion.PCAHash,
    //     licitacion.criterios,
    //   ],
    // }).send();

    let lic = {};
    lic.objeto = licitacion.objeto;
    lic.org_contratacion = licitacion.org_contratacion;
    lic.importe_max = licitacion.importe_max;
    lic.importe_adj = 0;
    lic.CPV = licitacion.CPV;
    lic.PPTHash = licitacion.PPTHash;
    lic.PCAHash = licitacion.PCAHash;
    lic.criterios = licitacion.criterios;
    let contractDeployed = await contract.deploy({
      arguments: [
        lic.objeto, lic.org_contratacion, lic.importe_max,
        lic.CPV, lic.PPTHash, lic.PCAHash, lic.criterios
      ],
    }).send();
    licitacion.sc = {
      address: contractDeployed.options.address,
      jsonInterface: JSON.stringify(contractDeployed.options.jsonInterface),
    };

    let fechas  = {};

    fechas.fecha_inicio = Math.round(licitacion.fecha_inicio.getTime() / 1000);
    fechas.fecha_fin = Math.round(licitacion.fecha_fin.getTime() / 1000);
    fechas.fecha_mesa_adm = Math.round(licitacion.fecha_mesa_adm.getTime() / 1000);
    fechas.fecha_mesa_subj = (Math.round(licitacion.fecha_mesa_subj.getTime() / 1000) || 0);
    fechas.fecha_mesa_obj = Math.round(licitacion.fecha_mesa_obj.getTime() / 1000);

    console.log(fechas);
    await contractDeployed.methods.setFechas(fechas.fecha_inicio, fechas.fecha_fin, fechas.fecha_mesa_adm, fechas.fecha_mesa_subj, fechas.fecha_mesa_obj).send();
    return licitacion;
  },

  /**
   * Devuelve la información de la licitación en un determinado smartcontract
   * @param  {String}            Address
   * @param  {String}            JSONInterface
   * @return {Object}            Licitacion
   */
  getLicitacion: async function(address, jsonInterface) {
    let abi = JSON.parse(jsonInterface);
    let contract = new web3.eth.Contract(abi, address, {
      from: acc.address,
      gasPrice: 0,
      gas: 1000000,
    });

    let licitacionBl = null;
    let fechas = null;
    try {

    licitacionBl = await contract.methods.licitacion().call();
    fechas = await contract.methods.fechas().call();
  } catch(err){
      console.log(err);
    }
    console.log(fechas);
    licitacionBl.fecha_inicio = new Date(fechas.fecha_inicio*1000);
    licitacionBl.fecha_fin = new Date(fechas.fecha_fin*1000);
    licitacionBl.fecha_mesa_adm = new Date(fechas.fecha_mesa_adm*1000);
    licitacionBl.fecha_mesa_subj = new Date(fechas.fecha_mesa_subj*1000);
    licitacionBl.fecha_mesa_obj = new Date(fechas.fecha_mesa_subj*1000);

    licitacionBl.sc = {
      address: address,
      jsonInterface: jsonInterface,
    };
    return licitacionBl;
  },

  /**
   * Añade una nueva oferta a una Licitacion
   * @param  {String}            Address
   * @param  {String}            JSONInterface
   * @param  {Object}            Oferta
   * @return {Object}            XXXX
   */
  nuevaOferta: async function(address, jsonInterface, oferta) {
    abi = JSON.parse(jsonInterface);
    contract = new web3.eth.Contract(abi, address, {
      from: acc.address,
      gasPrice: 0,
      gas: 1000000,
    });
    await contract.methods.nuevaOferta(oferta.empresaHash, oferta.subjetivaHash, oferta.objetivaHash, oferta.objetivaCifrada).send();
    var ofertaScId = await contract.methods.getOfertaID(oferta.empresaHash).call();
    return ofertaScId;
  },
  /**
   * Recupera el contenido de la oferta en blockchain en base al hash de la empresa
   * @param  {String}            Address
   * @param  {String}            JSONInterface
   * @param  {String}            empresaHash
   * @return {Object}            Oferta
   */

  getOferta: async function(address, jsonInterface, empresaHash) {
    abi = JSON.parse(jsonInterface);
    contract = new web3.eth.Contract(abi, address, {
      from: acc.address,
      gasPrice: 0,
      gas: 1000000,
    });
    var ofertaScId = await contract.methods.getOfertaID(empresaHash).call();
    var oferta = await contract.methods.ofertas(ofertaScId).call();
    return oferta;
  },

};






