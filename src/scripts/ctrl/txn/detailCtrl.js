'use strict';
define([], function(cabin) {
    return ['$scope', 'properties', function sample2Ctrl($scope, properties) {
        $scope.send = function(data) {
            $scope.$emit("broadcast", {
                'event': 'notify',
                'type': $scope.type,
                'message': data,
                'time': new Date
            });
        };

    }];
});
