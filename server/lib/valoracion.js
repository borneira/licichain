module.exports = {

  /**
   * Calcula las valoraciones objetivas de las empresas
   * @param  {Object}            licitacion
   * @param  {Array}             ofertas
   * @return {Array}             ofertasValoradas
   */
  valoraLicitacion: function(licitacion, ofertas) {
    let criterios = JSON.parse(`[${licitacion.criterios}]`);

    // Inicializamos las valoraciones objetivas
    ofertas.forEach(function(oferta, index) {
      ofertas[index].valoracionObjetiva = {};
      ofertas[index].valoracionTotal = ofertas[index].valoracionSubjetiva;
    });
    for (let criterio of criterios) {
      if (criterio.formula === 'relativa_decreciente') {
        console.log('relativa_decreciente');
        // Obtenemos la mejor oferta
        let ofertaMin = Number(criterio.vmax);
        for (let oferta of ofertas) {
          ofertaMin = Math.min(ofertaMin,
            Number(JSON.parse(oferta.objetiva)[criterio.nombre]));
        }
        console.log(ofertaMin);
        // Calculamos la valoración de las ofertas
        ofertas.forEach(function(oferta, index) {
          if (Number(criterio.vmax) === ofertaMin) {
            ofertas[index].valoracionObjetiva[criterio.nombre] = 0;
          } else {
            console.log(criterio);
            console.log(JSON.parse(oferta.objetiva)[criterio.nombre]);
            ofertas[index].valoracionObjetiva[criterio.nombre] =
              Number(criterio.peso) *
              (Number(criterio.vmax) -
                Number(JSON.parse(oferta.objetiva)[criterio.nombre])) /
              (Number(criterio.vmax) - ofertaMin);
            ofertas[index].valoracionTotal =
              ofertas[index].valoracionTotal +
              ofertas[index].valoracionObjetiva[criterio.nombre];
          }

        });
      }
      if (criterio.formula === 'relativa_creciente') {
        console.log('relativa_creciente');
        // Obtenemos la mejor oferta
        let ofertaMax = Number(criterio.vmin);
        for (let oferta of ofertas) {
          ofertaMax = Math.max(ofertaMax,
            Number(JSON.parse(oferta.objetiva)[criterio.nombre]));
        }
        // Calculamos la valoración de las ofertas
        ofertas.forEach(function(oferta, index) {
          if (criterio.vmin === ofertaMax) {
            ofertas[index].valoracionObjetiva[criterio.nombre] = 0;
          } else {
            ofertas[index].valoracionObjetiva[criterio.nombre] =
              Number(criterio.peso) *
              (Number(JSON.parse(oferta.objetiva)[criterio.nombre]) -
                Number(criterio.vmin)) /
              (ofertaMax - Number(criterio.vmin));
            ofertas[index].valoracionTotal =
              ofertas[index].valoracionTotal +
              ofertas[index].valoracionObjetiva[criterio.nombre];
          }
        });
      }
      if (criterio.formula === 'absoluta_decreciente') {
        console.log('absoluta_decreciente');

        // Calculamos la valoración de las ofertas
        ofertas.forEach(function(oferta, index) {
          ofertas[index].valoracionObjetiva[criterio.nombre] =
            Number(criterio.peso) *
            (Number(criterio.vmax) -
              Number(JSON.parse(oferta.objetiva)[criterio.nombre])) /
            (Number(criterio.vmax) - Number(criterio.vmin));
          ofertas[index].valoracionTotal =
            ofertas[index].valoracionTotal +
            ofertas[index].valoracionObjetiva[criterio.nombre];
        });
      }
      if (criterio.formula === 'absoluta_creciente') {
        console.log('absoluta_creciente');
        // Calculamos la valoración de las ofertas
        ofertas.forEach(function(oferta, index) {
          ofertas[index].valoracionObjetiva[criterio.nombre] =
            Number(criterio.peso) *
            (Number(JSON.parse(oferta.objetiva)[criterio.nombre]) -
              Number(criterio.vmin)) /
            (Number(criterio.vmax) - Number(criterio.vmin));
          ofertas[index].valoracionTotal =
            ofertas[index].valoracionTotal +
            ofertas[index].valoracionObjetiva[criterio.nombre];
        });
      }
    }
    return ofertas;
  },

  /**
   * Determina la oferta adjudicatiria
   * @param  {Array}             ofertas
   * @return {Array}             ofertaAdjudicataria
   */
  obtieneAdjudicataria: function(ofertas) {
    let adjudicatario = {};
    let ofertaAdjudicataria = ofertas[0];
    for (let oferta of ofertas) {
      if (oferta.valoracionTotal > ofertaAdjudicataria.valoracionTotal) {
        ofertaAdjudicataria = oferta;
      }
    }
    return ofertaAdjudicataria;
  },
};
