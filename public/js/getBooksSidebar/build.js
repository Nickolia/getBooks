( function( angular, undefined ) {
    'use strict';

 angular.module('getBooksSidebar', [])
    .directive('sidebar',['$templateCache', function ($templateCache) {
        return {
            restrict: 'E',
            template : $templateCache.get('sidebar/template/sidebar.html'),
            controller: function($scope){

            }
        };
    }]);

    .directive('topbar',['$templateCache', function topbar($templateCache) {
        return {
            restrict: 'E',
            template : $templateCache.get('sidebar/template/topbar.html'),
            controller: function($scope){

            }
        };
    }]);

} )( window.angular );