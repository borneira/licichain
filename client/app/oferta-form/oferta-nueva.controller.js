angular.module('nuevaOferta', ['ngMaterial'])

  .controller('NuevaOfertaController', function($scope, $mdDialog) {
    $scope.status= "   ";
    $scope.showNuevaOferta = function(licitacion) {
      $mdDialog.show({
        controller: OfertaFormController,
        templateUrl: 'oferta-form/oferta-form.template.html',
        parent: angular.element(document.body),
        clickOutsideToClose: true,
        fullscreen: true,
        controllerAs: 'ctrl',
        locals: {licitacion: licitacion}
      })
        .then(function(answer) {
          $scope.status = 'You said the information was "' + answer + '".';
        }, function() {
          $scope.status = 'You cancelled the dialog.';
        });
    };
  });
