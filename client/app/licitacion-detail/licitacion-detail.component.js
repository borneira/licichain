function LicitacionDetailController($scope, $mdDialog, licitacion, Licitacion) {

  function getLicitacionDetail(licitacionId) {
    Licitacion
      .getDetail('licitacionId='+licitacionId)
      .$promise
      .then(function(result) {
          $scope.licitacion = result.licitacion;
          // Actualizamos la lista de ofertas
        console.log($scope);
          $scope.getOfertas();
        },
        function(err) {
          $scope.licitacionError = err.statusText;
        }
      );
  }
  getLicitacionDetail(licitacion.id);
  $scope.cancel = function() {
    $mdDialog.hide();
  }

};
