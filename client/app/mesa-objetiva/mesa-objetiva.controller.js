angular.module('mesaObjetiva', ['ngMaterial'])

  .controller('MesaObjetivaController', function($scope, $mdDialog) {
      $scope.status= "   ";
      $scope.mesaObjetiva = function(ev) {
        $mdDialog.show({
          controller: MesaObjetivaDetailController,
          templateUrl: 'mesa-objetiva/mesa-objetiva.template.html',
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
