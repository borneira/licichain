angular.module('mesaObjetiva', ['ngMaterial'])
  .controller('MesaObjetivaController', function($scope, $mdDialog, Licitacion) {

    $scope.mesaObjetiva = function(licitacion)
    {
      Licitacion.mesaObjetiva(`licitacionId=${licitacion.id}`)
        .$promise
        .then(async function(result) {
          console.log(result);
          await $mdDialog.show(
            $mdDialog.alert()
              .clickOutsideToClose(true)
              .title('Mesa objetiva')
              .textContent('Se han realizado automáticamente la valoración objetiva de las ofertas y se han publicado los resultados en el Blockchain')
              .ok('OK')
              // You can specify either sting with query selector
              .openFrom('#left')
              // or an element
              .closeTo(angular.element(document.querySelector('#right')))
          );
        })
    };
  });
