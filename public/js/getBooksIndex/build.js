(function () {
    'use strict';

 angular.module('getBooksIndex', [])
    .controller('Index',['$scope', 'socket', function ($scope, socket) {

    }])
.run(["$templateCache", function($templateCache) {$templateCache.put("index.html","<div flex hide-sm  flex-order=\"1\" layout-margin>\n\n</div>\n<md-whiteframe class=\"md-whiteframe-4dp\" flex  flex-order=\"2\" layout-margin>\n    <update-list></update-list>\n</md-whiteframe>\n<div flex hide-sm  flex-order=\"3\" layout-margin>\n\n</div>");}])

})();