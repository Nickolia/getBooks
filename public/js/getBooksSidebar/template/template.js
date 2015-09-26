angular.module('getBooksSidebar').run(['$templateCache', function($templateCache) {
    $templateCache.put('sidebar.html',
        "<md-sidenav class=\"md-sidenav-right md-whiteframe-z2\" md-component-id=\"left\">\n    <md-toolbar class=\"md-theme-light\">\n        <h1 class=\"md-toolbar-tools\"></h1>\n    </md-toolbar>\n    <md-content layout-padding>\n\n    </md-content>\n</md-sidenav>");
}]);
angular.module('getBooksSidebar').run(['$templateCache', function($templateCache) {
    $templateCache.put('topbar.html',
        "<md-toolbar>\n    <div class=\"md-toolbar-tools\">\n        <md-button class=\"md-icon-button\" aria-label=\"Settings\">\n            <ng-md-icon icon=\"menu\" options=\"{'duration': 375}\"></ng-md-icon>\n        </md-button>\n        <h2>\n            <span>Toolbar with Icon Buttons</span>\n        </h2>\n        <span flex></span>\n        <md-button class=\"md-icon-button\" aria-label=\"Favorite\">\n            <ng-md-icon icon=\"favorite\" style=\"color: greenyellow;\"></ng-md-icon>\n        </md-button>\n        <md-button class=\"md-icon-button\" aria-label=\"More\">\n            <ng-md-icon icon=\"more_vert\"></ng-md-icon>\n        </md-button>\n    </div>\n</md-toolbar>");
}]);