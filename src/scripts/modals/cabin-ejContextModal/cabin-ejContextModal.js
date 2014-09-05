'use strict';
define(['custModule'], function(custModule) {
    custModule.factory('cbEjContextModal', ['btfModal', 'cabinModulePath',
        function(btfModal, cabinModulePath) {
            return btfModal({
                //duplicate: true,
                controllerAs: 'modal',
                closeByEsc: false,
                templateUrl: 'scripts/modals/cabin-ejContextModal/templates/cabin-ejContextModal.html',
                controller: ['$scope', 'cbSupeviseModal', 'iBranchServ', '$rootScope', 'cbCommonModal',
                    function($scope, modal, iBranchServ, $rootScope, cbCommonModal) {

                        var messages = [];
                        if ($scope.ovMsg) {
                            messages = messages.concat($scope.ovMsg.replace(/<br\/?>/g, "").split(","));
                        }
                        if ($scope.txnMsg) {
                            messages.push($scope.txnMsg.replace(/<br\/?>/g, ""));
                        }

                        $scope.openMessage = function() {
                            cbCommonModal.open({
                                message: messages.join("<br/>"),
                                buttons: [{
                                    name: "關閉",
                                    action: cbCommonModal.close,
                                    color: 'red'
                                }]
                            });
                        }
                    }
                ]
            });
        }
    ]);
});
