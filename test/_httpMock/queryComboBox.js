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
                }],
                'txn120606.func': [{
                    'key': '1',
                    'value': '餘額證明'
                }, {
                    'key': '2',
                    'value': 'XXXXX'
                }],
                'txn120606.branch': [{
                    'key': '200',
                    'value': 'XXXX1分行'
                }, {
                    'key': '201',
                    'value': 'XXXX2分行'
                }, {
                    'key': '202',
                    'value': 'XXXX3分行'
                }, {
                    'key': '203',
                    'value': 'XXXX4分行'
                }, {
                    'key': '204',
                    'value': 'XXXX5分行'
                }, {
                    'key': '205',
                    'value': 'XXXX6分行'
                }, {
                    'key': '206',
                    'value': 'XXXX7分行'
                }],
                'txn120606.currency': [{
                    'key': 'NTD',
                    'value': '台幣'
                }, {
                    'key': 'USD',
                    'value': '美金'
                }, {
                    'key': 'RMB',
                    'value': '人民幣'
                }],
                'txn120606.pType':[{
                    'key': ' 1',
                    'value': '中文'
                }, {
                    'key': '2',
                    'value': '英文'
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
