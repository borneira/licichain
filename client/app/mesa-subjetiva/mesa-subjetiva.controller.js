angular.module('mesaSubjetiva', ['ngMaterial'])
  .controller('MesaSubjetivaController', function($scope, $mdDialog, Licitacion) {
    $scope.mesaSubjetiva = function(licitacion) {
      $scope.licitacion = licitacion;
      Licitacion.oferta({id: licitacion.id})
        .$promise
        .then(async function(ofertas) {
          $scope.ofertas = ofertas;
          $mdDialog.show({
            controller: MesaSubjetivaDetailController,
            templateUrl: 'mesa-subjetiva/mesa-subjetiva.template.html',
            parent: angular.element(document.body),
            clickOutsideToClose: true,
            fullscreen: true,
            multiple: true,
            locals: {ofertas: ofertas}
          });
        })
    };
  });
