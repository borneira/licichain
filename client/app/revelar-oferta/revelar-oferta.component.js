function RevelarOfertaFormController($scope, $mdDialog, Oferta, $rootScope, licitacion, Licitacion, $window, tipoOferta) {
  $scope.status = '';
  $scope.oferta = {};
  $scope.oferta.empresa = $rootScope.usuario.descripcion;
  $scope.licitacion = licitacion;
  $scope.tipoOferta = tipoOferta;
  $scope.revelarClaveOferta = async function() {

    //Obtenemos las ofertas cifradas
    Licitacion.oferta({id: $scope.licitacion.id})
      .$promise
      .then(async function(results) {
          console.log(results);
          for (oferta of results) {
            if (oferta.empresa == $scope.oferta.empresa) {
              let clave = await cryptoUtils.importkey($scope.oferta.clave);
              let ofertaPlain = null;
              if ($scope.tipoOferta == 'subjetiva') {
                ofertaPlain = await cryptoUtils.decrypt(clave, oferta.subjetivaCifrada);
              } else {
                ofertaPlain = await cryptoUtils.decrypt(clave, oferta.objetivaCifrada);
              }
              console.log(ofertaPlain);
              Licitacion.revelaOferta(`licitacionId=${$scope.licitacion.id}&oferta=${ofertaPlain}&tipoOferta=${$scope.tipoOferta}&empresa=${$scope.oferta.empresa}`)
                .$promise
                .then(async function(res) {
                    if ($scope.tipoOferta == 'subjetiva') {
                      $scope.titulo = 'Revelación oferta subjetiva';
                      $scope.texto = 'Se ha revelado a la administración la oferta subjetiva para su evaluación';
                    } else {
                      $scope.titulo = 'Revelación oferta objetiva';
                      $scope.texto = 'Se ha hecho pública en el blockchain la oferta objetiva';
                    }
                    await $mdDialog.show(
                      $mdDialog.alert()
                        .clickOutsideToClose(true)
                        .title($scope.titulo)
                        .textContent($scope.texto)
                        .ok('OK')
                        // You can specify either sting with query selector
                        .openFrom('#left')
                        // or an element
                        .closeTo(angular.element(document.querySelector('#right'))),
                    );
                    console.log(res);
                  },
                  async function(err) {
                    await $mdDialog.show(
                      $mdDialog.alert()
                        .clickOutsideToClose(true)
                        .title('Revelación oferta')
                        .textContent('Error al revelar la oferta: ' + err)
                        .ok('OK')
                        // You can specify either sting with query selector
                        .openFrom('#left')
                        // or an element
                        .closeTo(angular.element(document.querySelector('#right'))),
                    );
                    console.log(err);
                  });
            }
          }
        },
        async function(err) {
          console.log(err);
        });
  };
};
