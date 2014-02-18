'use strict';
define(['cabin'], function(cabin) {
    return ['controller', 'webSocketCtrl', ['$scope', 'gSocket',
        function($scope, gSocket) {
            $scope.send = function(data) {
                gSocket.emit('chatevent', data);
                data.message = undefined;
            }
        }
    ]];


});
