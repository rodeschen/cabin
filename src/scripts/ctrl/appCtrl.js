'use strict';
define(['cabin'], function(cabin) {
    return ['$scope', '$http', '$timeout', '$interval', function($scope, $http, $timeout, $interval) {
        $http.get('basehandler/queryMenu').success(function(data) {
            $timeout(function() {
                $scope.$emit('broadcast', {
                    'event': 'topMenuBar',
                    'menus': data.menu
                });
            }, 500);
            $interval(function() {
                $scope.currentTime = new Date();
            }, 1000);

            $timeout(function() {
                // $scope.isLogin = true;
            }, 5000);



            angular.extend($scope, {
                openTxn: function(txnId) {
                    $scope.$emit('broadcast', {
                        event: 'pageViewer',
                        page: {
                            url: 'txn120606'
                        }
                    });
                },
                login: function(userForm) {
                    $scope.isLogin = true
                }
            });

        });
    }];
});
