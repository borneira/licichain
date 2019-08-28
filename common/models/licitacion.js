'use strict';
const licitacionSC = require('../../server/lib/licitacion_sc');

function logDiscrepancia(campo, campoBbdd, campoBlockchain) {
  console.log('Inconsitencia detectada en BBDD: ' + campo + ' diferente');
  console.log(campo + ' en blockchain: ' + campoBlockchain);
  console.log(campo + ' en BBDD: ' + campoBbdd);
}
async function consultBlockchain(licitacionBbdd) {
  let licitacionBl = await licitacionSC.getLicitacion(licitacionBbdd.sc.address,
    licitacionBbdd.sc.jsonInterface);
  // Se comprueba si la información en la BBDD es coherente con la información en blockchain
  console.log(licitacionBl);
  let inconsistencias = [];
  if (licitacionBl.objeto !== licitacionBbdd.objeto) {
    logDiscrepancia('Objeto', licitacionBbdd.objeto, licitacionBl.objeto);
    inconsistencias.push('Objeto');
  }
  if (licitacionBl.fecha_inicio.getTime() !== licitacionBbdd.fecha_inicio.getTime()) {
    logDiscrepancia('Fecha inicio', licitacionBbdd.fecha_inicio,
      licitacionBl.fecha_inicio);
    inconsistencias.push('Fecha inicio');
  }
  // TODO: Comprobar el resto de fechas
  if (licitacionBl.org_contratacion !== licitacionBbdd.org_contratacion) {
    logDiscrepancia('Órgano de contratación',
      licitacionBbdd.org_contratacion, licitacionBl.org_contratacion);
    inconsistencias.push('Órgano de contratación');
  }
  if (licitacionBl.importe_max !== licitacionBbdd.importe_max.toString()) {
    logDiscrepancia('Importe de contratación',
      licitacionBbdd.importe_max, licitacionBl.importe_max);
    inconsistencias.push('Importe máximo');
  }
  if (licitacionBl.CPV !== licitacionBbdd.CPV) {
    logDiscrepancia('CPV', licitacionBbdd.CPV, licitacionBl.CPV);
    inconsistencias.push('CPV');
  }
  if (licitacionBl.PPTHash !== licitacionBbdd.PPTHash) {
    logDiscrepancia('PPTHash', licitacionBbdd.PPTHash, licitacionBl.PPTHash);
    inconsistencias.push('PPTHash');
  }
  if (licitacionBl.PCAHash !== licitacionBbdd.PCAHash) {
    logDiscrepancia('PCAHash', licitacionBbdd.PCAHash, licitacionBl.PCAHash);
    inconsistencias.push('PCAHash');
  }
  if (licitacionBl.criterios !== licitacionBbdd.criterios) {
    logDiscrepancia('Criterios', licitacionBbdd.criterios,
      licitacionBl.criterios);
    inconsistencias.push('criterios');
  }
  // Se añade al modelo la información de inconsistencias entre la BBDD y el blockchain
  licitacionBl.inconsistencias = inconsistencias;

  licitacionBl.ppt = licitacionBbdd.ppt;
  licitacionBl.pca = licitacionBbdd.pca;

  return licitacionBl;
}

module.exports = function(Licitacion) {
  Licitacion.getDetail = async function(licitacionId) {
    let licitacionBbdd = await Licitacion.findById(licitacionId);
    console.log(licitacionBbdd);
    let licitacionBl = await consultBlockchain(licitacionBbdd);
    console.log(licitacionBl);
    return licitacionBl;
  };


  Licitacion.observe('before save', function(ctx, next) {
    async function deploy() {
      ctx.instance = await licitacionSC.deployLicitacion(ctx.instance);
      return next();
    }

    deploy().then();
  });
};
