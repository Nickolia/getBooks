(function () {
    'use strict';

 angular.module('getBooksIndex', [])
    .controller('Index',['$scope', 'socket', function ($scope, socket) {

    }])
.run(["$templateCache", function($templateCache) {$templateCache.put("index.html","\n<md-whiteframe class=\"md-whiteframe-4dp\" flex-gt-md  flex-order-gt-md=\"1\" layout-margin>\n    <update-list property-tag=\"new\" list=\"update_list.list\" ></update-list>\n</md-whiteframe>\n\n\n<md-whiteframe class=\"md-whiteframe-4dp\" flex-gt-md  flex-order-gt-md=\"2\" layout-margin>\n    <update-list property-tag=\"edit\"  list=\"update_list.list\"></update-list>\n</md-whiteframe>\n\n\n");}])

})();