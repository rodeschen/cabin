'use strict';
define(['cabin'], function(cabin) {
    return ['factory', 'cbSupeviseModal', ['btfModal', 'cabinModulePath',
        function(btfModal, cabinModulePath) {
            return btfModal({
                //duplicate: true,
                controllerAs: 'modal',
                closeByEsc :false,
                templateUrl: cabinModulePath + 'modals/cabin-supeviseModal/templates/cabin-supeviseModal.html',
                controller: ['$scope', 'cbSupeviseModal',
                    function($scope, modal) {

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
