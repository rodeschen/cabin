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

            var txns = {
                //login
                '0110': function(data) {
                    return [200, angular.toJson([{
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
                    }]), {}];
                },
                //query isLogin
                '000002': function() {
                    return [200, angular.toJson([{
                        "poc": {
                            "txnData": user,
                            "sessionId": "719A6B742CD02A38E5023667E6468DD8",
                            "txnStatus": "2"
                        }
                    }]), {}];
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
                }

            };



            // 
            // $httpBackend.whenPOST('\/iBranchApp\/json').respond(function(method, url, data, headers) {
            //     data = angular.fromJson(data);
            //     console.log(data.txnId, url, "mock", data, headers);
            //     //[200, resData, {}];
            //     return txns[data.txnId] && txns[data.txnId](data) || txns['mockNotFound']();
            // });

        }
    ]);
});
