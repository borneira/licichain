angular.module('mesaAdministrativa', ['ngMaterial'])

  .controller('MesaAdministrativaController', function($scope, $mdDialog) {
      $scope.status= "   ";
      $scope.mesaAdministrativa = function(ev) {
        $mdDialog.show({
          controller: MesaAdministrativaDetailController,
          templateUrl: 'mesa-administrativa/mesa-administrativa.template.html',
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
