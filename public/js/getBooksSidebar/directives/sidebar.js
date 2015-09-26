angular.module('getBooksSidebar', [])
    .directive('sidebar',['$templateCache', function ($templateCache) {
        return {
            restrict: 'E',
            template : $templateCache.get('sidebar/template/sidebar.html'),
            controller: function($scope){

            }
        };
    }]);