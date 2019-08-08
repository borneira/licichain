
function EmpresaListController($scope, Empresa) {
  $scope.empresas = [];

  function getEmpresas() {
    Empresa
      .find()
      .$promise
      .then(function(results) {
          $scope.empresas = results;
        },
        function(err) {
          $scope.empresasError = err.statusText;
        }
      );
  }

  getEmpresas();
}

angular.module('licichainApp').component('empresaList', { //AngularJS interpretará <empresa-list>
  templateUrl: 'empresa-list/empresa-list.template.html',
  controller: EmpresaListController
});
