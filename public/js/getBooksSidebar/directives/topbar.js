angular.module('getBooksSidebar', [])
    .directive('topbar',['$templateCache', function topbar($templateCache) {
        return {
            restrict: 'E',
            template : $templateCache.get('sidebar/template/topbar.html'),
            controller: function($scope){

            }
        };
    }]);