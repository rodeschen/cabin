'use strict';
define(['cabin'], function(cabin) {
    return ['$scope', '$http', '$timeout', '$interval', 'cbSupeviseModal', 'userServ', function($scope, $http, $timeout, $interval, cbSupeviseModal, userServ) {
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
                            url: txnId
                        }
                    });
                },
                login: function(userForm) {
                    if (!userForm.$invalid) {
                        userServ.login(userForm.userId, userForm.password);
                    }
                },
                logout: function(){
                    userServ.logout();
                },
                openModal: function() {
                    cbSupeviseModal.activate({
                        'lists': ["BA12起息日期不同1", "測試訊息2"],
                        'txnData': {
                            data: {
                                func: '2',
                                custId: 'aaa'
                            }
                        }
                    });
                }
            });

        });
    }];
});
