'use strict';
define(['cabin'], function(cabin) {
    console.log('include ibranch test')
    cabin.run(['$httpBackend',
        function($httpBackend) {

            var loginUsers = {};

            var user = {
                userId: 't888801',
                userName: '王大海',
                title: '高級專員',
                luNo: 'tB9404',
                branchId: 't201',
                bankUserId: 't2002560',
                bizDate: '2015/12/12'

            };

            var receiveData = {};
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
                    return [200, user, {}];
                    //return [400, {}, {}];
                },
                '000003': function() {
                    return [200, user, {}];
                },
                '120606': function(data) {
                    receiveData = data;
                    if (data.supevise) {
                        if (data.supevise === "333333") {
                            return [200, {
                                txnStatus: '1',
                                message: "approve"
                            }, {}];
                        }
                        return [400, {
                            message: "reject"
                        }, {}];

                    }

                    if (data.func != '2') {
                        return [200, {
                            txnStatus: '9',
                            supevise: {
                                messages: ["BA12起息日期不同11", "測試訊息22", "測試訊息33", "測試訊息44", "測試訊息55"],
                                users: [{
                                    key: '11111',
                                    value: '1111name'
                                }, {
                                    key: '222222',
                                    value: '22222name'
                                }, {
                                    key: '333333',
                                    value: '3333name'
                                }]
                            }
                        }, {}];
                    } else {
                        return [200, {
                            txnStatus: '1'
                        }];
                    }
                },
                '999999': function() {
                    return [200, {
                        txnData: receiveData,
                        sendUser: user,
                        messages: ["BA12起息日期不同11", "測試訊息22", "測試訊息33", "測試訊息44", "測試訊息55"]
                    }, {}];
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
