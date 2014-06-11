'use strict';
define(['cabin'], function(cabin) {
    console.log('include ibranch test')
    cabin.run(['$httpBackend',
        function($httpBackend) {

            var loginUsers = {};

            var user = {
                userId: 't888801',
                userName: '王大海',
                luNo: 'tB9404',
                branchId: 't201',
                bankUserId: 't2002560',
                bizDate: '2015/12/12'

            };
            var txns = {
                //login
                '000001': function(data) {
                    if (data.userId === '00001' && data.password === 'p') {
                        return [200, user, {}];
                    } else {
                        return [400, {}, {}];
                    }
                },
                //query isLogin
                '000002': function() {
                    //return [200, user, {}];
                    return [400, {},{}];
                }

            };

            $httpBackend.whenPOST('ibranch').respond(function(method, url, data, headers) {
                data = angular.fromJson(data);
                console.log(data.txnId, url, "mock", data, headers);
                //[200, resData, {}];
                return txns[data.txnId](data)
            });

        }
    ]);
});
