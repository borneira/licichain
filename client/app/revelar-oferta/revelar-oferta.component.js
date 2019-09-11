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
            if ($scope.tipoOferta=='subjetiva') {
              ofertaPlain = await cryptoUtils.decrypt(clave, oferta.subjetivaCifrada);
            }
            else {
              ofertaPlain = await cryptoUtils.decrypt(clave, oferta.objetivaCifrada);
            }
            console.log(ofertaPlain);
            Licitacion.revelaOferta(`licitacionId=${$scope.licitacion.id}&oferta=${ofertaPlain}&tipoOferta=${$scope.tipoOferta}&empresa=${$scope.oferta.empresa}`)
              .$promise
              .then(function(res) {
                console.log(res)
              },
              async function(err) {
                console.log(err);
              });
          }
        }
      },
      async function(err) {
      console.log(err);
    })
  }
};
