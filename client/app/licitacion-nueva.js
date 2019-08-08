angular.module('nuevaLicitacion', ['ngMaterial'])

  .controller('NuevaLicitacionController', function($scope, $mdDialog) {
    $scope.status= "   ";
    $scope.licitacion=[];
    $scope.showNuevaLicitacion = function(ev) {
      $mdDialog.show({
        controller: LicitacionFormController,
        templateUrl: 'licitacion-form/licitacion-form.template2.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true,
        fullscreen: true
      })
        .then(function(answer) {
          $scope.status = 'You said the information was "' + answer + '".';
        }, function() {
          $scope.status = 'You cancelled the dialog.';
        });
    };
  });
