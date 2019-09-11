'use strict';
const licitacionSC = require('../../server/lib/licitacion_sc');
const hash = require('js-sha256');
const crypto = require('crypto');

module.exports = function(Oferta) {
  Oferta.observe('before save', function(ctx, next) {
    if (ctx.instance === undefined) { return next(); }
    async function deploy() {
        // Obtenemos la licitación a la que pertenece para poder acceder al smart contract
      try {
        let licitacion = await Oferta.app.models.Licitacion
            .findById(ctx.instance.licitacionId);
          // Generamos un nonce aleatorio para evitar que
          // con el hash de la empresa se pueda obtener con un diccionario de empresas
        ctx.instance.nonce = await crypto.randomBytes(32).toString('hex');
        ctx.instance.empresaHash =
            hash.sha256(ctx.instance.empresa + ctx.instance.nonce);
        ctx.instance.ofertaScId =
            await licitacionSC.nuevaOferta(licitacion.sc.address,
              licitacion.sc.jsonInterface, ctx.instance);
        return next();
      } catch (error) {
        return next(error);
      }
    }

    deploy().then();
  },
  );

  //Exponemos solo las operaciones necesarias
  Oferta.disableRemoteMethodByName('replaceOrCreate');
  Oferta.disableRemoteMethodByName('patchOrCreate(');
  Oferta.disableRemoteMethodByName('exists');
  Oferta.disableRemoteMethodByName('findOne');
  Oferta.disableRemoteMethodByName('count');
  Oferta.disableRemoteMethodByName('replaceById');
  Oferta.disableRemoteMethodByName('prototype.patchAttributes');
  Oferta.disableRemoteMethodByName('createChangeStream');
  Oferta.disableRemoteMethodByName('updateAll');
  Oferta.disableRemoteMethodByName('replaceOrCreate');
  Oferta.disableRemoteMethodByName('replaceById');
  Oferta.disableRemoteMethodByName('deleteById');
  Oferta.disableRemoteMethodByName('upsertWithWhere');

  Oferta.disableRemoteMethodByName('protoype.__destroy__empresa');
  Oferta.disableRemoteMethodByName('protoype.__update__empresa');
  Oferta.disableRemoteMethodByName('protoype.__destroy__empresas');
  Oferta.disableRemoteMethodByName('protoype.__update__empresas');
  Oferta.disableRemoteMethodByName('protoype.__destroybyId__empresa');
  Oferta.disableRemoteMethodByName('protoype.__updatebyId__empresa');
  Oferta.disableRemoteMethodByName('protoype.__destroybyId__empresas');
  Oferta.disableRemoteMethodByName('protoype.__updatebyId__empresas');


  Oferta.disableRemoteMethodByName('protoype.__create__licitacion');
  Oferta.disableRemoteMethodByName('protoype.__update__licitacion');
  Oferta.disableRemoteMethodByName('protoype.__destroy__licitacion');


};
