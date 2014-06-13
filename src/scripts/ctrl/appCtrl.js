'use strict';
define(['cabin'], function(cabin) {
    return ['$scope', '$http', '$timeout', '$interval', 'cbSupeviseModal', 'cbSupeviseRequireModal', 'userServ', function($scope, $http, $timeout, $interval, cbSupeviseModal, cbSupeviseRequireModal, userServ) {
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
                logout: function() {
                    console.log("DD")
                    userServ.logout();
                },
                openModal: function() {
                    cbSupeviseModal.activate({
                        'messages': ["BA12起息日期不同1", "測試訊息2"],
                        'txnData': {
                            data: {
                                func: '2',
                                custId: 'aaa'
                            }
                        }
                    });
                },
                openSupModal: function() {
                    cbSupeviseRequireModal.activate({
                        'messages': ["BA12起息日期不同1", "測試訊息2", "測試訊息3", "測試訊息4", "測試訊息5"],
                        'users': [{
                            key: '11111', // userId
                            value: 'name1' // userName
                        }, {
                            key: '2222', // userId
                            value: 'name2' // userName
                        }, ],
                        'txnData': {
                            data: {
                                func: '2',
                                custId: 'aaa'
                            }
                        }
                    });
                },
                sendMessage: function() {
                    var ran = Math.random(),
                        msgType;
                    if (ran > 0.6) {
                        msgType = 'error';
                    } else if (ran > 0.3) {
                        msgType = 'warn';
                    } else {
                        msgType = 'normal';
                    }
                    $scope.$emit('broadcast', {
                        event: 'notify',
                        type: msgType,
                        message: "ADFADFADSF " + ran
                    });
                }
            });

        });
    }];
});
