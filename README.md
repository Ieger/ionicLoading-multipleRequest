# ionicLoading-multipleRequest

Eu estava com problema com o ionicLoading, pois quando realizava mais de uma requisição e no primeiro response meu interceptor dava hide em todos os ionicLoading, então realizei está implementação para correção do problema.


if($http.pendingRequests.length < 1) {
  $rootScope.$broadcast('loading:hide');
}

Veja o exemplo abaixo :

$httpProvider.interceptors.push(function($rootScope, $q, $injector) {
  return {
    request: function(config) {
      $rootScope.$broadcast('loading:show');
      return config
    },
    response: function(response) {
      var $http =  $injector.get('$http');

      if($http.pendingRequests.length < 1) {
        $rootScope.$broadcast('loading:hide');
      }
                        
      return response
    },
    responseError: function(response) {
      $rootScope.$broadcast('loading:hide');
      return $q.reject(response);
    }
  }
});
