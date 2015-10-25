angular.module('getBooksSidebar', [])
    .directive('sectionBody',['$templateCache','$mdSidenav', function ($templateCache,$mdSidenav) {
        return {
            restrict: 'E',
            transclude: true,
            template : $templateCache.get('section.html'),
            controller: function($scope){
                $scope.openSideBar = function(){
                    $mdSidenav('left').toggle();
                }
            }
        };
    }]);
angular.module('getBooksSidebar', [])
    .directive('sidebar',['$templateCache', function ($templateCache) {
        return {
            restrict: 'E',
            replace:false,
            template : $templateCache.get('sidebar.html'),
            link: function($scope,element){

            }
        };
    }]);