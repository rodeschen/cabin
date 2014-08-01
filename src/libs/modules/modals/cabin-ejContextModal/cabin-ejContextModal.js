'use strict';
define(['cabin'], function(cabin) {
    return ['factory', 'cbEjContextModal', ['btfModal', 'cabinModulePath',
        function(btfModal, cabinModulePath) {
            return btfModal({
                //duplicate: true,
                controllerAs: 'modal',
                closeByEsc: false,
                templateUrl: cabinModulePath + 'modals/cabin-ejContextModal/templates/cabin-ejContextModal.html',
                controller: ['$scope', 'cbSupeviseModal', 'iBranchServ', '$rootScope', 'cbCommonModal',
                    function($scope, modal, iBranchServ, $rootScope, cbCommonModal) {

                        var messages = [];
                        if ($scope.ovMsg) {
                            messages.push($scope.ovMsg.replace(/<br\/?>/g, ""));
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
    ]];
});