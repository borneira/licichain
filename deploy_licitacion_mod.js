const Web3 = require('web3');
const licitacionSC = require('./server/lib/licitacion_sc');

let licitacion = {
  objeto: 'Suministro de PCs',
  fecha_inicio: new Date('2019-08-13T22:00:00.000Z'),
  fecha_fin: new Date('2019-08-17T22:00:00.000Z'),
  fecha_mesa_adm: new Date('2019-08-19T22:00:00.000Z'),
  fecha_mesa_subj: new Date('2019-08-21T22:00:00.000Z'),
  fecha_mesa_obj: new Date('2019-08-24T22:00:00.000Z'),
  org_contratacion: 'Ayuntamiento de Vigo',
  CPV: '36331',
  importe_max: 100000,
  ppt: 'Equipos con 256GB de RAM y 8 procesadores',
  pca: 'Addenda del contrato',
  criterios: 'Precio,80'
}

async function main() {
  myLic = await licitacionSC.deployLicitacion(licitacion);
  console.log(myLic);
  myLic2 = await licitacionSC.getLicitacion(myLic.sc.address, myLic.sc.jsonInterface);
  console.log(myLic2);
}

main();
