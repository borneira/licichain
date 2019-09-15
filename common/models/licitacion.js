'use strict';

const licitacionSC = require('../../server/lib/licitacion_sc');
const cryptoUtils = require('../../server/lib/crypto-utils');
const valoracion = require('../../server/lib/valoracion');

function logDiscrepancia(campo, campoBbdd, campoBlockchain) {
  console.log('Inconsitencia detectada en BBDD: ' + campo + ' diferente');
  console.log(campo + ' en blockchain: ' + campoBlockchain);
  console.log(campo + ' en BBDD: ' + campoBbdd);
}
async function consultBlockchain(licitacionBbdd) {
  let licitacionBl = await licitacionSC.getLicitacion(licitacionBbdd.sc.address,
    licitacionBbdd.sc.jsonInterface);
  // Se comprueba si la información en la BBDD es coherente con la información en blockchain
  let inconsistencias = [];
  if (licitacionBl.objeto !== licitacionBbdd.objeto) {
    logDiscrepancia('Objeto', licitacionBbdd.objeto, licitacionBl.objeto);
    inconsistencias.push('Objeto');
  }
  if (licitacionBl.fecha_inicio.getTime() !==
    licitacionBbdd.fecha_inicio.getTime()) {
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

  // Necesitamos enviar también el ID para usarlo desde el frontend
  licitacionBl.id = licitacionBbdd.id;
  return licitacionBl;
}

async function getOfertaBl(ofertaBbdd, licitacion) {
  let ofertaBl = await licitacionSC.getOferta(licitacion.sc.address,
    licitacion.sc.jsonInterface, ofertaBbdd.empresaHash);
  return ofertaBl;
};

module.exports = function(Licitacion) {
  Licitacion.getDetail = async function(licitacionId) {
    let licitacionBbdd = await Licitacion.findById(licitacionId);
    let licitacionBl = await consultBlockchain(licitacionBbdd);
    return licitacionBl;
  };

  Licitacion.getOfertasBl = async function(licitacionId) {
    let licitacionBbdd =
      await Licitacion.findById(licitacionId, {include: 'oferta'});
    let ofertasBbdd = await licitacionBbdd.oferta();
    let ofertasBl = [];
    for (let ofertaBbdd of ofertasBbdd) {
      ofertasBl.push(await getOfertaBl(ofertaBbdd, licitacionBbdd));
    }
    return ofertasBl;
  };

  Licitacion.mesaAdministrativa = async function(licitacionId) {
    // Recuperamos la licitacion de la BBDD
    let licitacionBbdd =
      await Licitacion.findById(licitacionId, {include: 'oferta'});
    let ofertas = await licitacionBbdd.oferta();
    for (let oferta of ofertas) {
      console.log(oferta);
      await licitacionSC.revelaEmpresa(licitacionBbdd.sc.address,
        licitacionBbdd.sc.jsonInterface, oferta.empresaHash, oferta.nonce,
        oferta.empresa);
    }
    return 'No OK';
  };

  Licitacion.mesaSubjetiva = async function(licitacionId, ofertasValoradas) {
    // Recuperamos la licitacion de la BBDD
    let licitacionBbdd =
      await Licitacion.findById(licitacionId, {include: 'oferta'});
    let ofertas = await licitacionBbdd.oferta();
    for (let oferta of ofertas) {
      let ofertaValorada = ofertasValoradas.find(function(of) {
        return of.empresaHash === oferta.empresaHash;
      });
      await licitacionSC.valoraOfertaSubjetiva(licitacionBbdd.sc.address,
        licitacionBbdd.sc.jsonInterface,
        oferta.empresaHash, ofertaValorada.valoracionSubjetiva);
      oferta.updateAttribute('valoracionSubjetiva',
        ofertaValorada.valoracionSubjetiva,
        function(result) {
        },
      );
    }
    return 'OK';
  };

  Licitacion.mesaObjetiva = async function(licitacionId) {
    let licitacionBbdd =
      await Licitacion.findById(licitacionId, {include: 'oferta'});
    let ofertas = await licitacionBbdd.oferta();
    let ofertasValoradas = valoracion
      .valoraLicitacion(licitacionBbdd, ofertas);
    let ofertaAdjudicataria = valoracion.obtieneAdjudicataria(ofertas);
    console.log(ofertaAdjudicataria);
    await licitacionSC.ofertaAdjudicataria(licitacionBbdd.sc.address,
      licitacionBbdd.sc.jsonInterface,
      ofertaAdjudicataria.empresaHash,
      Number(JSON.parse(ofertaAdjudicataria.objetiva).Importe));
    for (let oferta of ofertasValoradas) {
      await licitacionSC.valoraOfertaObjetiva(licitacionBbdd.sc.address,
        licitacionBbdd.sc.jsonInterface,
        oferta.empresaHash, JSON.stringify(oferta.valoracionObjetiva));
      oferta.updateAttribute('valoracionObjetiva',
        oferta.valoracionObjetiva,
        function(result) {
        },
      );
    }
    licitacionBbdd.updateAttribute('empresaAdjudicataria',
      ofertaAdjudicataria.empresa, function(result) {
      },
    );
    licitacionBbdd.updateAttribute('importe_adj',
      Number(JSON.parse(ofertaAdjudicataria.objetiva).Importe),
      function(result) {
      },
    );
    return ofertasValoradas;
  };

  Licitacion.revelaOferta =
    async function(licitacionId, oferta, tipoOferta, empresa) {
      // Recuperamos la licitacion de la BBDD
      let licitacionBbdd =
        await Licitacion.findById(licitacionId, {include: 'oferta'});

      // Identificamos la oferta de la empresa
      let ofertas = await licitacionBbdd.oferta();
      for (let ofertaBbbd of ofertas) {
        if (ofertaBbbd.empresa == empresa) {
          if (tipoOferta == 'subjetiva') {
            ofertaBbbd.subjetiva = oferta;
            ofertaBbbd.updateAttribute('subjetiva', oferta,
              function(result) {
              },
            );
          } else {
            await licitacionSC.revelaOfertaObjetiva(licitacionBbdd.sc.address,
              licitacionBbdd.sc.jsonInterface, ofertaBbbd.empresaHash, oferta);
            ofertaBbbd.objetiva = oferta;
            ofertaBbbd.updateAttribute('objetiva', oferta,
              function(result) {
              },
            );
          }
        }
      }
      return 'OK!';
    };

  Licitacion.observe('before save', function(ctx, next) {
    async function deploy() {
      if (ctx.instance === undefined) { return next(); }
      ctx.instance = await licitacionSC.deployLicitacion(ctx.instance);
      return next();
    }

    deploy().then();
  });

  // Exponemos solo las operaciones necesarias
  Licitacion.disableRemoteMethodByName('replaceOrCreate');
  Licitacion.disableRemoteMethodByName('patchOrCreate(');
  Licitacion.disableRemoteMethodByName('exists');
  Licitacion.disableRemoteMethodByName('findOne');
  Licitacion.disableRemoteMethodByName('count');
  Licitacion.disableRemoteMethodByName('replaceById');
  Licitacion.disableRemoteMethodByName('prototype.patchAttributes');
  Licitacion.disableRemoteMethodByName('createChangeStream');
  Licitacion.disableRemoteMethodByName('updateAll');
  Licitacion.disableRemoteMethodByName('replaceOrCreate');
  Licitacion.disableRemoteMethodByName('replaceById');
  Licitacion.disableRemoteMethodByName('deleteById');
  Licitacion.disableRemoteMethodByName('upsertWithWhere');

  Licitacion.disableRemoteMethodByName('prototype.__delete__oferta');
  Licitacion.disableRemoteMethodByName('prototype.__destroyById__oferta');
  Licitacion.disableRemoteMethodByName('prototype.__destroy__oferta');
  Licitacion.disableRemoteMethodByName('prototype.__updateById__oferta');

  Licitacion.disableRemoteMethodByName('prototype.__destroy__smartContract');
  Licitacion.disableRemoteMethodByName('prototype.__update__smartContract');

  Licitacion.disableRemoteMethodByName('prototype.__destroy__administracion');
  Licitacion.disableRemoteMethodByName('prototype.__update__administracion');
};
