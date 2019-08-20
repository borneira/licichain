angular.module('licichainApp', [
  'licitacionList', 'licitacionForm','empresaList', 'lbServices', 'ngMaterial', 'md.data.table', 'nuevaLicitacion', 'showLicitacion', 'licitacionDetail', 'login', 'nuevaOferta', 'ofertaForm'
])
  .config(function($mdThemingProvider) {
    $mdThemingProvider.theme('docs-dark')
  });


