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
/*angular.module('licichainApp').component('licitacionForm', { //AngularJS interpretará <licitacion-form>
  templateUrl: 'licitacion-form/licitacion-form.template.html',
  controller: LicitacionFormController
});*/
