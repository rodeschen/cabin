'use strict';
define(['cabin'], function(cabin) {
    console.log('include test')
    cabin.run(['$httpBackend',
        function($httpBackend) {

            var resData = {
                menu: [{
                    url: '/system',
                    name: '系統(System)',
                    child: [{
                        url: '/system/codeType',
                        name: 'CodeType'
                    }, {
                        url: '/system/webSocket',
                        name: 'WebSocket'
                    }]
                }, {
                    url: '/sample',
                    name: 'sample',
                    child: [{
                        url: '/sample/sample1',
                        name: '範例1'
                    }, {
                        url: '/sample/sample2',
                        name: '範例2'
                    }]
                }, {
                    url: '/sample2',
                    name: 'sample2',
                    child: [{
                        url: '/sample/sample1',
                        name: '範例1'
                    }, {
                        url: '/sample/sample2',
                        name: '範例2'
                    }]
                }]
            };

            $httpBackend.whenGET('basehandler/queryMenu').respond(function(method, url, data, headers) {
                // console.log('Received these data:', method, url, data, headers);
                return [200, resData, {}];
            });



            $httpBackend.whenGET('user').respond(function() {
                // console.log('Received these data:', method, url, data, headers);
                return [200, resData, {}];
            })

        }
    ]);
});
