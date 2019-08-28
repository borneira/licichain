function LicitacionDetailController($scope, $mdDialog, licitacion, Licitacion) {

  function getLicitacionDetail(licitacionId) {
    Licitacion
      .getDetail('licitacionId='+licitacionId)
      .$promise
      .then(function(result) {
        console.log(result);
          $scope.licitacion = result.licitacion;
        },
        function(err) {
          $scope.licitacionError = err.statusText;
        }
      );
  }


  $scope.hide = function() {
    $mdDialog.hide();
  };

  $scope.cancel = function() {
    $mdDialog.cancel();
  };

  $scope.answer = function(answer) {
    $mdDialog.hide(answer);
  };
  console.log(licitacion);
  getLicitacionDetail(licitacion.id);

};
