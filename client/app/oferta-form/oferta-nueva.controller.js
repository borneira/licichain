angular.module('nuevaOferta', ['ngMaterial', 'ngSanitize'])
  .controller('NuevaOfertaController', function($scope, $mdDialog) {
    $scope.status= "   ";
    $scope.showNuevaOferta = function(licitacion) {
      $mdDialog.show({
        controller: OfertaFormController,
        templateUrl: 'oferta-form/oferta-form.template.html',
        parent: angular.element(document.body),
        clickOutsideToClose: true,
        multiple: true,
        controllerAs: 'ctrl',
        locals: {licitacion: licitacion}
      })
    };
  });
