angular.module('getBooksAuth', [])
    .directive('login',['$templateCache', function ($templateCache) {
        return {
            restrict: 'E',
            template : $templateCache('auth/template/login.html'),
            controller: function($scope){

            }
        };
    }]);