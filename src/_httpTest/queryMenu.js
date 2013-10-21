'use strict';
define(['cabin'], function(cabin) {
    console.log('include test')
    cabin.run(['$httpBackend',
        function($httpBackend) {

            var pages = [{
                url: '/txn',
                name: '交易',
                child: [{
                    url: '/txn/txn1',
                    name: '交易1'
                }, {
                    url: '/txn/txn2',
                    name: '交易2'
                }]
            }, {
                url: '/system',
                name: '系統',
                child: [{
                    url: '/system/websocket',
                    name: 'Webscocket'
                }, {
                    url: '/system/codeType',
                    name: 'codeType'
                }]
            }, {
                url: '/sample',
                name: '範例',
                child: [{
                    url: '/sample/sample1',
                    name: '範例1'
                }, {
                    url: '/sample/sample2',
                    name: '範例2'
                }]
            }];

            $httpBackend.whenGET('basehandler/queryMenu').respond(function(method, url, data, headers) {
                // console.log('Received these data:', method, url, data, headers);
                return [200, pages, {}];
            });

        }
    ]);
});
