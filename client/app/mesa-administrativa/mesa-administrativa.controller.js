angular.module('mesaAdministrativa', ['ngMaterial'])
  .controller('MesaAdministrativaController', function($scope, $mdDialog, Licitacion) {

    $scope.mesaAdministrativa = function(licitacion)
    {
      console.log(licitacion);
      Licitacion.mesaAdministrativa(`licitacionId=${licitacion.id}`)
        .$promise
        .then(async function(result) {
          console.log(result);
          await $mdDialog.show(
            $mdDialog.alert()
              .clickOutsideToClose(true)
              .title('Mesa administrativa')
              .textContent('En la celebración de la mesa administrativa se han hecho públicas en el blockchain las identidades de las empresas que han presentado ofertas')
              .ok('OK')
              // You can specify either sting with query selector
              .openFrom('#left')
              // or an element
              .closeTo(angular.element(document.querySelector('#right')))
          );
        })
    };
  });
