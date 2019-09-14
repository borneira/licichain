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
        clickOutsideToClose: false,
        fullscreen: false
      })
    };
  });
