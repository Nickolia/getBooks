'use strict';

var get_book = angular.module('getBooks', [
    'ngRoute',
    'ngAria',
    'ngAnimate',
    'ngMaterial',
    'ngMdIcons',
    'ngSanitize',
    'getBooksCore',
    'getBooksIndex',
    'getBooksAuth',
    'getBooksSidebar',
    'btford.socket-io'

])
    .config(function ($routeProvider, $locationProvider) {
      $routeProvider.
        when('/', {
          templateUrl: 'index.html',
          controller: 'Index'
        }).
        when('/about', {
          templateUrl: 'index.html',
          controller: 'Index'
        }).
        otherwise({
          redirectTo: '/'
        });

        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');
    })
    .run(function($rootScope, $templateCache) {
        $rootScope.$on('$routeChangeStart', function(event, next, current) {
            if (typeof(current) !== 'undefined'){
                $templateCache.remove(current.templateUrl);
            }
        });
    })
    /*.config(function($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .dark();
    })*/;
