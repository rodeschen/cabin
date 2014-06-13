'use strict';
define(['cabin'], function(cabin) {
    return ['factory', 'cbSupeviseModal', ['btfModal', 'cabinModulePath',
        function(btfModal, cabinModulePath) {
            return btfModal({
                //duplicate: true,
                controllerAs: 'modal',
                closeByEsc: false,
                templateUrl: cabinModulePath + 'modals/cabin-supeviseModal/templates/cabin-supeviseModal.html',
                controller: ['$scope', 'cbSupeviseModal', 'iBranchServ',
                    function($scope, modal, iBranchServ) {
                        iBranchServ.send("999999").then(function(xhr) {
                            $scope.sendUser = xhr.data.sendUser;
                            $scope.messages = xhr.data.messages;
                            $scope.txnData = {
                                data: xhr.data.txnData
                            };
                        });
                        angular.extend($scope, {
                            approve: function() {
                                modal.deactivate();
                            },
                            reject: function() {
                                modal.deactivate();
                            }
                        })

                    }
                ]
            });
        }
    ]];
});
