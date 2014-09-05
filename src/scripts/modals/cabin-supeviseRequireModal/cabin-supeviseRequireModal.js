'use strict';
define(['custModule'], function(custModule) {
    custModule.factory('cbSupeviseRequireModal', ['btfModal', 'cabinModulePath', 'iBranchServ',
        function(btfModal, cabinModulePath, iBranchServ) {
            return btfModal({
                //duplicate: true,
                controllerAs: 'modal',
                closeByEsc: false,
                opacity: 0,
                templateUrl: 'scripts/modals/cabin-supeviseRequireModal/templates/cabin-supeviseRequireModal.html',
                controller: ['$scope', 'cbSupeviseRequireModal',
                    function($scope, modal) {
                        $scope.data = {
                            remote: "Y"
                        };
                        var deferred = $scope.deferred;
                        var sendData = $scope.DATA.sendData;
                        var respData = $scope.DATA.respData;
                        $scope.supList = (function(supList) {
                            for (var idx in supList) {
                                supList[idx].key = supList[idx].id;
                                supList[idx].value = supList[idx].name;
                            }
                            return supList;
                        })(respData.supList);

                        $scope.messages = respData.OVERRIDE_MSG.split(",");
                        var txnId = sendData.txnId;
                        angular.extend($scope, {
                            send: function(sendForm) {
                                if (sendForm.$valid) {
                                    //sendData.supevise = sendForm.user;
                                    //modal.deactivate($scope.modalId);
                                    //.finally(function() {
                                    $scope.sendSupevise = true;
                                    var sendTxnData = angular.copy(sendData.txnData || {});
                                    if (respData.ac1) {
                                        sendTxnData.ac1 = respData.ac1
                                    }
                                    iBranchServ.send(txnId, sendTxnData, {
                                        supevise: 'Y',
                                        TESTOVRC: $scope.data.remote == 'Y' ? 'OR' : 'AC'
                                    }).then(function(xhr) {
                                        $scope.sendSupevise = false;
                                        modal.deactivate($scope.modalId);
                                        deferred.resolve();
                                    }, function(xhr) {
                                        $scope.sendSupevise = false;
                                        deferred.reject("reject");
                                        modal.deactivate($scope.modalId);
                                    });
                                    //    });
                                }
                            },
                            cancel: function() {
                                $scope.sendSupevise = true;
                                var sendTxnData = angular.copy(sendData.txnData || {});
                                if (respData.ac1) {
                                    sendTxnData.ac1 = respData.ac1
                                }
                                modal.deactivate($scope.modalId);
                                //.finally(function() {
                                iBranchServ.send(txnId, sendTxnData, {
                                    supevise: 'Y',
                                    TESTOVRC: 'RJ'
                                }).then(function(xhr) {
                                    $scope.sendSupevise = false;
                                    deferred.resolve();
                                    modal.deactivate($scope.modalId);
                                }, function(xhr) {
                                    $scope.sendSupevise = false;
                                    deferred.reject("reject");
                                    modal.deactivate($scope.modalId);
                                });
                                //});
                            }
                        })

                    }
                ]
            });
        }
    ]);
});
