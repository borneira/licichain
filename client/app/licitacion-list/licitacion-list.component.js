function LicitacionListController($scope, Licitacion, $mdDialog) {
  $scope.licitaciones = [];
  $scope.licitacionError="";
  $scope.status="";
  function getLicitaciones() {
    Licitacion
      .find()
      .$promise
      .then(function(results) {
          $scope.licitaciones = results;
        },
        function(err) {
          $scope.licitacionError = err.statusText;
        }
      );
  }

  $scope.showLicitacion = function(licitacion) {
    $mdDialog.show({
      controller: LicitacionDetailController,
      templateUrl: 'licitacion-detail/licitacion-detail.template.html',
      parent: angular.element(document.body),
      locals: {licitacion: licitacion},
      clickOutsideToClose: true,
      fullscreen: true
    })
      .then(function(answer) {
        $scope.status = 'You said the information was "' + answer + '".';
      }, function() {
        $scope.status = 'You cancelled the dialog.';
      });
  };
  getLicitaciones();
}


angular.module('licichainApp').component('licitacionList', { //AngularJS interpretará <licitacion-list>
  templateUrl: 'licitacion-list/licitacion-list.template.html',
  controller: LicitacionListController
});
