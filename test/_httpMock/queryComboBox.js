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
                'txn120606.FUNC_01': [{
                    'key': '1',
                    'value': '餘額證明'
                }, {
                    'key': '2',
                    'value': '部份存額證明'
                }],
                'txn120606.PRT_FLG': [{
                    'key': '1',
                    'value': '自/聯行'
                }, {
                    'key': '2',
                    'value': '全行'
                }],
                'txn120606.P_WORD': [{
                    'key': '1',
                    'value': '中文'
                }, {
                    'key': '2',
                    'value': '英文'
                }],
                'txn120606.P_CUR': [{
                    'key': 'AUD',
                    'value': '澳幣'
                }, {
                    'key': 'GBP',
                    'value': '英磅'
                }, {
                    'key': 'HKD',
                    'value': '港幣'
                }, {
                    'key': 'CHF',
                    'value': '瑞士法郎'
                }, {
                    'key': 'SGD',
                    'value': '新加坡幣'
                }, {
                    'key': 'USD',
                    'value': '美金'
                }, {
                    'key': 'JPY',
                    'value': '日圓'
                }, {
                    'key': 'CAD',
                    'value': '加拿大幣'
                }, {
                    'key': 'ZAR',
                    'value': '南非幣'
                }, {
                    'key': 'NZD',
                    'value': '紐西蘭幣'
                }, {
                    'key': 'EUR',
                    'value': '歐元'
                }, {
                    'key': 'CNY',
                    'value': '人民幣'
                }, {
                    'key': 'THB',
                    'value': '泰銖'
                }],
                'txn120606.ACT_TYP': [{
                    'key': '1',
                    'value': '現金'
                }, {
                    'key': '2',
                    'value': '轉帳'
                }],
                'txn110220.CARE_ASK': [{
                    'key': '1',
                    'value': '存入本人帳戶'
                }, {
                    'key': '2',
                    'value': '經判斷無被詐騙之虞者'
                }, {
                    'key': '3',
                    'value': '有疑慮者，填寫關懷客戶提問'
                }, {
                    'key': '4',
                    'value': '客戶拒絕回答'
                }],
                'txn110320.WD_PWD_FLG': [{
                    'key': '1',
                    'value': '客戶自行輸入'
                }, {
                    'key': '2',
                    'value': '由櫃員輸入'
                }, {
                    'key': '3',
                    'value': '不輸入'
                }],
                'txn110320.ITEM': [{
                    'key': '02',
                    'value': '代繳稅款'
                }, {
                    'key': '03',
                    'value': '代繳放款本息'
                }, {
                    'key': '05',
                    'value': 'IC卡消費轉帳'
                }, {
                    'key': '10',
                    'value': '其他'
                }, {
                    'key': '12',
                    'value': 'Ｖ銀行臨櫃交易手續費'
                }, {
                    'key': '2A',
                    'value': '單式傳票連動(請於附註欄輸入轉收帳號)'
                }, {
                    'key': '2B',
                    'value': '複式傳票連動(請於附註欄輸入轉收帳號)'
                }, {
                    'key': '25',
                    'value': '薪轉連動掛帳(請於附註欄輸入委託單位代號)'
                }, {
                    'key': '30',
                    'value': '授權扣繳'
                }, {
                    'key': '60',
                    'value': '複委託(基金)'
                }, {
                    'key': '71',
                    'value': '警示帳戶款項返還(請於附註欄輸入領款人姓名)'
                }, {
                    'key': '72',
                    'value': 'ＶＤ消費扣款(限營業部)'
                }, {
                    'key': '73',
                    'value': '銀聯卡消費扣款(限營業部)'
                }, {
                    'key': '74',
                    'value': 'ＭＤ消費扣款(限營業部)'
                }, {
                    'key': '88',
                    'value': '基金扣帳'
                }, {
                    'key': '89',
                    'value': '薪轉圈存轉出連動掛帳'
                }],
                'txn110320.VB_PWD_FLG': [{
                    'key': '1',
                    'value': '晶片密碼'
                }, {
                    'key': '2',
                    'value': '磁條密碼'
                }, {
                    'key': '3',
                    'value': '不輸入'
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
