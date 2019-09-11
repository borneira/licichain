function OfertaFormController($scope, $mdDialog, Oferta, $rootScope, licitacion, Licitacion, $window) {
  $scope.status = '';
  $scope.oferta = {};
  $scope.oferta.empresa = $rootScope.usuario.descripcion;
  $scope.licitacion = licitacion;
  console.log(licitacion.criterios);
  $scope.criterios = JSON.parse(`[${licitacion.criterios}]`);
  console.log($scope.criterios);
  $scope.hide = function() {
    $mdDialog.hide();
  };

  $scope.cancel = function() {
    $mdDialog.cancel();
  };

  $scope.answer = function(answer) {
    $mdDialog.hide(answer);
  };


  $scope.grabarNuevaOferta = async function() {
    var clave1 = await cryptoUtils.generateKey();
    var clave2 = await cryptoUtils.generateKey();
    var oferta_enc = {};
    oferta_enc.subjetivaCifrada = await cryptoUtils.encrypt(clave1.key, $scope.oferta.subjetiva);
    oferta_enc.objetivaCifrada  = await cryptoUtils.encrypt(clave2.key, JSON.stringify($scope.oferta.objetiva));
    oferta_enc.subjetivaHash = await cryptoUtils.sha256($scope.oferta.subjetiva);

    //TODO
    // Se debe utilizar un nonce para evitar que se pueda averiguar la oferta objetiva por ataque con diccionario
    // El nonce debe guardarlo la empresa junto con las claves
    oferta_enc.objetivaHash  = await cryptoUtils.sha256($scope.oferta.objetiva);
    oferta_enc.empresa = $scope.oferta.empresa;
    console.log(oferta_enc);

    await $mdDialog.show(
      $mdDialog.confirm()
        .clickOutsideToClose(true)
        .title('IMPORTANTE: Anota esta información')
        .htmlContent('<h4>La oferta que ha presentado se almacenará cifrada y será necesario' +
          'que durante el proceso de licitación, en la fase de apertura de ofertas, presente' +
          'la lista de palabras para proceder a la recuperación de la oferta</h4>' +
          '<label>Clave mesa criterios subjetivos:</label><p>'+clave1.mnemonic+'</p>' +
          '<label>Clave mesa criterios objetivos:</label><p>'+clave2.mnemonic+'</p>')
        .ok('Anotado')
        // You can specify either sting with query selector
        .openFrom('#left')
        // or an element
        .closeTo(angular.element(document.querySelector('#right')))
    );
    console.log($scope);
    Licitacion.oferta.create({id: $scope.licitacion.id}, oferta_enc)
      .$promise
      .then(function(results) {
          console.log(results);
          $mdDialog.hide();
        },
        async function(err) {
          console.log(err);
          await $mdDialog.show(
            $mdDialog.alert()
              .clickOutsideToClose(true)
              .title('Error al enviar la oferta')
              .textContent(err.data.error.message)
              .ok('Entendido')
              // You can specify either sting with query selector
              .openFrom('#left')
              // or an element
              .closeTo(angular.element(document.querySelector('#right')))
          );
        }
      );

  };
};
