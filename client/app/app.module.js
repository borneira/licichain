angular.module('licichainApp', [
  'licitacionList', 'licitacionForm','empresaList', 'lbServices', 'ngMaterial', 'md.data.table', 'nuevaLicitacion'
])
  .config(function($mdThemingProvider) {
    $mdThemingProvider.theme('docs-dark')
  });

