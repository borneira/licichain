function CriterioFormController($scope, $mdDialog, licitacion ) {
  $scope.licitacion = licitacion;
  $scope.criterio = {};
  $scope.grabarCriterio = function() {
    $scope.licitacion.criterios.push(JSON.stringify($scope.criterio));
    $mdDialog.hide();
  }
}
