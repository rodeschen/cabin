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
                        var txnData = $scope.txnData;
                        console.log(txnData)
                        angular.extend($scope, {
                            send: function(sendForm) {
                                if (sendForm.$valid) {
                                    txnData.supevise = sendForm.user;
                                    $scope.sendSupevise = true;
                                    iBranchServ.send(txnData.txnId, txnData).then(function(xhr) {
                                        iBranchServ.txnSuccess(xhr.data);
                                        modal.deactivate();
                                    }, function(xhr) {
                                        $scope.sendSupevise = false;
                                    });
                                }
                            },
                            cancel: function() {
                                modal.deactivate();
                            }
                        })

                    }
                ]
            });
        }
    ]];
});
