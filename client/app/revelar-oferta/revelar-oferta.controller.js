angular.module('revelarOferta', ['ngMaterial', 'ngSanitize'])
  .controller('RevelarOfertaController', function($scope, $mdDialog) {
    $scope.status= "   ";
    $scope.revelarOferta = function(licitacion, tipoOferta) {
      $mdDialog.show({
        controller: RevelarOfertaFormController,
        templateUrl: 'revelar-oferta/revelar-oferta.template.html',
        parent: angular.element(document.body),
        clickOutsideToClose: true,
        controllerAs: 'ctrl',
        multiple: true,
        locals: {licitacion: licitacion, tipoOferta: tipoOferta}
      })
    };
  });
