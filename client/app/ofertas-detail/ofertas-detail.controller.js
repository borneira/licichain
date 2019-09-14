angular.module('ofertasDetail', ['ngMaterial', 'ngSanitize'])
  .controller('DetalleOfertasController', function($scope, $mdDialog) {
    $scope.status= "   ";
    $scope.mostrarOfertas = function(licitacion) {
      $mdDialog.show({
        controller: OfertasDetailFormController,
        templateUrl: 'ofertas-detail/ofertas-detail.template.html',
        parent: angular.element(document.body),
        clickOutsideToClose: true,
        multiple: true,
        controllerAs: 'ctrl',
        locals: {licitacion: licitacion}
      })
    };
  });
