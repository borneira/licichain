angular.module('licichainApp', [
  'licitacionList', 'licitacionForm','empresaList', 'lbServices', 'ngMaterial',
  'md.data.table', 'nuevaLicitacion', 'showLicitacion', 'licitacionDetail',
  'login', 'nuevaOferta', 'ofertaList', 'verOfertas',
  'mesaAdministrativa', 'mesaSubjetiva', 'mesaObjetiva',
  'revelarOferta'
])
  .config(function($mdThemingProvider) {
    $mdThemingProvider.theme('docs-dark')
  });


