'use strict';
define(['cabin'], function(cabin) {
    console.log('include test')
    cabin.run(['$httpBackend',
        function($httpBackend) {

            var pages = [{
                url: '/txn/detail',
                name: 'Detail222'
            }, {
                url: '/txn',
                name: 'Txn333'
            }, {
                url: '/txn/sample1',
                name: 'Sample/Detail444'
            }, {
                url: '/txn/sample/sample',
                name: 'Sample/Sample'
            }];

            $httpBackend.whenGET('basehandler/queryMenu').respond(function(method, url, data, headers) {
                console.log('Received these data:', method, url, data, headers);
                return [200, pages, {}];
            });

        }
    ]);
});
