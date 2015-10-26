angular.module('getBooksCore', [])
    .controller('Master',['$scope', 'socket', function ($scope, socket) {
        socket.emit('connection');
        $scope.update_list = {
            list: [],
            limit: 100,
            order: '-unix_time',
            addToLimit: function(){
                if(this.limit+100 < this.list.length){
                    this.limit+=100;
                } else {
                    this.limit = this.list.length;
                }
            }
        };
    }]);