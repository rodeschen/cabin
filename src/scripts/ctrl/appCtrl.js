'use strict';
define(['cabin'], function(cabin) {
    return ['$rootScope', '$scope', '$http', '$timeout', '$interval', 'cbSupeviseModal', 'cbSupeviseRequireModal', 'userServ', 'iBranchServ', '$filter',
        function($rootScope, $scope, $http, $timeout, $interval, cbSupeviseModal, cbSupeviseRequireModal, userServ, iBranchServ, $filter) {
            $http.get('basehandler/queryMenu').success(function(data) {
                $timeout(function() {
                    $scope.$emit('broadcast', {
                        'event': 'topMenuBar',
                        'menus': data.menu
                    });
                }, 500);

                //current biz date 
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
                        userServ.logout();
                        $scope.$emit('broadcast', {
                            event: 'pageViewer',
                            page: {
                                url: 'favorite'
                            }
                        });
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
                        iBranchServ.send("OVSHOW", {
                            userid: $rootScope.user.userId
                        }).then(function(xhr) {
                            cbSupeviseModal.activate(xhr.data);
                        })
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
                    },
                    lock: false,
                    clearMessage: function() {
                        $scope.lock = !$scope.lock;
                        $scope.$emit('broadcast', {
                            event: ('pageViewer-' + ($scope.lock ? 'lock' : 'unlock'))
                        });
                    }
                });

            });
        }
    ];
});
