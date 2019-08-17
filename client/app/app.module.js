angular.module('licichainApp', [
  'licitacionList', 'licitacionForm','empresaList', 'lbServices', 'ngMaterial', 'md.data.table', 'nuevaLicitacion', 'showLicitacion', 'licitacionDetail'
])
  .config(function($mdThemingProvider) {
    $mdThemingProvider.theme('docs-dark')
  });
:

