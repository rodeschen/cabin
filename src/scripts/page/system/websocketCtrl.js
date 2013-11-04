'use strict';
define([], function(cabin) {
    return ['$scope', function($scope) {
        $scope.send = function(data) {
            $scope.$emit("broadcast", {
                'event': 'notify',
                'type': $scope.type,
                'message': data + 'SSS',
                'time': new Date
            });
        };

    }];
});
