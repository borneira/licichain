'use strict';
const licitacionSC = require('../../server/lib/licitacion_sc');

module.exports = function(Licitacion) {
  Licitacion.observe('before save', function(ctx, next) {
    async function deploy() {
      ctx.instance = await licitacionSC.deployLicitacion(ctx.instance);
      console.log(ctx.instance);
      return next();
    }

    console.log(ctx.instance);
    deploy();
  }
  )};
