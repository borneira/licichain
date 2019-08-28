function OfertaListController($scope, Oferta, $mdDialog) {
  $scope.ofertas = [];
  $scope.ofertaError="";
  $scope.status="";
  function getOfertas() {
    Oferta
      .find()
      .$promise
      .then(function(results) {
          $scope.ofertas = results;
        },
        function(err) {
          $scope.ofertaError = err.statusText;
        }
      );
  }

  $scope.showOferta = function(oferta) {
    $mdDialog.show({
      controller: OfertaDetailController,
      templateUrl: 'oferta-detail/oferta-detail.template.html',
      parent: angular.element(document.body),
      locals: {oferta: oferta},
      clickOutsideToClose: true,
      fullscreen: true
    })
      .then(function(answer) {
        $scope.status = 'You said the information was "' + answer + '".';
      }, function() {
        $scope.status = 'You cancelled the dialog.';
      });
  };
  getOfertas();
}


angular.module('licichainApp').component('ofertaList', { //AngularJS interpretará <oferta-list>
  templateUrl: 'oferta-list/oferta-list.template.html',
  controller: OfertaListController
});
