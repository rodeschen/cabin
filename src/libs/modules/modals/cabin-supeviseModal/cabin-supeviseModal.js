'use strict';
define(['cabin'], function(cabin) {
    return ['factory', 'cbSupeviseModal', ['btfModal', 'cabinModulePath',
        function(btfModal, cabinModulePath) {
            return btfModal({
                //duplicate: true,
                controllerAs: 'modal',
                closeByEsc: false,
                templateUrl: cabinModulePath + 'modals/cabin-supeviseModal/templates/cabin-supeviseModal.html',
                controller: ['$scope', 'cbSupeviseModal', 'iBranchServ', '$rootScope',
                    function($scope, modal, iBranchServ, $rootScope) {
                        $scope.ovTxnId = "/txn" + $scope.txnId;

                        angular.extend($scope, {
                            approve: function() {
                                $scope.sendSupevise = true;
                                iBranchServ.send("OVACTION", {
                                    userid: $rootScope.user.userId
                                }, {
                                    supevise: 'Y',
                                    TESTOVRC: 'AC'
                                }).then(function(xhr) {
                                    $scope.sendSupevise = false;
                                    deferred.resolve();
                                    modal.deactivate();
                                }, function(xhr) {
                                    $scope.sendSupevise = false;
                                    modal.deactivate();
                                });
                                modal.deactivate();
                            },
                            reject: function() {
                                $scope.sendSupevise = true;
                                iBranchServ.send("OVACTION", {
                                    userid: $rootScope.user.userId
                                }, {
                                    supevise: 'Y',
                                    TESTOVRC: 'RJ'
                                }).then(function(xhr) {
                                    $scope.sendSupevise = false;
                                    modal.deactivate();
                                }, function(xhr) {
                                    $scope.sendSupevise = false;
                                    modal.deactivate();
                                });
                                modal.deactivate();
                            }
                        })

                    }
                ]
            });
        }
    ]];
});
