'use strict';
define(['custModule'], function(custModule) {
    custModule.factory('cbOpenTxnModal', ['btfModal', 'cabinModulePath',
        function(btfModal, cabinModulePath, iBranchServ) {
            return btfModal({
                //duplicate: true,
                controllerAs: 'modal',
                closeByEsc: true,
                opacity: 0,
                templateUrl: 'scripts/modals/cabin-openTxnModal/templates/cabin-openTxnModal.html',
                controller: ['$scope', 'cbOpenTxnModal', '$state',
                    function($scope, modal, $state) {
                        $scope.openTxn = function(txnId) {
                            if (txnId && txnId.length == 6) {
                                $state.go('txn', {
                                    id: txnId
                                });
                                modal.close();
                            }
                        }
                    }
                ]
            });
        }
    ]);
});
