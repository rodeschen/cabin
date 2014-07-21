'use strict';
define(['cabin'], function(cabin) {
    return ['factory', 'cbSupeviseRequireModal', ['btfModal', 'cabinModulePath', 'iBranchServ',
        function(btfModal, cabinModulePath, iBranchServ) {
            return btfModal({
                //duplicate: true,
                controllerAs: 'modal',
                closeByEsc: false,
                templateUrl: cabinModulePath + 'modals/cabin-supeviseRequireModal/templates/cabin-supeviseRequireModal.html',
                controller: ['$scope', 'cbSupeviseRequireModal',
                    function($scope, modal) {
                        var deferred = $scope.deferred;
                        var sendData = $scope.DATA.sendData;
                        var respData = $scope.DATA.respData;
                        $scope.messages = respData.OVERRIDE_MSG.split(",");
                        var txnId = sendData.txnId;
                        angular.extend($scope, {
                            send: function(sendForm) {
                                if (sendForm.$valid) {
                                    //sendData.supevise = sendForm.user;
                                    modal.deactivate().finally(function() {
                                        $scope.sendSupevise = true;
                                        var sendTxnData = angular.copy(sendData.txnData || {});
                                        if (respData.ac1) {
                                            sendTxnData.ac1 = respData.ac1
                                        }
                                        iBranchServ.send(txnId, sendTxnData, {
                                            supevise: 'Y',
                                            // TESTOVRC: 'AC'
                                        }).then(function(xhr) {
                                            $scope.sendSupevise = false;
                                            deferred.resolve();

                                        }, function(xhr) {
                                            $scope.sendSupevise = false;
                                            deferred.reject("reject");
                                            // modal.deactivate();
                                        });
                                    });
                                }
                            },
                            cancel: function() {
                                $scope.sendSupevise = true;
                                var sendTxnData = angular.copy(sendData.txnData || {});
                                if (respData.ac1) {
                                    sendTxnData.ac1 = respData.ac1
                                }
                                modal.deactivate().finally(function() {
                                    iBranchServ.send(txnId, sendTxnData, {
                                        supevise: 'Y',
                                        TESTOVRC: 'RJ'
                                    }).then(function(xhr) {
                                        $scope.sendSupevise = false;
                                        deferred.resolve();
                                     //   modal.deactivate();
                                    }, function(xhr) {
                                        $scope.sendSupevise = false;
                                        deferred.reject("reject");
                                   //     modal.deactivate();
                                    });
                                });
                            }
                        })

                    }
                ]
            });
        }
    ]];
});
