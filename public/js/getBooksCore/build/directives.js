angular.module('getBooksCore', [])
    .directive('timer',['$templateCache',function ($templateCache) {
        return {
            restrict: 'AE',
            scope:{
                unixTime : "="
            },
            template: $templateCache.get('timer.html'),
            controller: function($scope, $timeout, timeCore){
                $scope.date = new Date($scope.unixTime);
            }
        };
    }])
angular.module('getBooksCore', [])
    .directive('updateList',['$templateCache',function ($templateCache) {
        return {
            restrict: 'E',
            template: $templateCache.get('update_list.html'),
            controller: function($scope, socket) {

                socket.on('clear&update:samlib:list', function (list_clear, list_update) {
                    _.each(list_clear, function(item){
                        $scope.update_list.list = _.filter($scope.update_list.list, function(num){ return (num.id != item.id)||(num.id == item.id && num.unix_time == item.unix_time); });
                    });
                    _.each(list_update, function(item){
                        item.unix_time = item.unix_time*1;
                        $scope.update_list.list.push(item);
                    });
                });
            }
        };
    }])