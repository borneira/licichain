function MesaSubjetivaDetailController($scope, $mdDialog, ofertas, Licitacion) {
  $scope.ofertas = ofertas;
  console.log(ofertas);
  $scope.valoraOferta = function(oferta) {
    $mdDialog.show({
      controller: MesaSubjetivaValoraOfertaController,
      templateUrl: 'mesa-subjetiva/valoracion/mesa-subjetiva-valoracion.template.html',
      parent: angular.element(document.body),
      clickOutsideToClose: true,
      fullscreen: true,
      multiple: true,
      locals: {oferta: oferta}
    });
  }
  $scope.publicarValoracion = function(ofertas) {
    let aux =[];
    for (let i of ofertas) {
      aux.push(i);
    }
  Licitacion.mesaSubjetiva(`licitacionId=${ofertas[0].licitacionId}&ofertas=${JSON.stringify(aux)}`)
    .$promise
    .then(async function(result) {
      await $mdDialog.show(
        $mdDialog.alert()
          .clickOutsideToClose(true)
          .title('Valoración de ofertas subjetivas publicadas')
          .textContent('Se ha hecho público la valoración de las ofertas subjetivas')
          .ok('OK')
          // You can specify either sting with query selector
          .openFrom('#left')
          // or an element
          .closeTo(angular.element(document.querySelector('#right')))
      );
    })
  }
}
