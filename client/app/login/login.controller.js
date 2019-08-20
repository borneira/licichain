angular.module('login', ['ngMaterial'])
  .controller('loginController', function($scope, Usuario, $window, $rootScope) {
    $scope.waitforUser = true;
    Usuario.getCurrent().$promise
      .then(function(_usuario) {
          $rootScope.usuario = _usuario;
          $rootScope.isAuthenticated = true;
          if (_usuario.tipo == 'AAPP') {
            $rootScope.isAAPP = true;
          }
        if (_usuario.tipo == 'EMPRESA') {
          $rootScope.isEMPRESA = true;
        }
          $scope.waitforUser = false;
        },
      )
      .catch(function(error) {
        console.log('Usuario no conectado');
        console.log(error);
        $rootScope.usuario = {};
        $rootScope.isAuthenticated = false;
        $rootScope.isAAPP = false;
        $rootScope.isEMPRESA = false;
        $scope.waitforUser = false;
      });

    $scope.login = function() {
      Usuario.login({
        'username': $scope.usuario.username,
        'password': $scope.usuario.password,
      }).$promise
        .then(function(token) {
          $rootScope.usuario = token.user;
          $rootScope.isAuthenticated = true;
          if (token.user.tipo == 'AAPP') {
            $rootScope.isAAPP = true;
          }
          if (token.user.tipo == 'EMPRESA') {
            $rootScope.isEMPRESA = true;
          }
        })
        .catch(function(error) {
          alert('Error en la autenticación');
          console.log(error);
        });
    };
    $scope.logout = function() {
      Usuario.logout({'id': $window.localStorage.getItem('$LoopBack$accessTokenId')});
      $rootScope.usuario = {};
      $rootScope.isAuthenticated = false;
      $rootScope.isAAPP = false;
      $rootScope.isEMPRESA = false;
    };
  })
;
