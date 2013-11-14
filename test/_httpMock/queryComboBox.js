'use strict';
define(['cabin'], function(cabin) {
    cabin.run(['$httpBackend',
        function($httpBackend) {
            var temp = {
                'lang': [{
                    'key': 'zh_TW',
                    'value': '台灣'
                }, {
                    'key': 'zh_CN',
                    'value': '中國大陸'
                }, {
                    'key': 'en_US',
                    'value': '美國'
                }],
                "lang2": [{
                    'key': 'zh_TW2',
                    'value': '台灣2'
                }, {
                    'key': 'zh_CN2',
                    'value': '中國大陸2'
                }, {
                    'key': 'en_US2',
                    'value': '美國2'
                }]
            }


            $httpBackend.whenPOST('basehandler/querybombobox').respond(function(method, url, receive) {
                var res = {};
                var data = angular.fromJson(receive);
                console.log("queryCombo receive:", data);
                angular.forEach(data.keys || [], function(value, key) {
                    temp[value] && (res[value] = temp[value]);
                });

                angular.forEach(data.dymanicKeys || [], function(value, key) {
                    temp[value] && (res[value] = temp[value]);
                });
                console.log("queryCombo:", res);
                return [200, res, {}];
            })

        }
    ]);
});
