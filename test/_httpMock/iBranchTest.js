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
            // var txns = {
            //     //login
            //     '000001': function(data) {
            //         if (data.userId === '00001' && data.password === 'p') {
            //             return [200, user, {}];
            //         } else {
            //             return [400, {}, {}];
            //         }
            //     },
            //     //query isLogin
            //     '000002': function() {
            //         //return [200, user, {}];
            //         return [400, {}, {}];
            //     },
            //     '000003': function() {
            //         return [200, user, {}];
            //     },
            //     '120606': function(data) {
            //         receiveData = data;
            //         if (data.supevise) {
            //             if (data.supevise === "333333") {
            //                 return [200, {
            //                     txnStatus: '1',
            //                     message: "approve"
            //                 }, {}];
            //             }
            //             return [400, {
            //                 message: "reject"
            //             }, {}];

            //         }

            //         if (data.func != '2') {
            //             return [200, {
            //                 txnStatus: '9',
            //                 supevise: {
            //                     messages: ["BA12起息日期不同11", "測試訊息22", "測試訊息33", "測試訊息44", "測試訊息55"],
            //                     users: [{
            //                         key: '11111',
            //                         value: '1111name'
            //                     }, {
            //                         key: '222222',
            //                         value: '22222name'
            //                     }, {
            //                         key: '333333',
            //                         value: '3333name'
            //                     }]
            //                 }
            //             }, {}];
            //         } else {
            //             return [200, {
            //                 txnStatus: '1'
            //             }];
            //         }
            //     },
            //     '999999': function() {
            //         return [200, {
            //             txnData: receiveData,
            //             sendUser: user,
            //             messages: ["BA12起息日期不同11", "測試訊息22", "測試訊息33", "測試訊息44", "測試訊息55"]
            //         }, {}];
            //     }

            // };
            var user = [{
                        "poc": {
                            "txnData": {
                                "luNo": "",
                                "title": "高級專員",
                                "bankUserId": "2001560",
                                "branchId": "200",
                                "userId": "888801",
                                "userName": "高級專員"
                            },
                            "txnMessage": "ADFASDFASDF",
                            "sessionId": "719A6B742CD02A38E5023667E6468DD8",
                            "txnStatus": "1"
                        }
                    }];

            var txns = {
                //login
                '0110': function(data) {
                    return [200, angular.toJson(user), {}];
                },
                //query isLogin
                '000002': function() {
                    return [200, angular.toJson(user), {}];
                    //return [400, {"SSS","SSS"}, {}];
                },
                //logout
                '0221': function() {
                    return [200, angular.toJson({}), {}];
                },
                '120606': function(data) {
                    if (data.txnData.TESTOV == "Y") {
                        if (data.supevise == "Y") {
                            return [200, angular.toJson([{
                                "poc": {
                                    "A2": {
                                        "PROMPT": "請插入傳票",
                                        "DATA": "<br/><br/><br/>                                                                     <br/><br/>                                                                    200<br/>                                   103    07    16                14516078099   <br/>                                                                  手續費收入    <br/>                                 -                                <br/>             黃金存摺                                <br/><br/>             099 其他手續費                              <br/>                                        <br/>                  200                   <br/>                  陳ＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸ        <br/><br/>            TWD                          $100.00<br/><br/>            103/07/16 140103 05264757 2002560      櫃員       120606  現收<br/>     4516078099               100.00                             <br/>     <br/>     <br/>     <br/><br/>                0                                               <br/>",
                                        "TYPE": "FORM"
                                    },
                                    "A1": {
                                        "PROMPT": "請插入傳票",
                                        "DATA": "<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>                103/07/16 140103 05264757 2002560      櫃員       120606<br/><br/>         餘額              F121622913  全行                  20140707<br/>                 98,466.55 黃金存摺                                        1<br/>",
                                        "TYPE": "FORM"
                                    },
                                    "A4": {
                                        "PROMPT": "請插入A4空白紙張",
                                        "DATA": "                                                                                          <br/>                            台北富邦銀行                                                <br/>                                                                                          <br/>                        客戶待辦事項通知單                                              <br/>                                                                                          <br/>客戶統編：  F121622913    陳ＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸ                  <br/>                                                                                          <br/>帳號              待辦事項                                  異動行/異動日         <br/>                                                                經辦/  主管           <br/>--------------------------------------------------------------------------------          <br/>                    ＩＤ尚有久未往來帳戶，應查詢歸戶後，詢問  資訊處 103/06/09        <br/>                    有無需再使用，如無請協助結清，詢問後刪除                            <br/>--------------------------------------------------------------------------------          <br/>交易代號：120606      列印經辦：員ＸＸ        日期時間：103/07/16 14:01:03        <br/>",
                                        "TYPE": "CONFIRM"
                                    },
                                    "A3": {
                                        "DATA": "W104中心交易完成並已登錄備查簿                ",
                                        "TYPE": "WARN"
                                    },
                                    "ejSeq": "15",
                                    "A5": {
                                        "DATA": "　ＩＤ尚有久未往來帳戶，應查詢歸戶後，詢問                                                <br>　有無需再使用，如無請協助結清，詢問後刪除                                                <br>",
                                        "TYPE": "POPUP"
                                    },
                                    "ACTIONCOUNT": "6",
                                    "txnStatus": "1",
                                    "A0": {
                                        "PROMPT": "請從雷射印表機拿取餘額證明書",
                                        "DATA": "/iBranchApp/seal1.pdf",
                                        "TYPE": "PDF"
                                    }
                                }
                            }]), {}];
                        } else {
                            return [200, angular.toJson([{
                                "poc": {
                                    "ejSeq": "1033",
                                    "txnStatus": "9",
                                    "OVERRIDE_MSG": "交易必須授權",
                                    "supList": [{
                                        "id": "999901",
                                        "name": "主管"
                                    }]
                                }
                            }]), {}];
                        }
                    } else {
                        return [200, angular.toJson([{
                            "poc": {
                                "A2": {
                                    "PROMPT": "請插入二聯式收入傳票",
                                    "DATA": "<br/><br/><br/>                                                                     <br/><br/>                                                                    200<br/>                                   103    07    16                14516078099   <br/>                                                                  手續費收入    <br/>                                 -                                <br/>             黃金存摺                                <br/><br/>             099 其他手續費                              <br/>                                        <br/>                  200                   <br/>                  陳ＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸ        <br/><br/>            TWD                          $100.00<br/><br/>            103/07/16 140103 05264757 2002560      櫃員       120606  現收<br/>     4516078099               100.00                             <br/>     <br/>     <br/>     <br/><br/>                0                                               <br/>",
                                    "TYPE": "FORM"
                                },
                                "A1": {
                                    "PROMPT": "請插入傳票",
                                    "DATA": "<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>                103/07/16 140103 05264757 2002560      櫃員       120606<br/><br/>         餘額              F121622913  全行                  20140707<br/>                 98,466.55 黃金存摺                                        1<br/>",
                                    "TYPE": "FORM"
                                },
                                "A4": {
                                    "PROMPT": "請插入A4空白紙張",
                                    "DATA": "                                                                                          <br/>                            台北富邦銀行                                                <br/>                                                                                          <br/>                        客戶待辦事項通知單                                              <br/>                                                                                          <br/>客戶統編：  F121622913    陳ＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸ                  <br/>                                                                                          <br/>帳號              待辦事項                                  異動行/異動日         <br/>                                                                經辦/  主管           <br/>--------------------------------------------------------------------------------          <br/>                    ＩＤ尚有久未往來帳戶，應查詢歸戶後，詢問  資訊處 103/06/09        <br/>                    有無需再使用，如無請協助結清，詢問後刪除                            <br/>--------------------------------------------------------------------------------          <br/>交易代號：120606      列印經辦：員ＸＸ        日期時間：103/07/16 14:01:03        <br/>",
                                    "TYPE": "CONFIRM"
                                },
                                "A3": {
                                    "DATA": "W104中心交易完成並已登錄備查簿                ",
                                    "TYPE": "WARN"
                                },
                                "ejSeq": "15",
                                "A5": {
                                    "DATA": "　ＩＤ尚有久未往來帳戶，應查詢歸戶後，詢問                                                <br>　有無需再使用，如無請協助結清，詢問後刪除                                                <br>",
                                    "TYPE": "POPUP"
                                },
                                "ACTIONCOUNT": "6",
                                "txnStatus": "1",
                                "A0": {
                                    "PROMPT": "請從雷射印表機拿取餘額證明書",
                                    "DATA": "/iBranchApp/seal1.pdf",
                                    "TYPE": "PDF"
                                }
                            }
                        }]), {}];
                    }
                },
                '999999': function() {
                    return [200, {
                        txnData: receiveData,
                        sendUser: user,
                        messages: ["BA12起息日期不同11", "測試訊息22", "測試訊息33", "測試訊息44", "測試訊息55"]
                    }, {}];
                },

                'mockNotFound': function() {
                    return [400, angular.toJson([{
                        "poc": {
                            "txnMessage": 'Mock Not Found',
                            "txnStatus": "2"
                        }
                    }]), {}];
                },
                'querySup': function() {
                    return [200, angular.toJson([{
                        "poc": {
                            "txnMessage": 'Mock Not Found',
                            "txnStatus": "1"
                        }
                    }]), {}];
                },
                '000001' : function(){
                  return [200, angular.toJson(ejResult), {}];  
                }

            };



            // 
            $httpBackend.whenPOST('\/iBranchApp\/json').respond(function(method, url, data, headers) {
                data = angular.fromJson(data);
                console.log(data.txnId, url, "mock", data, headers);
                //[200, resData, {}];
                return txns[data.txnId] && txns[data.txnId](data) || txns['mockNotFound']();
            });

        }
    ]);
});



