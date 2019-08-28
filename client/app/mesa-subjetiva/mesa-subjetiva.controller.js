angular.module('mesaSubjetiva', ['ngMaterial'])

  .controller('MesaSubjetivaController', function($scope, $mdDialog) {
      $scope.status= "   ";
      $scope.mesaSubjetiva = function(ev) {
        $mdDialog.show({
          controller: MesaSubjetivaDetailController,
          templateUrl: 'mesa-subjetiva/mesa-subjetiva.template.html',
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
