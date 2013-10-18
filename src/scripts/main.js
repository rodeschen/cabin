'use strict';
var properties = {
    contentRoot: '/',
    useCabinLibs: [
        'cbNotify',
        //'cabin-notify',
        'cabin-txnRouterLoaderService'
    ],
    cabinModuleTemplatePath: 'libs/modules/templates/',
    viewsTemplatePath: '/views/'
};

require.config({
    urlArgs: 'cache=' + parseInt(Math.random() * 1000, 10),
    baseUrl: '../',
    paths: {
        'libs': 'libs/libs',
        'cabin': 'libs/cabin',
        'cabin-libs': 'libs/cabin-libs',
        'app': 'scripts/app'


    },
    shim: {
        'cabin-libs': ['libs'],
        'app': ['libs', 'cabin', 'cabin-libs']
    }
});

require(['libs', 'cabin', 'cabin-libs', 'app'], function() {
    var cabin = arguments[arguments.length - 1];

    cabin.controller('cabinCtrl', ['$scope',
        function($scope) {
            $scope.send = function(data) {
                $scope.$emit('broadcast', {
                    'event': 'notify',
                    'type': $scope.type,
                    'message': data + 'SSS',
                    'time': new Date()
                });
            };

        }
    ]);

    angular.bootstrap(window.document, ['cabin']);
    console.log('app Initialized');
});
