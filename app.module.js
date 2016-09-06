(function ()
{
    'use strict';

    angular
        .module('app',
            [
                'ionic',
                'ngResource',

                'app.home',
            ])
        .config(function($httpProvider,$ionicConfigProvider) {

            $ionicConfigProvider.backButton.text('Voltar');

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
                        
                        // $rootScope.$broadcast('loading:hide');
                        return response
                    },
                    responseError: function(response) {
                        $rootScope.$broadcast('loading:hide');
                        return $q.reject(response);
                    }
                }
            });
            
        .run(runBlock)
        .filter('transformaData', function($filter) {
            return function(theDate) {
                return (new Date(theDate));
            }
        });

    runBlock.$inject = [ '$rootScope', '$ionicLoading', '$state',  '$ionicPlatform', 'pushNotificationService', '$http', '$ionicSideMenuDelegate', '$ionicHistory', '$ionicPopup', 'MSG_BACK_BUTTON', 'RESOURCE_EVENTS'];

    function runBlock($rootScope, $ionicLoading, $state, $ionicPlatform, pushNotificationService, $http, $ionicSideMenuDelegate, $ionicHistory, $ionicPopup, MSG_BACK_BUTTON, RESOURCE_EVENTS) {

            $rootScope.$on(RESOURCE_EVENTS.RESPONSE, function() {
                $ionicLoading.hide();
            });

            $rootScope.$on(RESOURCE_EVENTS.RESPONSE_ERROR, function() {
                $ionicLoading.hide();
            });
        }

        $rootScope.$on('loading:show', function() {
            $ionicLoading.show({template: '<ion-spinner icon="ios"/>'})
        })

        $rootScope.$on('loading:hide', function() {
            $ionicLoading.hide()
        })

    }
    
})();
