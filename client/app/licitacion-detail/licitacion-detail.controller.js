angular.module('showLicitacion', ['ngMaterial'])

  .controller('ShowLicitacionController', function($scope, $mdDialog) {
    $scope.status= "   ";
    $scope.licitacion=[];
    $scope.showLicitacion = function(ev) {
      $mdDialog.show({
        controller: LicitacionDetailController,
        templateUrl: 'licitacion-detail/licitacion-detail.template.html',
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
