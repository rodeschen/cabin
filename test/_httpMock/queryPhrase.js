'use strict';
define(['cabin'], function(cabin) {
    cabin.run(['$httpBackend',
        function($httpBackend) {
            $httpBackend.whenPOST('basehandler/queryPhrase').respond(function(method, url, receive) {
                debugger;
                return [200, angular.toJson({
                    '分行中文名': {

                    },
                    '台灣城市': {
                        'C06': '台北市',
                        'C05': '新北市'
                    }
                }), {}];
            })

        }
    ]);
});
