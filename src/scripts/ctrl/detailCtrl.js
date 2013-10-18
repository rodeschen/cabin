'use strict';
define([], function(cabin) {
    return ['$scope', 'properties', function sample2Ctrl($scope, properties) {
        $scope.send = function(data) {
        	debugger;
            $scope.$emit("broadcast", {
                'event': 'notify',
                'type': $scope.type,
                'message': data + 'SSS',
                'time': new Date
            });
        };

    }];
});
