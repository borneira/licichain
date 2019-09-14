function OfertasDetailFormController($scope, $mdDialog, licitacion, Licitacion) {
  $scope.numero=1;
  Licitacion.getOfertasBl('licitacionId=' + licitacion.id)
      .$promise
      .then(function(results) {
          $scope.ofertas = results.ofertas;
          $scope.ofertas.forEach(function(e, index) {
            $scope.ofertas[index].numero = index + 1;
          });
          $scope.oferta=$scope.ofertas[0];
        },
        function(err) {
          $scope.ofertaError = err.statusText;
        }
      );

  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.goto = function(oferta) {
    $scope.oferta = oferta;
  }
}

