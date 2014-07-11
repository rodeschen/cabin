'use strict';
define(['cabin'], function(cabin) {
    return ['controller', 'txn120606Ctrl', ['$scope', 'txn120606Serv', '$q', '$timeout', '$resource',
        function($scope, serv, $q, $timeout, $resource) {
            // $scope.data = angular.extend({
            //     'FUNC_01': '',
            //     'IDNO': '',
            //     'PRT_FLG': '',
            //     'ACNO_SA': '',
            //     'P_DATE1': '',
            //     'P_USE': '',
            //     'P_AMT': '',
            //     'P_CUR': '',
            //     'P_RATE': '',
            //     'P_WORD': '',
            //     'P_COPY': '',
            //     'ENG_NAME1': '',
            //     'ENG_NAME2': '',
            //     'REF1': '',
            //     'REF2': '',
            //     'REF3': '',
            //     'T_REF': '',
            //     'T_SEQ': '',
            //     'FEE_AMT': '',
            //     'ACT_TYP': '',
            //     'NAME': '',
            //     'P_DATE': ''
            // }, $scope.data);
            // $scope.$watch("data.memo1", function(v) {
            //     console.log(v)
            // })
        }
    ]];

});
