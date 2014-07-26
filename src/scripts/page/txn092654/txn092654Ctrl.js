'use strict';
define(['cabin'], function(cabin) {
    return ['controller', 'txn092654Ctrl', ['$scope', 'txn092654Serv', 'iBranchServ',
        function($scope, serv, iBranchServ) {
            iBranchServ.send('092654').then(function(res) {
                angular.extend($scope.data, res.data);
            })
        }
    ]];

});
