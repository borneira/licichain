function LicitacionFormController($scope, $mdDialog, Licitacion, $rootScope) {
$scope.licitaciones=[];
$scope.status= '';
$scope.licitacion={};
$scope.licitacion.org_contratacion = $rootScope.usuario.descripcion;
$scope.licitacion.criterios = [];
  function getLicitaciones() {
    Licitacion
      .find()
      .$promise
      .then(function(results) {
          $scope.licitaciones = results;
        },
        function(err) {
          $scope.licitacionError = err.statusText;
        },
      );
    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };
  }
  $scope.grabarNuevaLicitacion = function() {
    Licitacion.create($scope.licitacion)
      .$promise
      .then(function(results) {
          $mdDialog.hide();
        },
        function(err) {
          $scope.status=err.statusText;
        }
      );
  };
  $scope.addCriterio = function(licitacion) {
    $mdDialog.show({
      controller: CriterioFormController,
      templateUrl: 'licitacion-form/criterios/criterio-form.template.html',
      parent: angular.element(document.body),
      clickOutsideToClose: true,
      multiple: true,
      controllerAs: 'ctrl',
      locals: {licitacion: licitacion}
    })
  };
  getLicitaciones();
};
