function LicitacionListController($scope, Licitacion) {
  $scope.licitaciones = [];
  $scope.licitacionError="";
  function getLicitaciones() {
    Licitacion
      .find()
      .$promise
      .then(function(results) {
          $scope.licitaciones = results;
        },
        function(err) {
          $scope.licitacionError = err.statusText;
        }
      );
  }

  getLicitaciones();
}


angular.module('licichainApp').component('licitacionList', { //AngularJS interpretará <licitacion-list>
  templateUrl: 'licitacion-list/licitacion-list.template.html',
  controller: LicitacionListController
});
