'use strict';
const licitacionSC = require('../../server/lib/licitacion_sc');
const hash = require('js-sha256');
const crypto = require('crypto');

module.exports =  function(Oferta) {
  Oferta.observe('before save', function(ctx, next) {
      async function deploy() {
        // Obtenemos la licitación a la que pertenece para poder acceder al smart contract
        var licitacion = await Oferta.app.models.Licitacion.findById(ctx.instance.licitacionId);

        // Generamos un nonce aleatorio para evitar que con el hash de la empresa se pueda obtener con un diccionario de empresas
        ctx.instance.nonce = await crypto.randomBytes(32).toString('hex');
        ctx.instance.empresaHash = hash.sha256(ctx.instance.empresa + ctx.instance.nonce);
        ctx.instance.ofertaScId = await licitacionSC.nuevaOferta(licitacion.sc.address, licitacion.sc.jsonInterface, ctx.instance);
        console.log(await licitacionSC.getOferta(licitacion.sc.address, licitacion.sc.jsonInterface, ctx.instance.empresaHash));
        console.log(await licitacionSC.getLicitacion(licitacion.sc.address, licitacion.sc.jsonInterface));
        return next();
      }
      deploy();
    }
    )};