var ejResult = [{"poc":{"dbresult":"[['200', '840505', '20140718', '17:06:20', '0221', '', 'A170621', '', '0', 'AC', '', '2010'], ['200', '888801', '20140718', '16:21:31', '0110', '', 'A162132', '', '0', 'AC', '', '2008'], ['200', '888801', '20140718', '16:21:09', '0110', '', '', '', '0', 'RJ', '', '2007'], ['200', '888801', '20140718', '16:21:01', '0110', '', '', '', '0', 'RJ', '', '2006'], ['200', '888801', '20140718', '16:20:59', '0110', '', '', '', '0', 'RJ', '', '2005'], ['200', '888801', '20140718', '16:20:59', '0110', '', '', '', '0', 'RJ', '', '2004'], ['200', '888801', '20140718', '16:20:07', '0110', '', '', '', '0', 'RJ', '', '2002'], ['200', '840505', '20140718', '15:55:25', '0120', '', 'A155526', '', '0', 'AC', '', '2001'], ['200', '840505', '20140718', '15:55:11', '0110', '', 'A155512', '', '0', 'AC', '', '2000'], ['200', '840505', '20140718', '15:54:31', '0221', '', 'A155431', '', '0', 'AC', '', '1510'], ['200', '840505', '20140718', '15:42:45', '0120', '', 'A154245', '', '0', 'AC', '', '1508'], ['200', '840505', '20140718', '15:39:24', '0120', '', 'A153924', '', '0', 'AC', '', '1507'], ['200', '840505', '20140718', '15:11:06', '0120', '', 'A151106', '', '0', 'AC', '', '1505'], ['200', '840505', '20140718', '15:10:52', '0110', '', 'A151058', '', '0', 'AC', '', '1504'], ['200', '840505', '20140718', '15:10:37', '0221', '', 'A151041', '', '0', 'AC', '', '1503'], ['200', '840505', '20140718', '15:09:26', '0120', '01200', 'A150927', '', '0', 'AC', '', '1501'], ['200', '840505', '20140718', '15:09:16', '0110', '01100', 'A150916', '', '0', 'AC', '', '1500'], ['200', '840505', '20140718', '15:05:18', '0221', '02210', 'A150518', '', '0', 'AC', '', '1006'], ['200', '840505', '20140718', '14:44:42', '0120', '01200', 'A144443', '', '0', 'AC', '', '1005'], ['200', '840505', '20140718', '14:43:52', '0110', '01100', 'A144352', '', '0', 'AC', '', '1004'], ['200', '888801', '20140718', '14:42:53', '110000', '1100000', '05512285', '200168013786', '10', 'AC', '999901', '1003'], ['200', '888801', '20140718', '14:42:30', '110320', '1103200', '05512200', '200168013786', '1', 'AC', '999901', '1002'], ['200', '888801', '20140718', '14:42:29', '000045', '0000450', 'A144229', '', '0', 'AC', '', '1001'], ['200', '888801', '20140718', '14:41:50', '0110', '01100', 'A144150', '', '0', 'AC', '', '1000'], ['200', '888801', '20140718', '14:41:21', '0221', '02210', 'A144121', '', '0', 'AC', '', '505'], ['200', '888801', '20140718', '14:32:34', '0120', '01200', 'A143234', '', '0', 'AC', '', '504'], ['200', '888801', '20140718', '14:27:07', '000045', '0000450', 'A142707', '', '0', 'AC', '', '503'], ['200', '888801', '20140718', '14:26:04', '0120', '01200', 'A142604', '', '0', 'AC', '', '502'], ['200', '888801', '20140718', '14:25:59', '000045', '0000450', 'A142559', '', '0', 'AC', '', '501'], ['200', '888801', '20140718', '14:25:49', '0110', '01100', 'A142550', '', '0', 'AC', '', '500'], ['200', '888801', '20140718', '14:24:47', '0221', '02210', 'A142447', '', '0', 'AC', '', '19'], ['200', '888801', '20140718', '14:23:21', '000045', '0000450', 'A142321', '', '0', 'RJ', '', '18'], ['200', '888801', '20140718', '14:21:34', '0110', '01100', 'A142134', '', '0', 'AC', '', '17'], ['200', '888801', '20140718', '12:00:12', '0221', '02210', 'A120012', '', '0', 'AC', '', '16'], ['200', '888801', '20140718', '11:58:15', '110000', '1100000', '05427101', '200168013786', '10', 'AC', '999901', '15'], ['200', '888801', '20140718', '11:57:28', '110320', '1100000', '05426739', '200168013786', '1', 'AC', '999901', '14'], ['200', '888801', '20140718', '11:56:19', '110320', '1100000', '05426325', '200168013786', '1', 'AC', '999901', '13'], ['200', '888801', '20140718', '11:56:11', '110320', '1103200', '05425690', '200168013786', '1', 'AC', '999901', '12'], ['200', '888801', '20140718', '11:55:25', '110320', '1103200', '05425303', '200168013786', '10000', 'AC', '999901', '11'], ['200', '888801', '20140718', '11:53:49', '110000', '1100000', 'A115349', '200168013786', '10', 'RJ', '', '10'], ['200', '888801', '20140718', '11:53:04', '110320', '1103200', '05424437', '200168013786', '1', 'AC', '999901', '9'], ['200', '888801', '20140718', '11:52:00', '0110', '01100', 'A115200', '', '0', 'AC', '', '8'], ['200', '888801', '20140718', '11:49:24', '0221', '02210', 'A114924', '', '0', 'AC', '', '7'], ['200', '888801', '20140718', '11:48:50', '0120', '01200', 'A114851', '', '0', 'AC', '', '5'], ['200', '888801', '20140718', '11:10:17', '092654', '0926540', '05400113', '', '0', 'AC', '', '4'], ['200', '888801', '20140718', '11:10:07', '092654', '0926540', 'A111008', '', '0', 'RJ', '', '3'], ['200', '888801', '20140718', '11:09:59', '092654', '0926540', 'A111000', '', '0', 'RJ', '', '2'], ['200', '888801', '20140718', '11:06:51', '0110', '01100', '', '', '0', 'RJ', '', '1']]","txnStatus":"1"}}]
