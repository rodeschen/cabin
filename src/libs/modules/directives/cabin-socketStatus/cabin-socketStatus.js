'use strict';
define(['cabin'], function(cabin) {
    return ['directive', 'cbSocketStatus', ['$location', 'cabinModulePath', '$http', '$rootScope', 'gSocket',
        function($location, cabinModulePath, $http, $rootScope, gSocket) {
            return {
                templateUrl: cabinModulePath + 'directives/cabin-socketStatus/templates/socketStatus.html',
                restrict: 'A',
                scope: {
                    'socketName': '@'
                },
                link: function($scope, iElement) {
                    // 0: 未連線 , 1: 已連線 , 2: 連線中/重新連線中 , 3: 斷線/連線錯誤
                    $scope.status = 0;
                    var socket = angular.element(iElement).injector().get($scope.socketName);
                    //check current status
                    if (socket.socket.socket.connected) {
                        $scope.status = 1;
                    }

                    angular.forEach(['connect', 'reconnect', 'connecting', 'reconnecting', 'disconnect', 'connect_failed', 'error', 'reconnect_failed'], function(value, key) {
                        socket.on(value,
                            function() {
                                eventHandle(value, arguments);
                            })
                    });


                    function eventHandle(event, args) {
                        switch (event) {
                            case 'connect':
                            case 'reconnect':
                                $scope.status = 1;
                                break;
                            case 'connecting':
                            case 'reconnecting':
                                $scope.status = 2;
                                break;

                            case 'disconnect':
                            case 'connect_failed':
                            case 'error':
                            case 'reconnect_failed':
                                $scope.status = 3;
                                break;

                        }
                    }

                    $scope.getStatusClass = function() {
                        return {
                            connect: $scope.status === 1,
                            connecting: $scope.status === 2,
                            error: $scope.status === 3,
                            disconnect: $scope.status === 0
                        }
                    }

                    $scope.reconnect = function() {
                        if ($scope.status !== 1) {
                            socket.socket.socket.connect();
                        }
                    }

                    $scope.getDesc = function() {
                        return ['','已連線','連線中','連線錯誤，點擊後重試'][$scope.status];
                    }
                }
            };
        }
    ]];
});
