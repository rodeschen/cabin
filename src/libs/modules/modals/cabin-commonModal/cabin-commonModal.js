'use strict';
define(['cabin'], function(cabin) {
    return ['factory', 'cbCommonModal', ['btfModal', 'cabinModulePath',
        function(btfModal, cabinModulePath) {
            return btfModal({
                //duplicate: true,
                controllerAs: 'modal',
                closeByEsc: false,
                templateUrl: cabinModulePath + 'modals/cabin-commonModal/templates/cabin-commonModal.html',
                controller: ['$scope', 'cbSupeviseModal',
                    function($scope, modal) {
                        
                    }
                ]
            });
        }
    ]];
});
