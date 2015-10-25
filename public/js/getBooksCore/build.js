(function () {
    'use strict';

 angular.module('getBooksCore', [])
    .controller('Master',['$templateCache', function ($templateCache) {

    }])

    .factory('socket',['socketFactory', function (socketFactory) {
        return socketFactory();
    }])
    .value('version', '0.1');

})();