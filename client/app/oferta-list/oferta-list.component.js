function OfertaListController($scope, Oferta, $mdDialog, Licitacion) {
  $scope.ofertas = [];
  $scope.ofertaError="";
//  let licitacionId = $scope.$parent.licitacion.id;
  $scope.$parent.getOfertas = getOfertas;
  function getOfertas() {
    let licitacion = $scope.$parent.licitacion;
    console.log(licitacion);
    Licitacion.getOfertasBl('licitacionId=' + licitacion.id)
      .$promise
      .then(function(results) {
          $scope.ofertas = results.ofertas;
          console.log(results.ofertas);
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
 // getOfertas();
}


angular.module('licichainApp').component('ofertaList', { //AngularJS interpretará <oferta-list>
  templateUrl: 'oferta-list/oferta-list.template.html',
  controller: OfertaListController
});
