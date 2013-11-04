'use strict';
define(['cabin'], function(cabin) {
    return ['controller', 'codeTypeCtrl', ['$scope',

        function($scope) {
            $scope.updated = {};
            $scope.data = {};
            $scope.update = function() {
                $scope.updated = angular.copy($scope.data);
            }
        }
    ]];


    // return {
    //     'template': undefined,
    //     'templateUrl': "url",
    //     'resolve': {

    //     },
    //     'controller': ['','','']

    // }
});


// 定義 page 使用相關設定
// service s
// controller
// page
