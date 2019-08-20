function LicitacionDetailController($scope, $mdDialog, licitacion) {
  $scope.licitacion = licitacion;
  $scope.hide = function() {
    $mdDialog.hide();
  };

  $scope.cancel = function() {
    $mdDialog.cancel();
  };

  $scope.answer = function(answer) {
    $mdDialog.hide(answer);
  };

};
