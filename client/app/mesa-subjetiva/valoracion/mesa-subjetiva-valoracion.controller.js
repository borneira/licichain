function MesaSubjetivaValoraOfertaController($scope, oferta, $mdDialog) {
    $scope.oferta = oferta;
    $scope.grabarValoracionOferta = function() {
      $mdDialog.hide();
    }
  };
