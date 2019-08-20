'use strict';
const licitacionSC = require('../../server/lib/licitacion_sc');

module.exports = function(Oferta) {
  Oferta.observe('before save', function(ctx, next) {
      console.log(ctx.instance);
       return next();
    }
  )};
