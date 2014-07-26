'use strict';
define(['cabin'], function(cabin) {
    return ['factory', 'cbCommonModal', ['btfModal', 'cabinModulePath',
        function(btfModal, cabinModulePath) {
            return btfModal({
                //duplicate: true,
                controllerAs: 'modal',
                closeByEsc: false,
                templateUrl: cabinModulePath + 'modals/cabin-commonModal/templates/cabin-commonModal.html',
                controller: ['$scope', 'cbCommonModal',
                    function($scope, modal) {
                        for(var idx in $scope.buttons || []){
                            $scope.buttons[idx].modalId = $scope.modalId;
                        }
                    }
                ]
            });
        }
    ]];
});
