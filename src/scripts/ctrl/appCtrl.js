'use strict';
define(['cabin'], function(cabin) {
    cabin.controller('appCtrl', ['$rootScope', '$scope', '$http', '$timeout', '$state', '$interval', '$filter', '$injector', 'localStorageService', 'cbSupeviseModal', 'cbSupeviseRequireModal', 'userServ', 'iBranchServ',
        function($rootScope, $scope, $http, $timeout, $state, $interval, $filter, $injector, localStorageService, cbSupeviseModal, cbSupeviseRequireModal, userServ, iBranchServ) {
            $http.get('basehandler/queryMenu').success(function(data) {
                $timeout(function() {
                    $scope.$emit('broadcast', {
                        'event': 'topMenuBar',
                        'menus': data.menu
                    });
                }, 500);

                //current biz date 
                $scope.currentTime = new Date();
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
                        $state.go("index");
                    },
                    openModal: function() {

                        var modal = $injector.get('cbSupeviseModal');
                        modal.activate({
                            DATA: {
                                sendData: {},
                                respData: {
                                    OVERRIDE_MSG: "ADSFADF"
                                }
                            }
                        });

                        // var modal = $injector.get('cbCommonModal');
                        // modal.activate({
                        //     message: "客戶有待辦事項，是否需要列印?",
                        //     buttons: [{
                        //         name: '列印',
                        //         type: 'primary',
                        //         action: function() {
                        //             modal.deactivate()

                        //         }
                        //     }, {
                        //         name: '取消',
                        //         type: 'danger',
                        //         action: function() {
                        //             modal.deactivate().finally(function() {
                        //                 defer.reject();
                        //             });
                        //         }
                        //     }]
                        // });
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
                    clearLocal: function() {
                        localStorageService.clearAll();
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
    ]);
});
