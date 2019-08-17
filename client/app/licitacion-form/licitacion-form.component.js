function LicitacionFormController($scope, $mdDialog, Licitacion) {
$scope.licitaciones=[];
$scope.status= '';
$scope.licitacion={};
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
  getLicitaciones();
};
/*angular.module('licichainApp').component('licitacionForm', { //AngularJS interpretará <licitacion-form>
  templateUrl: 'licitacion-form/licitacion-form.template.html',
  controller: LicitacionFormController
});*/
