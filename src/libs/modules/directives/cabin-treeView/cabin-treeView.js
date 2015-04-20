'use strict';
define(['cabinDirectivesModule'], function(cabinDirectivesModule) {
    cabinDirectivesModule.directive('cbTreeView', ['$timeout', 'cabinModulePath', 'cbTreeViewService',
            function($timeout, cabinModulePath, cbTreeViewService) {
                return {
                    restrict: 'A',
                    templateUrl: cabinModulePath + 'directives/cabin-treeView/templates/treeView.html',
                    scope: {
                        'tree': '=cbTreeView',
                        'ft': '=treeFilter'
                    },
                    replace: true,
                    link: function($scope, iElm, iAttrs, controller) {
                        $scope.tree = $scope.tree || [{
                            type: 'folder',
                            title: '00-我的最愛',
                            children: [{
                                type: 'file',
                                txn: '000001',
                                title: '電子日誌查詢'
                            }, {
                                type: 'file',
                                txn: '000045',
                                title: '轉帳交易'
                            }, {
                                type: 'file',
                                txn: '009007',
                                title: '櫃員日結查詢'
                            }, {
                                type: 'file',
                                txn: '009008',
                                title: '分行日結查詢'
                            }, {
                                type: 'file',
                                txn: '009198',
                                title: '分行開行'
                            }, {
                                type: 'file',
                                txn: '009199',
                                title: '分行關行'
                            }, {
                                type: 'file',
                                txn: '032018',
                                title: '分行日結查詢回應畫面'
                            }, {
                                type: 'file',
                                txn: '032060',
                                title: '櫃員日結查詢回應畫面'
                            }, {
                                type: 'file',
                                txn: '032671',
                                title: '歸戶查詢'
                            }, {
                                type: 'file',
                                txn: '075120',
                                title: '自行人員代理設定'
                            }, {
                                type: 'file',
                                txn: '075350',
                                title: '廣播發送'
                            }, {
                                type: 'file',
                                txn: '075351',
                                title: '廣播接收'
                            }, {
                                type: 'file',
                                txn: '092654',
                                title: '櫃員帳務查詢'
                            }, {
                                type: 'file',
                                txn: '120606',
                                title: '黃金存摺餘額/存額證明列印'
                            }]
                        },{
                            type: 'folder',
                            title: '01-營運資訊系統',
                            children: [{
                                type: 'file',
                                txn: '012151',
                                title: '存款利率建檔'
                            }, {
                                type: 'file',
                                txn: '012152',
                                title: '存款準備率建檔'
                            }, {
                                type: 'file',
                                txn: '012153',
                                title: '存款利率建檔未覆核查詢'
                            }, {
                                type: 'file',
                                txn: '012154',
                                title: '存款利率整批覆核'
                            }, {
                                type: 'file',
                                txn: '012156',
                                title: '台幣放款利率建檔'
                            }, {
                                type: 'file',
                                txn: '012157',
                                title: '台幣放款授權下限利率建檔'
                            }, {
                                type: 'file',
                                txn: '012158',
                                title: '台幣放款主管加減碼權限建檔'
                            }, {
                                type: 'file',
                                txn: '012160',
                                title: '台幣放款特殊性質別建檔'
                            }, {
                                type: 'file',
                                txn: '012161',
                                title: '外匯存款掛牌利率建檔'
                            }, {
                                type: 'file',
                                txn: '012162',
                                title: '外匯存款掛牌利率整批覆核'
                            }]
                        }, {
                            type: 'folder',
                            title: '02-共用系統',
                            children: [{
                                type: 'file',
                                txn: '022150',
                                title: '分行連線及日結關機狀態查詢／設定解除'
                            }, {
                                type: 'file',
                                txn: '022160',
                                title: '分行／櫃員交易額度維護'
                            }, {
                                type: 'file',
                                txn: '022551',
                                title: '分行開機'
                            }, {
                                type: 'file',
                                txn: '022552',
                                title: '分行關機'
                            }, {
                                type: 'file',
                                txn: '022579',
                                title: '櫃員／主管授權資料覆核'
                            }, {
                                type: 'file',
                                txn: '022580',
                                title: '交易控制資料維護'
                            }, {
                                type: 'file',
                                txn: '022581',
                                title: '不營業／不交換狀況設定'
                            }, {
                                type: 'file',
                                txn: '022582',
                                title: '報表廣告詞維護'
                            }, {
                                type: 'file',
                                txn: '022583',
                                title: '列印廣告詞報表維護'
                            }, {
                                type: 'file',
                                txn: '022584',
                                title: '夜間銀行開啟（人手）'
                            }, {
                                type: 'file',
                                txn: '022585',
                                title: '外匯作業登錄'
                            }, {
                                type: 'file',
                                txn: '022586',
                                title: '交易群組ＴＣＭ００５檔案維護'
                            }, {
                                type: 'file',
                                txn: '022587',
                                title: '交易群組ＴＣＭ００５檔案查詢與列印'
                            }]
                        }, {
                            type: 'folder',
                            title: '03-客戶資訊系統',
                            children: [{
                                type: 'file',
                                txn: '032150',
                                title: '客戶資料建檔檢核'
                            }, {
                                type: 'file',
                                txn: '032151',
                                title: '客戶基本資料維護'
                            }, {
                                type: 'file',
                                txn: '032152',
                                title: '客戶多戶名維護'
                            }, {
                                type: 'file',
                                txn: '032153',
                                title: '客戶多通訊地址維護'
                            }, {
                                type: 'file',
                                txn: '032154',
                                title: '客戶多電話維護'
                            }, {
                                type: 'file',
                                txn: '032155',
                                title: '客戶特殊事故資料建檔維護'
                            }, {
                                type: 'file',
                                txn: '032156',
                                title: '客戶統一編號變更'
                            }, {
                                type: 'file',
                                txn: '032157',
                                title: '客戶單據寄送方式維護'
                            }, {
                                type: 'file',
                                txn: '032158',
                                title: '簡易客戶基本資料建檔查詢'
                            }, {
                                type: 'file',
                                txn: '032159',
                                title: '綜合電子帳單／寄單地址維護'
                            }, {
                                type: 'file',
                                txn: '032163',
                                title: '集團企業資料查詢交易'
                            }, {
                                type: 'file',
                                txn: '032164',
                                title: '集團企業建檔更正交易'
                            }, {
                                type: 'file',
                                txn: '032165',
                                title: '刪除集團企業未覆核資料'
                            }, {
                                type: 'file',
                                txn: '032166',
                                title: '集團企業覆核交易'
                            }, {
                                type: 'file',
                                txn: '032167',
                                title: '集團資料建檔維護'
                            }]
                        }, {
                            type: 'folder',
                            title: '04-交易控制',
                            children: [{
                                type: 'file',
                                txn: '042580',
                                title: 'ＺＯＳＰ　ＴＣ　ＣＨＥＣＫ檔案維護'
                            }, {
                                type: 'file',
                                txn: '042581',
                                title: 'ＺＯＳＫ　ＴＣ　ＣＨＥＣＫ檔案維護'
                            }, {
                                type: 'file',
                                txn: '042582',
                                title: '備份ＴＣ　ＣＨＫ檔案／查詢'
                            }]
                        }, {
                            type: 'folder',
                            title: '05-額度控管系統',
                            children: [{
                                type: 'file',
                                txn: '050150',
                                title: '授信客戶資料建檔－單筆'
                            }, {
                                type: 'file',
                                txn: '050151',
                                title: '授信客戶資料建檔－大批'
                            }, {
                                type: 'file',
                                txn: '050152',
                                title: '授信主從債務人維護'
                            }, {
                                type: 'file',
                                txn: '050153',
                                title: '授信額度核准'
                            }, {
                                type: 'file',
                                txn: '050154',
                                title: '授信額度子帳號核准'
                            }, {
                                type: 'file',
                                txn: '050155',
                                title: '整批年金貸款核准'
                            }, {
                                type: 'file',
                                txn: '050156',
                                title: '融資額度動用維護'
                            }, {
                                type: 'file',
                                txn: '050157',
                                title: '額度鎖住'
                            }, {
                                type: 'file',
                                txn: '050158',
                                title: '機關團體資料建檔'
                            }, {
                                type: 'file',
                                txn: '050159',
                                title: '企金或有風險額度維護'
                            }, {
                                type: 'file',
                                txn: '050161',
                                title: '分項額度建檔'
                            }, {
                                type: 'file',
                                txn: '050162',
                                title: '擔保品資料建檔－土地房屋'
                            }, {
                                type: 'file',
                                txn: '050163',
                                title: '擔保品資料建檔－一般'
                            }, {
                                type: 'file',
                                txn: '050164',
                                title: '客戶契據維護'
                            }, {
                                type: 'file',
                                txn: '050165',
                                title: '授信帳號與擔保品契據關係維護'
                            }, {
                                type: 'file',
                                txn: '050166',
                                title: '授信帳號與擔保品契據查詢'
                            }, {
                                type: 'file',
                                txn: '050167',
                                title: '股票代號建檔'
                            }, {
                                type: 'file',
                                txn: '050168',
                                title: '股票代號查詢'
                            }, {
                                type: 'file',
                                txn: '050169',
                                title: '存單質借客戶資料／額度核准'
                            }]
                        }, {
                            type: 'folder',
                            title: '06-額度控管系統',
                            children: [{
                                type: 'file',
                                txn: '060160',
                                title: '傳真指示─傳真機維護'
                            }, {
                                type: 'file',
                                txn: '060161',
                                title: '傳真指示─約定確認人員維護'
                            }, {
                                type: 'file',
                                txn: '060162',
                                title: '不動產擔保品土地持分建檔'
                            }, {
                                type: 'file',
                                txn: '060171',
                                title: '聯貸資料維護'
                            }, {
                                type: 'file',
                                txn: '062667',
                                title: '傳真指示約定查詢'
                            }]
                        }, {
                            type: 'folder',
                            title: '08-安控稽核系統',
                            children: [{
                                type: 'file',
                                txn: '080020',
                                title: '印製存款業務查帳報表'
                            }, {
                                type: 'file',
                                txn: '080041',
                                title: '印製授信類查核報表'
                            }]
                        }, {
                            type: 'folder',
                            title: '16-市庫存款系統',
                            children: [{
                                type: 'file',
                                txn: '090210',
                                title: '雜項收入'
                            }, {
                                type: 'file',
                                txn: '090310',
                                title: '雜項支出'
                            }, {
                                type: 'file',
                                txn: '091999',
                                title: '雜項沖正'
                            }]
                        }, {
                            type: 'folder',
                            title: '09-會計共用系統',
                            children: [{
                                type: 'file',
                                txn: '092150',
                                title: '金庫往來'
                            }, {
                                type: 'file',
                                txn: '092151',
                                title: '金庫往來'
                            }, {
                                type: 'file',
                                txn: '092160',
                                title: '自動櫃員機金庫往來交易'
                            }, {
                                type: 'file',
                                txn: '092191',
                                title: '會計科子細目基本資料維護'
                            }, {
                                type: 'file',
                                txn: '092192',
                                title: '全行合理版塊維護／查詢'
                            }, {
                                type: 'file',
                                txn: '092193',
                                title: '分行合理版塊維護－分行'
                            }, {
                                type: 'file',
                                txn: '092194',
                                title: '分行合理版塊維護－版塊'
                            }, {
                                type: 'file',
                                txn: '092550',
                                title: '櫃員收付試算'
                            }, {
                                type: 'file',
                                txn: '092559',
                                title: '櫃員收付結帳／結帳解除'
                            }]
                        }, {
                            type: 'folder',
                            title: '10-支票存款系統',
                            children: [{
                                type: 'file',
                                txn: '100150',
                                title: '支存存款新開戶'
                            }, {
                                type: 'file',
                                txn: '100210',
                                title: '支存現金收入'
                            }, {
                                type: 'file',
                                txn: '100214',
                                title: '支存現金收入傳票套印'
                            }, {
                                type: 'file',
                                txn: '100220',
                                title: '支存轉帳收入'
                            }, {
                                type: 'file',
                                txn: '100221',
                                title: '本行支票開票交易'
                            }, {
                                type: 'file',
                                txn: '100224',
                                title: '支存轉帳收入傳票套印'
                            }, {
                                type: 'file',
                                txn: '100226',
                                title: '支存扣帳不足授權中心轉帳'
                            }, {
                                type: 'file',
                                txn: '100229',
                                title: '支存轉帳收入(序號控管交易)'
                            }, {
                                type: 'file',
                                txn: '100230',
                                title: '多額度指定還款'
                            }, {
                                type: 'file',
                                txn: '100310',
                                title: '支存現金支出'
                            }, {
                                type: 'file',
                                txn: '100311',
                                title: '支存本交票退、撤票'
                            }, {
                                type: 'file',
                                txn: '100312',
                                title: '支存交換付出'
                            }, {
                                type: 'file',
                                txn: '100320',
                                title: '支存轉帳支出'
                            }, {
                                type: 'file',
                                txn: '100321',
                                title: '支存轉帳支出（非支票）'
                            }, {
                                type: 'file',
                                txn: '100322',
                                title: '支存轉帳扣抵圈提'
                            }, {
                                type: 'file',
                                txn: '100325',
                                title: '多額度轉帳收息'
                            }, {
                                type: 'file',
                                txn: '100330',
                                title: '多額度指定動支'
                            }, {
                                type: 'file',
                                txn: '100340',
                                title: '支存轉帳支出－企金'
                            }, {
                                type: 'file',
                                txn: '100341',
                                title: '支存轉帳支出（非支票）－企金'
                            }, {
                                type: 'file',
                                txn: '100410',
                                title: '支存現金結清'
                            }, {
                                type: 'file',
                                txn: '100420',
                                title: '支存轉帳結清'
                            }]
                        }, {
                            type: 'folder',
                            title: '11-存摺類存款系統',
                            children: [{
                                type: 'file',
                                txn: '110150',
                                title: '存摺存款新開戶'
                            }, {
                                type: 'file',
                                txn: '110160',
                                title: '存摺存款ＷＥＢ新開戶'
                            }, {
                                type: 'file',
                                txn: '110210',
                                title: '存摺現金存入（含存入本交票）'
                            }, {
                                type: 'file',
                                txn: '110214',
                                title: '存摺現金存入傳票套印（含存入本交票）'
                            }, {
                                type: 'file',
                                txn: '110220',
                                title: '存摺轉帳存入'
                            }, {
                                type: 'file',
                                txn: '110224',
                                title: '存摺轉帳存入傳票套印'
                            }, {
                                type: 'file',
                                txn: '110229',
                                title: '存摺轉帳存入（序號控管交易）'
                            }, {
                                type: 'file',
                                txn: '110230',
                                title: '存摺多額度指定還款'
                            }, {
                                type: 'file',
                                txn: '110310',
                                title: '存摺現金支出'
                            }, {
                                type: 'file',
                                txn: '110311',
                                title: '存摺本交票退，撤票'
                            }, {
                                type: 'file',
                                txn: '110314',
                                title: '存摺現金支出傳票套印'
                            }, {
                                type: 'file',
                                txn: '110320',
                                title: '存摺轉帳支出'
                            }, {
                                type: 'file',
                                txn: '110321',
                                title: '存摺轉帳扣抵圈存'
                            }, {
                                type: 'file',
                                txn: '110324',
                                title: '存摺轉帳支出傳票套印'
                            }, {
                                type: 'file',
                                txn: '110325',
                                title: '一本萬利轉帳收息'
                            }, {
                                type: 'file',
                                txn: '110330',
                                title: '多額度指定動支'
                            }, {
                                type: 'file',
                                txn: '110340',
                                title: '存摺轉帳支出－非金服'
                            }, {
                                type: 'file',
                                txn: '110410',
                                title: '存摺現金結清'
                            }, {
                                type: 'file',
                                txn: '110420',
                                title: '存摺轉帳結清'
                            }]
                        }, {
                            type: 'folder',
                            title: '12-存款共用系統',
                            children: [{
                                type: 'file',
                                txn: '120150',
                                title: '黃金存摺申請維護暨查詢'
                            }, {
                                type: 'file',
                                txn: '120501',
                                title: ' 薪資／代繳代發掛帳維護'
                            }, {
                                type: 'file',
                                txn: '120502',
                                title: ' 薪資／代繳代發銷帳維護'
                            }, {
                                type: 'file',
                                txn: '120601',
                                title: '黃金存摺單筆買入'
                            }, {
                                type: 'file',
                                txn: '120602',
                                title: '黃金存摺單筆出售'
                            }, {
                                type: 'file',
                                txn: '120603',
                                title: '黃金存摺提領／轉換'
                            }, {
                                type: 'file',
                                txn: '120604',
                                title: '黃金存摺後台交易'
                            }, {
                                type: 'file',
                                txn: '120605',
                                title: '黃金存摺非帳務交易明細查詢'
                            }, {
                                type: 'file',
                                txn: '120606',
                                title: '黃金存摺餘額證明列印'
                            }]
                        }, {
                            type: 'folder',
                            title: '13-公庫定存系統',
                            children: [{
                                type: 'file',
                                txn: '130150',
                                title: '存款新開戶'
                            }, {
                                type: 'file',
                                txn: '130210',
                                title: '現金收入（混合）'
                            }, {
                                type: 'file',
                                txn: '130220',
                                title: '轉帳收入'
                            }, {
                                type: 'file',
                                txn: '130311',
                                title: '本交票退撤票'
                            }, {
                                type: 'file',
                                txn: '130400',
                                title: '定存解約'
                            }, {
                                type: 'file',
                                txn: '130500',
                                title: '臨櫃轉期'
                            }, {
                                type: 'file',
                                txn: '130600',
                                title: '定存付息'
                            }, {
                                type: 'file',
                                txn: '130820',
                                title: '調整已付利息（差額）'
                            }, {
                                type: 'file',
                                txn: '131150',
                                title: '主檔內容變更'
                            }, {
                                type: 'file',
                                txn: '131151',
                                title: '主檔狀況登錄解除'
                            }, {
                                type: 'file',
                                txn: '131153',
                                title: '定存到期預約設定／變更'
                            }, {
                                type: 'file',
                                txn: '131154',
                                title: '定存存單重印／補發'
                            }, {
                                type: 'file',
                                txn: '131155',
                                title: '公庫定存預發本年度扣繳憑單'
                            }, {
                                type: 'file',
                                txn: '131170',
                                title: '連線預約印表'
                            }, {
                                type: 'file',
                                txn: '131999',
                                title: '沖正'
                            }, {
                                type: 'file',
                                txn: '132650',
                                title: '存戶內容查詢／列印'
                            }]
                        }, {
                            type: 'folder',
                            title: '14-存款系統定存/綜定',
                            children: [{
                                type: 'file',
                                txn: '140150',
                                title: '定期存款新開戶'
                            }, {
                                type: 'file',
                                txn: '140151',
                                title: '定期存款卡號新開戶'
                            }, {
                                type: 'file',
                                txn: '140210',
                                title: '現金收入（混合）'
                            }, {
                                type: 'file',
                                txn: '140220',
                                title: '轉帳收入'
                            }, {
                                type: 'file',
                                txn: '140221',
                                title: '零存存入建檔'
                            }, {
                                type: 'file',
                                txn: '140311',
                                title: '本交票退撤票'
                            }, {
                                type: 'file',
                                txn: '140320',
                                title: '零存消除存入'
                            }, {
                                type: 'file',
                                txn: '140400',
                                title: '定存解約'
                            }, {
                                type: 'file',
                                txn: '140401',
                                title: '定存移轉解約'
                            }, {
                                type: 'file',
                                txn: '140500',
                                title: '臨櫃轉期'
                            }, {
                                type: 'file',
                                txn: '140600',
                                title: '定存付息'
                            }, {
                                type: 'file',
                                txn: '140830',
                                title: '定存退稅'
                            }, {
                                type: 'file',
                                txn: '140840',
                                title: '定存利息調整'
                            }, {
                                type: 'file',
                                txn: '141150',
                                title: '主檔內容變更'
                            }, {
                                type: 'file',
                                txn: '141151',
                                title: '主檔狀況登錄解除'
                            }, {
                                type: 'file',
                                txn: '141152',
                                title: '領息副檔建檔'
                            }, {
                                type: 'file',
                                txn: '141153',
                                title: '定存到期預約設定／變更'
                            }, {
                                type: 'file',
                                txn: '141154',
                                title: '定存存單重印／補發'
                            }, {
                                type: 'file',
                                txn: '141155',
                                title: '定期存款預發本年度扣繳憑單'
                            }, {
                                type: 'file',
                                txn: '141156',
                                title: '無實體ＮＣＤ當日發行轉換交易鎖定暨列印'
                            }, {
                                type: 'file',
                                txn: '141999',
                                title: '沖正'
                            }, {
                                type: 'file',
                                txn: '142610',
                                title: '定存轉基金分批投資明細查詢'
                            }]
                        }, {
                            type: 'folder',
                            title: '15-如意存款',
                            children: [{
                                type: 'file',
                                txn: '150210',
                                title: '現金收入'
                            }, {
                                type: 'file',
                                txn: '150220',
                                title: '轉帳收入'
                            }, {
                                type: 'file',
                                txn: '150221',
                                title: '轉帳更正'
                            }, {
                                type: 'file',
                                txn: '150222',
                                title: '轉帳收入'
                            }, {
                                type: 'file',
                                txn: '150229',
                                title: '轉帳收入(序號控管交易)'
                            }, {
                                type: 'file',
                                txn: '150311',
                                title: '本交票退票或撤票'
                            }, {
                                type: 'file',
                                txn: '150400',
                                title: '如意解約'
                            }, {
                                type: 'file',
                                txn: '151150',
                                title: '主檔內容變更'
                            }, {
                                type: 'file',
                                txn: '151151',
                                title: '主檔狀況登錄解除'
                            }, {
                                type: 'file',
                                txn: '151155',
                                title: '如意存款預發本年度扣繳憑單'
                            }]
                        }, {
                            type: 'folder',
                            title: '16-市庫存款系統',
                            children: [{
                                type: 'file',
                                txn: '160150',
                                title: '市庫存款新開戶'
                            }, {
                                type: 'file',
                                txn: '160158',
                                title: '消除市庫存款新開戶依機關別'
                            }, {
                                type: 'file',
                                txn: '160159',
                                title: '銷除市庫存款新開戶'
                            }, {
                                type: 'file',
                                txn: '160210',
                                title: '市庫存款收入－現金及本交票'
                            }, {
                                type: 'file',
                                txn: '160220',
                                title: '市庫存款收入－轉帳'
                            }, {
                                type: 'file',
                                txn: '160310',
                                title: '市庫支票支出－現金'
                            }, {
                                type: 'file',
                                txn: '160311',
                                title: '市庫存款－退／撤票'
                            }]
                        }, {
                            type: 'folder',
                            title: '17-外匯活期存款系統',
                            children: [{
                                type: 'file',
                                txn: '170150',
                                title: '外匯活期存款新開戶'
                            }, {
                                type: 'file',
                                txn: '170151',
                                title: '新開戶'
                            }, {
                                type: 'file',
                                txn: '170210',
                                title: '外活現金存入'
                            }, {
                                type: 'file',
                                txn: '170220',
                                title: '外匯活存轉帳存入'
                            }, {
                                type: 'file',
                                txn: '170250',
                                title: '外匯活存存入'
                            }, {
                                type: 'file',
                                txn: '170310',
                                title: '外匯活存現金支出'
                            }, {
                                type: 'file',
                                txn: '170320',
                                title: '外匯活存轉帳支出'
                            }, {
                                type: 'file',
                                txn: '170322',
                                title: '外活綜存轉綜定'
                            }, {
                                type: 'file',
                                txn: '170340',
                                title: '外匯活存轉帳支出'
                            }, {
                                type: 'file',
                                txn: '170350',
                                title: '外匯活存支出雙邊帳'
                            }, {
                                type: 'file',
                                txn: '170360',
                                title: '外匯活存ＤＢＵ／ＯＢＵ互轉'
                            }, {
                                type: 'file',
                                txn: '170370',
                                title: '外匯活存幣轉'
                            }, {
                                type: 'file',
                                txn: '170380',
                                title: '外匯活存轉定存'
                            }, {
                                type: 'file',
                                txn: '170410',
                                title: '外匯活存幣別結清'
                            }]
                        }, {
                            type: 'folder',
                            title: '18-外匯定期存款系統',
                            children: [{
                                type: 'file',
                                txn: '180150',
                                title: '外匯定期存款新開戶'
                            }, {
                                type: 'file',
                                txn: '180210',
                                title: '開立存單雙邊帳'
                            }, {
                                type: 'file',
                                txn: '180220',
                                title: '轉帳開立存單'
                            }, {
                                type: 'file',
                                txn: '180400',
                                title: '存單解約'
                            }, {
                                type: 'file',
                                txn: '180410',
                                title: '存單解約雙邊帳'
                            }, {
                                type: 'file',
                                txn: '180500',
                                title: '存單轉期'
                            }, {
                                type: 'file',
                                txn: '180510',
                                title: '存單轉期雙邊帳'
                            }, {
                                type: 'file',
                                txn: '180600',
                                title: '存單付息'
                            }, {
                                type: 'file',
                                txn: '180820',
                                title: '利息及所得稅調整'
                            }, {
                                type: 'file',
                                txn: '180830',
                                title: '外匯定存退稅'
                            }, {
                                type: 'file',
                                txn: '180840',
                                title: '外幣定存利息調整'
                            }, {
                                type: 'file',
                                txn: '181150',
                                title: '主檔內容變更'
                            }, {
                                type: 'file',
                                txn: '181151',
                                title: '主檔狀況別登錄／解除'
                            }, {
                                type: 'file',
                                txn: '181152',
                                title: '換發新存單'
                            }, {
                                type: 'file',
                                txn: '181153',
                                title: '外匯保證金連動各交易'
                            }, {
                                type: 'file',
                                txn: '181154',
                                title: '組合式存款連動各交易'
                            }]
                        }, {
                            type: 'folder',
                            title: '19-代收付系統',
                            children: [{
                                type: 'file',
                                txn: '190210',
                                title: '現金收入交易'
                            }, {
                                type: 'file',
                                txn: '190212',
                                title: '待繳監理資費即時連線銷號－現金收入'
                            }, {
                                type: 'file',
                                txn: '190213',
                                title: '押標金－現金收入交易'
                            }, {
                                type: 'file',
                                txn: '190220',
                                title: '轉帳收入交易'
                            }, {
                                type: 'file',
                                txn: '190221',
                                title: '代理手續費出帳交易'
                            }, {
                                type: 'file',
                                txn: '190222',
                                title: '待繳監理資費即時連線銷號－轉帳收入'
                            }, {
                                type: 'file',
                                txn: '190223',
                                title: '押標金－轉帳收入交易'
                            }, {
                                type: 'file',
                                txn: '190224',
                                title: '特定指定款項解付交易'
                            }, {
                                type: 'file',
                                txn: '190310',
                                title: '現金支出交易'
                            }, {
                                type: 'file',
                                txn: '190320',
                                title: '轉帳支出交易'
                            }, {
                                type: 'file',
                                txn: '190700',
                                title: '稅款代收整批銷帳資料轉入'
                            }, {
                                type: 'file',
                                txn: '190720',
                                title: '代收各項稅費款當日交易更正'
                            }, {
                                type: 'file',
                                txn: '190800',
                                title: '特定解付更正交易'
                            }, {
                                type: 'file',
                                txn: '190820',
                                title: '代收稅款應扣補交易'
                            }]
                        }, {
                            type: 'folder',
                            title: '20-存款共用系統',
                            children: [{
                                type: 'file',
                                txn: '200150',
                                title: '註銷新開戶'
                            }, {
                                type: 'file',
                                txn: '200160',
                                title: '一本萬利外存／信託／台定開戶交易'
                            }, {
                                type: 'file',
                                txn: '201150',
                                title: '聯名戶登錄／解除'
                            }, {
                                type: 'file',
                                txn: '201151',
                                title: '存款圈存金額'
                            }, {
                                type: 'file',
                                txn: '201152',
                                title: '連線批次預約報表'
                            }]
                        }, {
                            type: 'folder',
                            title: '23-外幣現鈔旅支系統',
                            children: [{
                                type: 'file',
                                txn: '230210',
                                title: '外幣現鈔買入交易'
                            }, {
                                type: 'file',
                                txn: '230310',
                                title: '外幣現鈔、旅支賣出交易'
                            }, {
                                type: 'file',
                                txn: '230850',
                                title: '旅支訂購已覆核錯誤更正作業'
                            }, {
                                type: 'file',
                                txn: '230950',
                                title: '簡易外匯日終結帳檢核交易'
                            }, {
                                type: 'file',
                                txn: '231150',
                                title: '外幣現鈔訂購－電文登錄﹝主辦行﹞'
                            }, {
                                type: 'file',
                                txn: '231151',
                                title: '外幣現鈔訂購入庫－銷帳登錄﹝主辦行﹞'
                            }, {
                                type: 'file',
                                txn: '231152',
                                title: '外幣現鈔出庫－發報聯往登錄﹝主辦行﹞'
                            }, {
                                type: 'file',
                                txn: '231155',
                                title: '買賣現鈔／旅支媒體申報明細資料維護交易'
                            }, {
                                type: 'file',
                                txn: '231170',
                                title: '旅支訂購建檔作業登錄'
                            }, {
                                type: 'file',
                                txn: '231171',
                                title: '旅支入庫登錄'
                            }, {
                                type: 'file',
                                txn: '231172',
                                title: '旅支庫存銷毀登錄'
                            }, {
                                type: 'file',
                                txn: '231173',
                                title: '旅支庫存票號維護登錄'
                            }, {
                                type: 'file',
                                txn: '231174',
                                title: '旅支庫存調撥登錄'
                            }, {
                                type: 'file',
                                txn: '231180',
                                title: '旅支清算作業登錄'
                            }]
                        }, {
                            type: 'folder',
                            title: '24-外匯系統',
                            children: [{
                                type: 'file',
                                txn: '240150',
                                title: '其他兌換調帳交易'
                            }, {
                                type: 'file',
                                txn: '240151',
                                title: '單邊兌換調帳交易'
                            }, {
                                type: 'file',
                                txn: '240152',
                                title: '幣轉兌換調帳交易'
                            }, {
                                type: 'file',
                                txn: '240153',
                                title: '遠匯交割部位調帳交易'
                            }, {
                                type: 'file',
                                txn: '240154',
                                title: '兌換調帳明細表列印'
                            }, {
                                type: 'file',
                                txn: '241155',
                                title: '外匯央行媒體進出口資料單筆查詢維護'
                            }, {
                                type: 'file',
                                txn: '241156',
                                title: '外匯央行媒體匯出入資料單筆查詢維護'
                            }, {
                                type: 'file',
                                txn: '242250',
                                title: '交易通知服務地址維護交易'
                            }, {
                                type: 'file',
                                txn: '242660',
                                title: '央行媒體資料多筆查詢'
                            }, {
                                type: 'file',
                                txn: '242663',
                                title: '央行媒體連線預約報表列印交易'
                            }, {
                                type: 'file',
                                txn: '249900',
                                title: '黑名單明細表列印'
                            }]
                        }, {
                            type: 'folder',
                            title: '30-放款系統',
                            children: [{
                                type: 'file',
                                txn: '300301',
                                title: '貼現撥貸'
                            }, {
                                type: 'file',
                                txn: '300302',
                                title: '保證╱承兌'
                            }, {
                                type: 'file',
                                txn: '300303',
                                title: '授信帳號展期動用'
                            }, {
                                type: 'file',
                                txn: '300304',
                                title: '授信帳號增貸動用'
                            }, {
                                type: 'file',
                                txn: '300321',
                                title: '一般撥貸'
                            }, {
                                type: 'file',
                                txn: '300322',
                                title: '存單質借－初撥'
                            }, {
                                type: 'file',
                                txn: '300323',
                                title: '存單質借－續撥'
                            }, {
                                type: 'file',
                                txn: '300324',
                                title: '年金大批動支'
                            }, {
                                type: 'file',
                                txn: '300325',
                                title: '一般撥貸－金服'
                            }, {
                                type: 'file',
                                txn: '300326',
                                title: '一般撥貸（消金）'
                            }, {
                                type: 'file',
                                txn: '300327',
                                title: '合併撥貸'
                            }]
                        }, {
                            type: 'folder',
                            title: '31-放款系統',
                            children: [{
                                type: 'file',
                                txn: '310901',
                                title: '轉催收登錄'
                            }, {
                                type: 'file',
                                txn: '310902',
                                title: '轉催收登錄'
                            }, {
                                type: 'file',
                                txn: '310903',
                                title: '催收款項建檔'
                            }, {
                                type: 'file',
                                txn: '310904',
                                title: '催收款收回'
                            }, {
                                type: 'file',
                                txn: '310905',
                                title: '呆帳資料建檔維護'
                            }, {
                                type: 'file',
                                txn: '310906',
                                title: '整批轉催收登錄'
                            }, {
                                type: 'file',
                                txn: '310907',
                                title: '呆帳收回'
                            }, {
                                type: 'file',
                                txn: '310908',
                                title: '呆帳收回沖正'
                            }, {
                                type: 'file',
                                txn: '310914',
                                title: '催收款收回〈就學貸款〉'
                            }, {
                                type: 'file',
                                txn: '310917',
                                title: '呆帳收回〈就學貸款〉'
                            }, {
                                type: 'file',
                                txn: '310950',
                                title: '呆帳帳卡查詢'
                            }, {
                                type: 'file',
                                txn: '310960',
                                title: '整批轉催（個金）'
                            }]
                        }, {
                            type: 'folder',
                            title: '32-放款系統',
                            children: [{
                                type: 'file',
                                txn: '320701',
                                title: '還本繳息（外幣融資）'
                            }, {
                                type: 'file',
                                txn: '320702',
                                title: '應收承兌還款／轉融資及應收保證還款'
                            }, {
                                type: 'file',
                                txn: '320703',
                                title: '應收承兌還款／轉融資－ＭＴ２０２維護'
                            }, {
                                type: 'file',
                                txn: '320704',
                                title: '應收承兌還款／轉融資－ＭＴ２０２電文覆核'
                            }, {
                                type: 'file',
                                txn: '322301',
                                title: '國內信用狀－開狀帳務處理'
                            }, {
                                type: 'file',
                                txn: '322302',
                                title: '國內信用狀－開狀內容'
                            }]
                        }, {
                            type: 'folder',
                            title: '34-受託代放款系統',
                            children: [{
                                type: 'file',
                                txn: '340301',
                                title: '受託代放款帳號資料建檔'
                            }, {
                                type: 'file',
                                txn: '340303',
                                title: '關閉受託代放款作業'
                            }, {
                                type: 'file',
                                txn: '340701',
                                title: '受託代放款銷帳（還本繳息）'
                            }, {
                                type: 'file',
                                txn: '340704',
                                title: '違約金及遲延息－登錄╱解除╱收取'
                            }, {
                                type: 'file',
                                txn: '340705',
                                title: '預收款－轉入／轉出'
                            }, {
                                type: 'file',
                                txn: '340801',
                                title: '受託代放款沖正／轉正'
                            }, {
                                type: 'file',
                                txn: '342201',
                                title: '受託帳號基本資料維護'
                            }, {
                                type: 'file',
                                txn: '342202',
                                title: '變更受託帳號利率條件'
                            }]
                        }, {
                            type: 'folder',
                            title: '35-國宅系統',
                            children: [{
                                type: 'file',
                                txn: '350301',
                                title: '新放（撥貸）客戶資料建檔'
                            }, {
                                type: 'file',
                                txn: '350302',
                                title: '承接（撥貸）客戶資料建檔'
                            }, {
                                type: 'file',
                                txn: '350303',
                                title: '關閉國宅貸款作業'
                            }, {
                                type: 'file',
                                txn: '350701',
                                title: '銷帳（還本繳息／結清）'
                            }, {
                                type: 'file',
                                txn: '350702',
                                title: '銷帳（部份還本）'
                            }, {
                                type: 'file',
                                txn: '350703',
                                title: '補收╱退回利息或違約金'
                            }, {
                                type: 'file',
                                txn: '350704',
                                title: '違約金息－登錄╱解除╱收取'
                            }, {
                                type: 'file',
                                txn: '350705',
                                title: '預收款－轉入／轉出'
                            }, {
                                type: 'file',
                                txn: '350706',
                                title: '緩繳期利息掛帳'
                            }]
                        }, {
                            type: 'folder',
                            title: '36-公教系統',
                            children: [{
                                type: 'file',
                                txn: '360201',
                                title: '代繳機關維護'
                            }, {
                                type: 'file',
                                txn: '360301',
                                title: '新放（撥貸）客戶資料建檔'
                            }, {
                                type: 'file',
                                txn: '360303',
                                title: '關閉公教貸款作業'
                            }, {
                                type: 'file',
                                txn: '360501',
                                title: '代繳機關整批銷帳資料轉入'
                            }, {
                                type: 'file',
                                txn: '360502',
                                title: '代繳機關整批銷帳資料對照'
                            }, {
                                type: 'file',
                                txn: '360503',
                                title: '當日分行整批銷帳資料維護'
                            }, {
                                type: 'file',
                                txn: '360504',
                                title: '整批銷帳'
                            }, {
                                type: 'file',
                                txn: '360505',
                                title: '代繳機關整批資料轉入結果查詢'
                            }]
                        }, {
                            type: 'folder',
                            title: '37-放款系統',
                            children: [{
                                type: 'file',
                                txn: '370701',
                                title: '還本繳息'
                            }, {
                                type: 'file',
                                txn: '370801',
                                title: '放款沖正／轉正'
                            }, {
                                type: 'file',
                                txn: '372208',
                                title: '留學貸款資料維護'
                            }, {
                                type: 'file',
                                txn: '372211',
                                title: '匯出匯款單筆建檔作業（消金）'
                            }, {
                                type: 'file',
                                txn: '372212',
                                title: '整批匯出匯款打包作業（消金）'
                            }, {
                                type: 'file',
                                txn: '372213',
                                title: '整批匯出匯款確認傳送作業（消金）'
                            }, {
                                type: 'file',
                                txn: '372602',
                                title: '還本繳息查詢'
                            }, {
                                type: 'file',
                                txn: '372610',
                                title: '年金－提前還本及還本繳息試算（消金）'
                            }, {
                                type: 'file',
                                txn: '372611',
                                title: '放款帳卡明細查詢'
                            }]
                        }, {
                            type: 'folder',
                            title: '38-就學系統',
                            children: [{
                                type: 'file',
                                txn: '380301',
                                title: '就學撥貸資料建檔'
                            }, {
                                type: 'file',
                                txn: '380302',
                                title: '就學帳號展延'
                            }, {
                                type: 'file',
                                txn: '380401',
                                title: '結清'
                            }, {
                                type: 'file',
                                txn: '380701',
                                title: '銷帳（還本繳息）'
                            }, {
                                type: 'file',
                                txn: '380702',
                                title: '銷帳（部份還本）'
                            }, {
                                type: 'file',
                                txn: '380703',
                                title: '補收／退回利息或違約金'
                            }, {
                                type: 'file',
                                txn: '380704',
                                title: '預收款－轉入／轉出'
                            }]
                        }, {
                            type: 'folder',
                            title: '39-就學系統',
                            children: [{
                                type: 'file',
                                txn: '392224',
                                title: '整批撥貸覆核'
                            }, {
                                type: 'file',
                                txn: '392225',
                                title: '就學貸款主從債務人維護'
                            }, {
                                type: 'file',
                                txn: '392801',
                                title: '整批撥代磁片轉入'
                            }, {
                                type: 'file',
                                txn: '392861',
                                title: '整批撥貸磁片上傳結果查詢'
                            }]
                        }, {
                            type: 'folder',
                            title: '50-跨行系統',
                            children: [{
                                type: 'file',
                                txn: '502150',
                                title: '跨行作業系統開啟'
                            }, {
                                type: 'file',
                                txn: '502156',
                                title: '查詢交易處理狀況'
                            }, {
                                type: 'file',
                                txn: '502157',
                                title: '全國性繳費稅交易結果查詢及列印'
                            }, {
                                type: 'file',
                                txn: '502186',
                                title: '主機現金卡服務系統狀態變更'
                            }, {
                                type: 'file',
                                txn: '502188',
                                title: '主機對現金卡執行系統狀態變更通知'
                            }, {
                                type: 'file',
                                txn: '502192',
                                title: '現金卡異常交易明細查詢'
                            }, {
                                type: 'file',
                                txn: '502200',
                                title: 'Ｅ－ＣＨＡＮＮＥＬ應用系統'
                            }, {
                                type: 'file',
                                txn: '502210',
                                title: 'Ｅ－ＣＨＡＮＮＥＬ應用系統狀態查詢'
                            }, {
                                type: 'file',
                                txn: '502255',
                                title: '昨日跨行ＣＤ／ＡＴＭ交易狀況查詢'
                            }, {
                                type: 'file',
                                txn: '502257',
                                title: '跨國清算資料查詢'
                            }, {
                                type: 'file',
                                txn: '502260',
                                title: '跨行繳款入庫帳務列印'
                            }, {
                                type: 'file',
                                txn: '502261',
                                title: '各營業單位跨行作業聯行往來資料列印'
                            }, {
                                type: 'file',
                                txn: '502262',
                                title: 'ＣＤ／ＡＴＭ人工沖正交易查詢（發卡行）'
                            }]
                        }, {
                            type: 'folder',
                            title: '51-自動櫃員機系統',
                            children: [{
                                type: 'file',
                                txn: '510710',
                                title: '自動櫃員機未完成交易單筆銷帳'
                            }, {
                                type: 'file',
                                txn: '510720',
                                title: '自動櫃員機未完成交易整批銷帳'
                            }, {
                                type: 'file',
                                txn: '512152',
                                title: '金融卡主檔維護'
                            }, {
                                type: 'file',
                                txn: '512153',
                                title: '金融卡管理中心查詢及掛失'
                            }, {
                                type: 'file',
                                txn: '512154',
                                title: '自動櫃員機基本資料維護'
                            }, {
                                type: 'file',
                                txn: '512156',
                                title: '自動櫃員機緊急連絡人資料維護'
                            }, {
                                type: 'file',
                                txn: '512161',
                                title: '金融卡手續費減免查詢'
                            }, {
                                type: 'file',
                                txn: '512162',
                                title: '自動化文易手續費減免維護'
                            }, {
                                type: 'file',
                                txn: '512166',
                                title: '客戶分群跨行手續費優惠查詢'
                            }, {
                                type: 'file',
                                txn: '512650',
                                title: '金融卡基本資料查詢'
                            }, {
                                type: 'file',
                                txn: '512651',
                                title: '金融卡帳號查詢'
                            }, {
                                type: 'file',
                                txn: '512652',
                                title: '自動櫃員機管理查詢'
                            }]
                        }, {
                            type: 'folder',
                            title: '52-通匯系統',
                            children: [{
                                type: 'file',
                                txn: '520850',
                                title: '匯出匯款更正'
                            }, {
                                type: 'file',
                                txn: '520900',
                                title: '匯出匯款收款'
                            }, {
                                type: 'file',
                                txn: '520901',
                                title: '匯出匯款被退匯重匯'
                            }, {
                                type: 'file',
                                txn: '520902',
                                title: '大額匯出匯款收款'
                            }, {
                                type: 'file',
                                txn: '520903',
                                title: '自動化交易當日因押碼或序號不符被退匯重匯'
                            }, {
                                type: 'file',
                                txn: '520905',
                                title: '匯出匯款連動扣款及收款'
                            }, {
                                type: 'file',
                                txn: '520906',
                                title: '自動化交易轉隔日重匯交易'
                            }, {
                                type: 'file',
                                txn: '520910',
                                title: '個金匯出匯款收款'
                            }, {
                                type: 'file',
                                txn: '520920',
                                title: '匯出匯款退還'
                            }, {
                                type: 'file',
                                txn: '520922',
                                title: '匯入匯款人工解付'
                            }, {
                                type: 'file',
                                txn: '520923',
                                title: '匯入匯款人工退匯'
                            }, {
                                type: 'file',
                                txn: '520924',
                                title: '滯留交易確認'
                            }, {
                                type: 'file',
                                txn: '520925',
                                title: '匯入匯款整批人工解付'
                            }, {
                                type: 'file',
                                txn: '520926',
                                title: '匯出匯款整批退還'
                            }, {
                                type: 'file',
                                txn: '520927',
                                title: '延時匯入款人工解付'
                            }]
                        }, {
                            type: 'folder',
                            title: '53-信用查詢系統',
                            children: [{
                                type: 'file',
                                txn: '532650',
                                title: '票據信用資料查詢'
                            }, {
                                type: 'file',
                                txn: '532690',
                                title: '開戶交易完成狀況查詢票據信用'
                            }, {
                                type: 'file',
                                txn: '532694',
                                title: '信用查詢回應訊息'
                            }, {
                                type: 'file',
                                txn: '532750',
                                title: '印錄查詢回覆資料'
                            }, {
                                type: 'file',
                                txn: '532752',
                                title: '連線報表列印'
                            }, {
                                type: 'file',
                                txn: '532754',
                                title: '印錄查詢回覆資料（叡陽資訊）'
                            }, {
                                type: 'file',
                                txn: '532755',
                                title: '票據查詢回覆資料（叡陽資訊）'
                            }]
                        }, {
                            type: 'folder',
                            title: '55-網路銀行系統',
                            children: [{
                                type: 'file',
                                txn: '550201',
                                title: '網路銀行憑證收費'
                            }, {
                                type: 'file',
                                txn: '552170',
                                title: '網路銀行申請資料建檔及維護'
                            }, {
                                type: 'file',
                                txn: '552171',
                                title: '網路銀行轉出帳號（ＳＳＬ）建檔及維護'
                            }, {
                                type: 'file',
                                txn: '552173',
                                title: '網路銀行／行動銀行約定轉入帳號資料建檔及'
                            }, {
                                type: 'file',
                                txn: '552175',
                                title: '金融業務電子化服務契約書簽訂註記登錄及維'
                            }, {
                                type: 'file',
                                txn: '552176',
                                title: '網路／企業銀行檔案傳輸交易建檔及維護'
                            }, {
                                type: 'file',
                                txn: '552185',
                                title: '網路銀行國外匯出匯款受款人資料建檔及維護'
                            }, {
                                type: 'file',
                                txn: '552186',
                                title: ''
                            }, {
                                type: 'file',
                                txn: '552190',
                                title: '行動銀行申請資料建檔及維護'
                            }]
                        }, {
                            type: 'folder',
                            title: '56-預借現金系統',
                            children: [{
                                type: 'file',
                                txn: '562280',
                                title: '預借現金交易處理狀況列印'
                            }]
                        }, {
                            type: 'folder',
                            title: '57-企業銀行系統',
                            children: [{
                                type: 'file',
                                txn: '572170',
                                title: 'ＥＤＩ及企業銀行客戶資料登錄及維護'
                            }, {
                                type: 'file',
                                txn: '572171',
                                title: 'ＥＤＩ及企業銀行轉出帳號登錄及維護'
                            }, {
                                type: 'file',
                                txn: '572172',
                                title: '企業銀行終止服務轉出帳號強制終止記錄維護'
                            }, {
                                type: 'file',
                                txn: '572173',
                                title: 'ＥＤＩ及企業銀行轉入帳號登錄及維護'
                            }, {
                                type: 'file',
                                txn: '572174',
                                title: 'ＥＤＩ及企業銀行憑證掛失'
                            }, {
                                type: 'file',
                                txn: '572175',
                                title: 'ＥＤＩ及企業銀行轉入帳號整批建檔上傳'
                            }, {
                                type: 'file',
                                txn: '572176',
                                title: 'ＥＤＩ及企業銀行轉入帳號整批建檔取消'
                            }, {
                                type: 'file',
                                txn: '572178',
                                title: 'ＥＤＩ及企業銀行憑證資料登錄及維護'
                            }, {
                                type: 'file',
                                txn: '572179',
                                title: '企業銀行終止服務憑證強制停用掛失記錄維護'
                            }, {
                                type: 'file',
                                txn: '572180',
                                title: 'ＥＤＩ網路代號資料登錄及維護'
                            }, {
                                type: 'file',
                                txn: '572181',
                                title: 'ＦＥＤＩ參加銀行資料登錄及維護'
                            }, {
                                type: 'file',
                                txn: '572182',
                                title: '關貿ＥＤＩ臨櫃繳款資料登錄'
                            }, {
                                type: 'file',
                                txn: '572650',
                                title: 'ＥＤＩ交易明細總覽'
                            }, {
                                type: 'file',
                                txn: '572651',
                                title: 'ＥＤＩ單筆交易明細'
                            }, {
                                type: 'file',
                                txn: '572652',
                                title: 'ＥＤＩ分行帳務查詢'
                            }]
                        }, {
                            type: 'folder',
                            title: '60-二代金融卡',
                            children: [{
                                type: 'file',
                                txn: '601151',
                                title: '晶片金融卡卡片管理－申請'
                            }, {
                                type: 'file',
                                txn: '601152',
                                title: '晶片金融卡卡片管理－換發新卡'
                            }, {
                                type: 'file',
                                txn: '601153',
                                title: '晶片金融卡卡片管理－補發新卡'
                            }, {
                                type: 'file',
                                txn: '601154',
                                title: '晶片金融卡卡片管理－停用'
                            }, {
                                type: 'file',
                                txn: '601155',
                                title: '晶片金融卡卡片管理－通知掛失'
                            }, {
                                type: 'file',
                                txn: '601156',
                                title: '晶片金融卡卡片管理－啟用'
                            }, {
                                type: 'file',
                                txn: '601157',
                                title: '晶片金融卡卡片管理－解除鎖定'
                            }, {
                                type: 'file',
                                txn: '601158',
                                title: '簽收卡片'
                            }, {
                                type: 'file',
                                txn: '601159',
                                title: '晶片金融卡註銷作廢'
                            }, {
                                type: 'file',
                                txn: '601181',
                                title: '悠遊ＤＥＢＩＴ卡餘額轉置申請'
                            }, {
                                type: 'file',
                                txn: '601182',
                                title: '金融卡列印英文戶名'
                            }, {
                                type: 'file',
                                txn: '601183',
                                title: '磁條密碼變更'
                            }, {
                                type: 'file',
                                txn: '601201',
                                title: '晶片金融卡卡片管理－補印密碼函'
                            }, {
                                type: 'file',
                                txn: '602757',
                                title: '晶片金融卡基本資料查詢'
                            }, {
                                type: 'file',
                                txn: '602851',
                                title: '晶片卡晶片內容查詢'
                            }, {
                                type: 'file',
                                txn: '602852',
                                title: '晶片金融卡帳號寫入／資料同步'
                            }]
                        }, {
                            type: 'folder',
                            title: '61-網路銀行系統',
                            children: [{
                                type: 'file',
                                txn: '612173',
                                title: '網路銀行國外匯出匯款申請資料建檔及維護'
                            }]
                        }, {
                            type: 'folder',
                            title: '62-富邦商務網系統',
                            children: [{
                                type: 'file',
                                txn: '622176',
                                title: '富邦商務網集團關係企業資料維護'
                            }, {
                                type: 'file',
                                txn: '622177',
                                title: '富邦商務網動態密碼器申請建檔及維護'
                            }, {
                                type: 'file',
                                txn: '622178',
                                title: '企業金融網預約匯款融資轉入帳號維護'
                            }, {
                                type: 'file',
                                txn: '622179',
                                title: '富邦商務網轉出帳號建檔及維護'
                            }, {
                                type: 'file',
                                txn: '622180',
                                title: '富邦商務網外幣手續費建檔及維護'
                            }, {
                                type: 'file',
                                txn: '622181',
                                title: '企業金融網參加銀行登錄及維護'
                            }, {
                                type: 'file',
                                txn: '622183',
                                title: '富邦商務網客戶資料登錄及維護'
                            }, {
                                type: 'file',
                                txn: '622184',
                                title: '富邦商務網客戶憑證申請及維護'
                            }, {
                                type: 'file',
                                txn: '622185',
                                title: '富邦商務網約定憑證資料登錄及維護'
                            }, {
                                type: 'file',
                                txn: '622650',
                                title: '富邦商務網客戶交易記錄查詢'
                            }, {
                                type: 'file',
                                txn: '622651',
                                title: '富邦商務網預約轉帳紀錄查詢'
                            }, {
                                type: 'file',
                                txn: '622652',
                                title: '富邦商務網約定轉出帳號查詢'
                            }, {
                                type: 'file',
                                txn: '622653',
                                title: '富邦商務網轉帳交易額度查詢'
                            }]
                        }, {
                            type: 'folder',
                            title: '70-聯行往來(AN)',
                            children: [{
                                type: 'file',
                                txn: '701150',
                                title: '聯行往來發報資料維護'
                            }, {
                                type: 'file',
                                txn: '701160',
                                title: '聯行往來收報及對方科目列印'
                            }, {
                                type: 'file',
                                txn: '701170',
                                title: '聯行雜項貼補項目金額／件數維護'
                            }, {
                                type: 'file',
                                txn: '701250',
                                title: '聯行往來發報資料印表鎖定／鎖定解除'
                            }, {
                                type: 'file',
                                txn: '701260',
                                title: '聯行往來收報資料列印／補印'
                            }, {
                                type: 'file',
                                txn: '701270',
                                title: '聯行雜項貼補項目金額／件數覆核'
                            }, {
                                type: 'file',
                                txn: '701350',
                                title: '聯行往來發報資料放行'
                            }, {
                                type: 'file',
                                txn: '701370',
                                title: '聯行息補貼確認／取消確認'
                            }, {
                                type: 'file',
                                txn: '701470',
                                title: '聯行內部損益科目入帳維護'
                            }, {
                                type: 'file',
                                txn: '701471',
                                title: '聯行內部損益科目入帳覆核'
                            }, {
                                type: 'file',
                                txn: '702270',
                                title: '台幣聯行息計息基本資料維護'
                            }, {
                                type: 'file',
                                txn: '702272',
                                title: '聯行補貼項目基本資料維護　　　'
                            }, {
                                type: 'file',
                                txn: '702273',
                                title: '聯行補貼項目基本資料查詢'
                            }, {
                                type: 'file',
                                txn: '702651',
                                title: '聯行往來發報資料印表'
                            }, {
                                type: 'file',
                                txn: '702652',
                                title: '聯行往來放行批號查詢'
                            }]
                        }, {
                            type: 'folder',
                            title: '71-會計明細(AB)',
                            children: [{
                                type: 'file',
                                txn: '710210',
                                title: '會計現金收入維護交易'
                            }, {
                                type: 'file',
                                txn: '710220',
                                title: '會計轉帳收入交易維護'
                            }, {
                                type: 'file',
                                txn: '710310',
                                title: '會計現金支出維護交易'
                            }, {
                                type: 'file',
                                txn: '710320',
                                title: '會計轉帳支出維護交易'
                            }, {
                                type: 'file',
                                txn: '710830',
                                title: '懸記科目銷帳更正作業'
                            }, {
                                type: 'file',
                                txn: '710920',
                                title: '銷帳交易'
                            }, {
                                type: 'file',
                                txn: '710930',
                                title: '會計科子細目解付'
                            }, {
                                type: 'file',
                                txn: '711999',
                                title: '會計傳票沖正交易'
                            }, {
                                type: 'file',
                                txn: '712150',
                                title: '傳票摘要代碼更正交易'
                            }]
                        }, {
                            type: 'folder',
                            title: '73-會計日結系統(AG)',
                            children: [{
                                type: 'file',
                                txn: '732150',
                                title: '分行關帳及關帳解除'
                            }, {
                                type: 'file',
                                txn: '732151',
                                title: '庫存現金科目維護交易'
                            }, {
                                type: 'file',
                                txn: '732152',
                                title: '外接及未整合系統結帳資料查詢'
                            }, {
                                type: 'file',
                                txn: '732250',
                                title: '各項資產評估分析資料維護'
                            }, {
                                type: 'file',
                                txn: '732252',
                                title: '各項資產評估分析資料覆核'
                            }, {
                                type: 'file',
                                txn: '732253',
                                title: '各項資產評估分析列印'
                            }, {
                                type: 'file',
                                txn: '732254',
                                title: '各項資產提撥比率維護'
                            }, {
                                type: 'file',
                                txn: '732256',
                                title: '各項資產提撥分析表列印'
                            }, {
                                type: 'file',
                                txn: '732257',
                                title: '備抵呆帳╱保證責任準備科子目維護'
                            }, {
                                type: 'file',
                                txn: '732258',
                                title: '不需作備抵呆帳╱不良資產評估分行維護'
                            }, {
                                type: 'file',
                                txn: '732262',
                                title: '不良其他資產及或有項目評估報表查詢'
                            }, {
                                type: 'file',
                                txn: '732263',
                                title: '各項評估項目覆確認╱確認取消'
                            }]
                        }, {
                            type: 'folder',
                            title: '75-存放同業系統',
                            children: [{
                                type: 'file',
                                txn: '750150',
                                title: '存放同業帳戶－新開戶'
                            }, {
                                type: 'file',
                                txn: '750210',
                                title: '存放同業帳戶－現金存入'
                            }, {
                                type: 'file',
                                txn: '750220',
                                title: '存放同業帳戶－轉帳存入'
                            }, {
                                type: 'file',
                                txn: '750310',
                                title: '存放同業帳戶－現金支付'
                            }, {
                                type: 'file',
                                txn: '750320',
                                title: '存放同業帳戶－轉帳支付'
                            }, {
                                type: 'file',
                                txn: '750420',
                                title: '存放同業帳戶－結清'
                            }, {
                                type: 'file',
                                txn: '751150',
                                title: '存放同業基本資料維護'
                            }, {
                                type: 'file',
                                txn: '751151',
                                title: '存放同業主檔內容維護'
                            }, {
                                type: 'file',
                                txn: '751152',
                                title: '央行電腦代碼資料維護'
                            }, {
                                type: 'file',
                                txn: '751160',
                                title: '領用票據維護'
                            }, {
                                type: 'file',
                                txn: '751161',
                                title: '存放同業交易明細票據號碼維護'
                            }, {
                                type: 'file',
                                txn: '751162',
                                title: '存放同業交易明細票況更新'
                            }]
                        }, {
                            type: 'folder',
                            title: '77-海外分行(AO)',
                            children: [{
                                type: 'file',
                                txn: '772150',
                                title: '海外分行資料查詢／確認／確認解除'
                            }, {
                                type: 'file',
                                txn: '772151',
                                title: '海外分行調帳資料登錄'
                            }, {
                                type: 'file',
                                txn: '772152',
                                title: '海外分行調帳資料確認／確認解除'
                            }, {
                                type: 'file',
                                txn: '772154',
                                title: '海外分行資料查詢／確認／確認解除'
                            }, {
                                type: 'file',
                                txn: '772550',
                                title: '總帳與子細目檢核'
                            }, {
                                type: 'file',
                                txn: '772560',
                                title: '海外分行科子細目轉換'
                            }, {
                                type: 'file',
                                txn: '772650',
                                title: '海外分行資料查詢列印'
                            }, {
                                type: 'file',
                                txn: '772652',
                                title: '海外分行資料調帳查詢列印'
                            }, {
                                type: 'file',
                                txn: '772654',
                                title: '海外分行資料調帳查詢列印'
                            }]
                        }, {
                            type: 'folder',
                            title: '79-會計查詢(AI)',
                            children: [{
                                type: 'file',
                                txn: '792550',
                                title: '科子細目總帳查詢'
                            }, {
                                type: 'file',
                                txn: '792551',
                                title: '科目餘額表查詢'
                            }, {
                                type: 'file',
                                txn: '792552',
                                title: '會計科子細目積數及平均餘額查詢'
                            }, {
                                type: 'file',
                                txn: '792553',
                                title: '各月份損益資料查詢'
                            }, {
                                type: 'file',
                                txn: '792554',
                                title: '資產負債平均餘額比較查詢'
                            }, {
                                type: 'file',
                                txn: '792555',
                                title: '損益科目發生數比較查詢'
                            }, {
                                type: 'file',
                                txn: '792558',
                                title: '國外負債餘額表資料查詢'
                            }, {
                                type: 'file',
                                txn: '792559',
                                title: '各科子目均額及發生數增減分析'
                            }, {
                                type: 'file',
                                txn: '792561',
                                title: '各營業單位存款科目餘額查詢'
                            }, {
                                type: 'file',
                                txn: '792563',
                                title: '各營業單位放款科目餘額查詢'
                            }, {
                                type: 'file',
                                txn: '792564',
                                title: '會計月報表列印'
                            }]
                        }, {
                            type: 'folder',
                            title: '80-中心轉帳',
                            children: [{
                                type: 'file',
                                txn: '802002',
                                title: '中心轉帳作業狀態查詢'
                            }, {
                                type: 'file',
                                txn: '802003',
                                title: '中心轉帳失敗明細查詢／列印'
                            }]
                        }, {
                            type: 'folder',
                            title: '82-託收交換系統',
                            children: [{
                                type: 'file',
                                txn: '820951',
                                title: '託收票據撤票'
                            }, {
                                type: 'file',
                                txn: '820952',
                                title: '託收票據覆核'
                            }, {
                                type: 'file',
                                txn: '820953',
                                title: '次交票提出鎖定'
                            }, {
                                type: 'file',
                                txn: '820954',
                                title: '本交票提出確認'
                            }, {
                                type: 'file',
                                txn: '820955',
                                title: '託收票據追加出庫'
                            }, {
                                type: 'file',
                                txn: '820956',
                                title: '提送已出庫外埠票'
                            }]
                        }, {
                            type: 'folder',
                            title: '85-語音系統',
                            children: [{
                                type: 'file',
                                txn: '852150',
                                title: '語音約定申請維護'
                            }, {
                                type: 'file',
                                txn: '852151',
                                title: '語音約定轉帳維護'
                            }, {
                                type: 'file',
                                txn: '852152',
                                title: '語音通知資料篩選'
                            }, {
                                type: 'file',
                                txn: '852153',
                                title: '語音通知資料查詢'
                            }, {
                                type: 'file',
                                txn: '852160',
                                title: '語音密碼服務'
                            }, {
                                type: 'file',
                                txn: '852161',
                                title: '語音音檔服務'
                            }, {
                                type: 'file',
                                txn: '852162',
                                title: '電話銀行申請—列印失敗重製密碼單'
                            }]
                        }, {
                            type: 'folder',
                            title: '88-國庫收支系統',
                            children: [{
                                type: 'file',
                                txn: '881160',
                                title: '國稅收支央行帳查詢'
                            }, {
                                type: 'file',
                                txn: '881161',
                                title: '國庫收支央行帳查詢'
                            }, {
                                type: 'file',
                                txn: '881162',
                                title: '全行試算結帳－國稅收支本行帳'
                            }, {
                                type: 'file',
                                txn: '881163',
                                title: '全行試算結帳－國庫收支本行帳'
                            }, {
                                type: 'file',
                                txn: '881999',
                                title: '國庫收支支票兌付沖正'
                            }, {
                                type: 'file',
                                txn: '882151',
                                title: '國庫收支－支票兌付'
                            }, {
                                type: 'file',
                                txn: '882153',
                                title: '國庫收支經收款項'
                            }]
                        }];



                        $scope.treeRoot = {
                            title: 'root',
                            type: 'folder',
                            children: $scope.tree,
                            isRoot: true
                        };

                        cbTreeViewService.travel($scope.treeRoot, function(el, parent) {
                            cbTreeViewService.obtainEl(el, parent);
                        });


                        // var local = {};
                        // angular.extend($scope, {
                        //     wksData: undefined,
                        //     oldWksData: undefined,
                        //     lastSelected: undefined,
                        //     saveTree: function() {
                        //         if (local.autoSavePromise) {
                        //             return;
                        //         }
                        //         local.autoSavePromise = $timeout(
                        //             function() {
                        //                 $scope.$emit('modifyed.tree', {
                        //                     tree: $scope.treeRoot.children
                        //                 });
                        //                 local.autoSavePromise = undefined;
                        //             }, 0);
                        //     },
                        //     getTree: function() {
                        //         return $scope.treeRoot.children;
                        //     },
                        //     initRoot: function() {
                        //         $scope.treeRoot = {
                        //             title: 'root',
                        //             type: 'folder',
                        //             children: [],
                        //             isRoot: true
                        //         };
                        //         $scope.treeRoot.saveTree = $scope.saveTree;
                        //         $scope.treeRoot.getTree = $scope.getTree;

                        //         $scope.treeRootArray = [$scope.treeRoot];
                        //         treeViewService.obtainEl($scope.treeRoot, undefined, {
                        //             saveTree: $scope.saveTree,
                        //             getTree: $scope.getTree
                        //         });
                        //         return $scope.treeRoot;
                        //     }
                        // });



                        // //method
                        $scope.$on('select.tree', function(event, data) {
                            var sourceEl = data.el;
                            var multi = data.metaKey;
                            var edit = data.edit;
                            $scope.lastSelected = undefined;
                            // $scope.treeRoot.selected = sourceEl === $scope.treeRoot
                            // $scope.treeRoot.selected && ($scope.lastSelected = sourceEl)
                            cbTreeViewService.travel($scope.treeRoot, function(el) {
                                if ((el === sourceEl)) {
                                    el.selected = true;
                                    $scope.lastSelected = el;
                                    // angular.forEach(el.getParents(), function(prent) {
                                    //     prent.open = true;
                                    // });
                                } else if (!multi) {
                                    el.selected = false;
                                }
                            });
                        });

                        // //register auto Save event
                        // angular.forEach(['remove.tree' /*, 'dragEnd.tree'*/ , 'modifyNode.tree'], function(value, key) {

                        //     (function(ev) {
                        //         $scope.$on(ev, function(event, data) {
                        //             $scope.saveTree();
                        //         });
                        //     })(value);
                        // });



                        // $scope.$on('remove.tree', function() {
                        //     $scope.$emit("select.tree", {
                        //         data: $scope.treeRoot
                        //     });
                        // });


                        // var filterTimeout;
                        // $scope.$watch("ft", function() {
                        //     $timeout.cancel(filterTimeout);
                        //     filterTimeout = $timeout(function() {
                        //         $scope.lazyTreeFilter = $scope.ft;
                        //         ftt($scope.treeRoot, $scope.ft);
                        //     }, 1000);

                        // });

                        // function ftt(sEl, ft) {
                        //     sEl.match = false;
                        //     if (sEl.type === 'folder') {
                        //         if (sEl.children && sEl.children.length) {
                        //             angular.forEach(sEl.children, function(el) {
                        //                 if (ftt(el, ft) || !ft) {
                        //                     sEl.match = true;
                        //                 } else {
                        //                     sEl.match = sEl.match || !!sEl.title.match(new RegExp(ft, 'gi'));
                        //                 }
                        //             });
                        //         } else {
                        //             sEl.match = !!sEl.title.match(new RegExp(ft, 'gi'));
                        //         }
                        //     } else {
                        //         sEl.match = !ft || !!sEl.title.match(new RegExp(ft, 'gi'));
                        //     }
                        //     return sEl.match;
                        // }




                        // iElm.on('click', function(event) {
                        //     iElm.focus();
                        // });

                        var kbSelectTimeout;

                        var gotoPrevious = function(parent, el, source) {
                            var idx = parent.children.indexOf(el);
                            var isMove = false;
                            if (el === source) {
                                idx--;
                            }
                            for (var i = idx; i >= 0; i--) {
                                var cEl = parent.children[i];
                                //if (cEl.type === 'folder' && cEl.match) {
                                var findEl = findLastChildren(cEl, source);
                                if (findEl !== source) {
                                    parent.selected = false;
                                    $scope.lastSelected.selected = false;
                                    $scope.lastSelected = findEl;
                                    $scope.lastSelected.selected = true;

                                    $timeout.cancel(kbSelectTimeout);
                                    kbSelectTimeout = $timeout(function() {
                                        $scope.$emit('select.tree', {
                                            el: $scope.lastSelected
                                        });
                                    }, 50);
                                    isMove = true;
                                    break;
                                }
                                //}
                            }
                            if (!isMove) {
                                if (!parent.isRoot && parent.getParent()) {
                                    gotoPrevious(parent.getParent(), parent, source);
                                }
                                // else if (parent.isRoot) {
                                //     $scope.lastSelected.selected = false;
                                //     $scope.lastSelected = parent;
                                //     $scope.lastSelected.selected = true;
                                //     $timeout.cancel(kbSelectTimeout);
                                //     kbSelectTimeout = $timeout(function() {
                                //         $scope.$emit('select.tree', {
                                //             el: $scope.lastSelected
                                //         });
                                //     }, 50);
                                // }
                            }

                            function findLastChildren(el, source) {
                                if (!el.open || !el.children || el.children.indexOf(source) >= 0) {
                                    return el;
                                }
                                var resEl = el;
                                for (var i = el.children.length - 1; i >= 0; i--) {
                                    var cEl = el.children[i];
                                    //if (cEl.type === 'folder' && cEl.match) {
                                    return findLastChildren(cEl, source);
                                    //}
                                }
                                return resEl;
                            }
                        }
                        var gotoNext = function(parent, el) {
                            var idx = parent.children.indexOf(el);
                            var isMove = false;
                            for (var i = (idx + 1); i < parent.children.length; i++) {
                                var cEl = parent.children[i];
                                //if (cEl.type === 'folder' && cEl.match) {
                                parent.selected = false;
                                $scope.lastSelected.selected = false;
                                $scope.lastSelected = cEl;
                                $scope.lastSelected.selected = true;

                                $timeout.cancel(kbSelectTimeout);
                                kbSelectTimeout = $timeout(function() {
                                    $scope.$emit('select.tree', {
                                        el: $scope.lastSelected
                                    });
                                }, 50);

                                isMove = true;
                                break;
                                //}
                            }
                            if (!isMove) {
                                if (!parent.isRoot && parent.getParent()) {
                                    gotoNext(parent.getParent(), parent);
                                }
                            }
                        };

                        var cacheKeys = [37, 38, 39, 40, 13];

                        iElm.on('keydown', function(event) {
                            if (cacheKeys.indexOf(event.which) != -1 && $scope.lastSelected) {
                                event.stopPropagation();
                                event.preventDefault();
                                var sEl = $scope.lastSelected;
                                $scope.$apply(function() {
                                    switch (event.which) {
                                        case 37:
                                            if (sEl.open) {
                                                sEl.open = false;
                                            }
                                            break;
                                        case 38:
                                            if (!sEl.isRoot) {
                                                gotoPrevious(sEl.getParent(), sEl, sEl);
                                            }
                                            break;
                                        case 39:
                                            if (!sEl.open) {
                                                sEl.open = true;
                                            }
                                            break;
                                        case 40:
                                            if (sEl.open && sEl.hasSubData() || sEl.isRoot) {
                                                gotoNext(sEl, sEl);
                                            } else {
                                                gotoNext(sEl.getParent(), sEl);
                                            }
                                            break;
                                        case 13:
                                            console.log("SSS")
                                            if ($scope.lastSelected && $scope.lastSelected.selected) {
                                                $scope.$emit("dblClick.tree", {
                                                    el: $scope.lastSelected
                                                });
                                            }
                                    }
                                });
                                return false;
                            }

                        });

                        // $scope.$on('addRoot.tree', function(event, data) {
                        //     var msg = treeViewService.moveCheck(data.addEl, $scope.treeRoot, 'i');
                        //     if (msg !== true) {
                        //         $scope.$emit('broadcast', {
                        //             event: 'message.notify',
                        //             message: msg,
                        //             key: "addFolder"
                        //         });
                        //         return false;
                        //     }
                        //     treeViewService.addNode($scope.treeRoot, data.addEl);
                        //     data.done && data.done();
                        // });

                        // $scope.$on('dragEnd.tree', function() {
                        //     $scope.$broadcast('clearDrag');
                        // });


                        // iElm
                        //     .bind('click.tree', function(e) {
                        //         if (e.traget === iElm[0]) {
                        //             $scope.$apply(function() {
                        //                 treeViewService.travel($scope.treeRoot, function(el) {
                        //                     el.selected = false;
                        //                 });
                        //                 $scope.$emit('select.tree', {
                        //                     el: undefined
                        //                 });
                        //             });

                        //         }
                        //     });

                        // $scope.$watch('tree', function(val) {
                        //     $scope.initRoot();
                        //     if (val) {
                        //         $scope.treeRoot.children = angular.copy(angular.isArray(val) ? val : [val]);

                        //         if ($scope.illegalTree && $scope.illegalTree.length) {
                        //             $scope.treeRoot.children.push({
                        //                 title: "illegalData",
                        //                 type: 'folder',
                        //                 children: angular.copy(angular.isArray($scope.illegalTree) ? $scope.illegalTree : [$scope.illegalTree])
                        //             });
                        //         }
                        //         //add autofocus root
                        //         if (!$scope.defaultPath) {
                        //             $scope.$emit("select.tree", {
                        //                 el: $scope.treeRoot,
                        //                 first: true
                        //             });
                        //         }
                        //     } else {
                        //         $scope.treeRoot.children = [];
                        //     }
                        //     $scope.treeRoot.title = $scope.title || '';
                        //     treeViewService.travel($scope.treeRoot, function(el, parent) {
                        //         treeViewService.obtainEl(el, parent);
                        //     });

                        //     //order
                        //     treeViewService.orderChildren($scope.treeRoot, true);
                        //     //prepare open folder
                        //     var opened = {};
                        //     if ($scope.uuid && localStorageService.isSupported) {
                        //         var sTree = localStorageService.get($scope.uuid);
                        //         treeViewService.travel(sTree, function(el, parent) {
                        //             var isOpen = el.open;
                        //             treeViewService.obtainEl(el, parent);
                        //             if (isOpen) {
                        //                 opened[el.getPath(true, false).join(">")] = true;
                        //             }
                        //         })
                        //     }


                        //     treeViewService.travel($scope.treeRoot, function(el, parent) {
                        //         if (el.type == 'folder') {
                        //             treeViewService.orderChildren(el);
                        //             var realPath = el.getPath(true, true);
                        //             var checkOpenPath = realPath.slice(1);
                        //             if (realPath.join(">") == $scope.defaultPath) {
                        //                 $scope.$emit('select.tree', {
                        //                     el: el
                        //                 });
                        //             }

                        //             if (opened[checkOpenPath.join(">")]) {
                        //                 el.open = true;
                        //             }

                        //         }
                        //     });
                        //     angular.forEach(['remove.tree', 'modifyNode.tree', 'toggleFolder', 'select.tree'], function(value, key) {
                        //         (function(ev) {
                        //             $scope.$on(ev, function(event, data) {
                        //                 if ($scope.uuid && localStorageService.isSupported) {
                        //                     if (ev == 'select.tree') {
                        //                         if (data.el.type != 'folder') {
                        //                             return;
                        //                         }
                        //                     }
                        //                     $scope.treeRoot.tt = new Date().getTime();
                        //                     localStorageService.set($scope.uuid, $scope.treeRoot);
                        //                 }
                        //             });
                        //         })(value);

                        //     });
                        // });

                        // //change title 
                        // $scope.$watch('title', function(v) {
                        //     $scope.treeRoot && ($scope.treeRoot.title = v);
                        // });

                        $scope.$watch("lastSelected", function(v) {
                            // add retry times
                            var times = 0;
                            $timeout(function focusSelected() {
                                var activeEl = iElm.find('li > a.actived');
                                if (activeEl.size()) {
                                    // refrenence to selectize.js
                                    var height_menu = iElm.height();
                                    var height_item = activeEl.outerHeight(true);
                                    var scroll = iElm.scrollTop() || 0;
                                    var y = activeEl.offset().top - iElm.offset().top + scroll;
                                    var scroll_top = y;
                                    var scroll_bottom = y - height_menu + height_item;
                                    if (y + height_item > height_menu + scroll) {
                                        iElm.scrollTop(scroll_bottom);
                                    } else if (y < scroll) {
                                        iElm.scrollTop(scroll_top - 10);
                                    }

                                } else if (times < 10) {
                                    times++;
                                    $timeout(focusSelected, 500)
                                }
                            }, 60);
                        });
                        // //remove old toggle cache
                        // var keys = localStorageService.keys();
                        // if (keys.length > 10) {
                        //     var oldKey = keys[0];
                        //     var oldTime = localStorageService.get(oldKey).tt;
                        //     angular.forEach(localStorageService.keys(), function(key) {
                        //         var tree = localStorageService.get(key);
                        //         if (oldTime > tree.tt) {
                        //             oldKey = key;
                        //             oldTime = tree.tt;
                        //         }
                        //     });
                        //     localStorageService.remove(oldKey);
                        // }

                    }
                }
            }
        ])
        .directive('cbTreeViewList', ['$parse', 'cabinModulePath',
            function($parse, cabinModulePath) {
                return {
                    priority: 50,
                    templateUrl: cabinModulePath + 'directives/cabin-treeView/templates/treeViewList.html',
                    scope: {
                        'els': '=cbTreeViewList',
                        'parent': '=parent',
                        'index': '=index',
                        'ft': "=treeFilter"
                    },
                    restrict: 'EA',
                    link: function($scope, iElm, iAttrs, controller) {
                        //     var els = $scope.els;
                        //     angular.extend($scope, {
                        //         'liChecker': function(el) {
                        //             if (el.match) {
                        //                 el.open = true
                        //             }
                        //             return {
                        //                 'open': !!el.open
                        //             };
                        //         },
                        //         'filterFolder': function(el, ft) {
                        //             return el.type === 'folder';
                        //         }
                        //     });

                        //     //init/setup el data
                        //     angular.forEach(els, function(el, index) {
                        //         // init focus
                        //         if (el.focus) {
                        //             $scope.$emit('select.tree', {
                        //                 el: $scope.parent
                        //             });
                        //         }
                        //     });

                        //     $scope.$on('close.tree', function() {
                        //         angular.forEach(els, function(el, key) {
                        //             if (el.type === 'folder') {
                        //                 el.open = false;
                        //             }
                        //         });
                        //     });
                    }
                };
            }
        ]).directive('cbTreeViewNode', ['$compile', 'cabinModulePath', '$timeout',
            function($compile, cabinModulePath, $timeout) {
                return {
                    restrict: 'A',
                    templateUrl: cabinModulePath + 'directives/cabin-treeView/templates/treeViewNode.html',
                    scope: {
                        'el': '=cbTreeViewNode',
                        // 'ft': '=treeFilter'
                    },
                    replace: true,
                    link: function($scope, iElm, iAttrs, controller) {
                        // var el = $scope.el;
                        // var nodeGroup = iElm.find('.node-group')[0];
                        // var field = iElm.find('.node').focus();
                        // var originalValue = '';


                        angular.extend($scope, {
                            'toggleFolder': function($event, el) {
                                el.open = !el.open;
                                $event.stopPropagation();
                                $event.preventDefault();
                                // if (!(el.open = !el.open)) {
                                //     $scope.$parent.$broadcast('close.tree');
                                // }

                                //$scope.$emit("toggleFolder");
                            },
                            'selectNode': function($event, el) {
                                //el.type == 'file' && 
                                $scope.$emit('select.tree', {
                                    el: el,
                                    action: !el.selected
                                        //,metaKey: $event.metaKey
                                });
                            },
                            cblClickNode: function($event, el) {
                                    $scope.$emit("dblClick.tree", {
                                        el: el
                                    });
                                }
                                //, 
                                //     'iconChecker': function() {
                                //         var hasSubFolder = el.hasSubFolder && el.hasSubFolder() || false;
                                //         return {
                                //             'icon-folder': el.type === 'folder',
                                //             'icon-doc': el.type === 'doc',
                                //             'icon-has-sub': hasSubFolder,
                                //             //'icon-no-sub': !hasSubFolder,
                                //             'open': el.open
                                //         };
                                //     },
                                //     'hasChildrenFolder': function(el) {
                                //         return el.children && el.children.length && (function() {
                                //             for (var idx in el.children) {
                                //                 if (el.children[idx].type === 'folder') {
                                //                     return true;
                                //                 }
                                //             }
                                //             return false;
                                //         })();
                                //     },
                                //     'iconChecker2': function() {
                                //         var hasSubFolder = el.hasSubFolder && el.hasSubFolder() || false;
                                //         return {
                                //             'fa-folder': !el.open,
                                //             'fa-folder-open': el.open
                                //         };
                                //     },


                            //     'nodeChecker': function() {
                            //         return {
                            //             'selected': !!el.selected,
                            //             'edit': !!el.edit
                            //         };
                            //     },
                            //     'addFolder': function() {
                            //         el.open = true;
                            //         var newNode = treeViewService.addNode(el, {
                            //             'type': 'folder'
                            //         });
                            //         $scope.$emit('select.tree', {
                            //             el: newNode,
                            //             edit: true
                            //         });

                            //     },
                            //     'addDoc': function() {
                            //         treeViewService.addNode(el, {
                            //             'type': 'doc'
                            //         });
                            //     },
                            //     'edit': function() {
                            //         originalValue = el.title;
                            //         el.edit = true;
                            //         $timeout(function() {
                            //             field.focus();
                            //         }, 45);
                            //     },
                            //     'unEdit': function() {
                            //         el.edit = false;
                            //     },
                            //     'remove': function() {
                            //         el.removeByParent();
                            //         $scope.$emit('remove.tree', {
                            //             el: el
                            //         });
                            //     },
                            //     'at': ''
                        });

                        // $scope.$on('addFolder.tree', function(event, data) {
                        //     if (event.defaultPrevented) {
                        //         return;
                        //     }
                        //     if (el === data.el && el.selected) {
                        //         var msg = treeViewService.moveCheck(data.addEl, el, 'i');
                        //         if (msg !== true) {
                        //             $scope.$emit('broadcast', {
                        //                 event: 'message.notify',
                        //                 message: msg,
                        //                 key: "addFolder"
                        //             });
                        //             return false;
                        //         }
                        //         treeViewService.addNode(el, data.addEl);
                        //         data.done && data.done();
                        //     }
                        // });

                        // //for trigger select
                        // $scope.$on('focus.tree', function(event, data) {
                        //     if (data.el === el) {
                        //         $scope.$emit('select.tree', {
                        //             el: el
                        //         });
                        //     }
                        // });

                        // $scope.$on('clearDrag', function() {
                        //     $scope.at = '';
                        // });

                        // iElm.find('.node-group').on('dragenter', function(e) {
                        //     if (e.preventDefault) {
                        //         e.preventDefault();
                        //     }
                        // }).on('dragleave', function(e) {
                        //     iElm.removeClass('before after inner');
                        //     $scope.at = '';
                        // }).on('drop', function(e) {
                        //     if (e.preventDefault) {
                        //         e.preventDefault();
                        //     }

                        //     if (e.stopPropogation) {
                        //         e.stopPropogation();
                        //     }
                        //     $scope.$apply(function() {
                        //         if ($scope.at && treeViewService.drop(el, $scope.at, $scope) === true) {
                        //             $scope.$emit('drop.tree', {
                        //                 el: el
                        //             });
                        //             $scope.$emit('dragEnd.tree');
                        //         }
                        //         iElm.removeClass('before after inner');
                        //     });
                        //     return false;
                        // }).on('dragstart', function(e) {
                        //     treeViewService.dragStart([el], $scope);
                        //     $scope.$apply(function() {
                        //         $scope.$emit('dragStart.tree', {
                        //             el: [el]
                        //         });
                        //     });
                        //     e.originalEvent.dataTransfer.setDragImage(nodeGroup, 0, 0);
                        // }).on('dragover', function(e) {
                        //     if (!$scope.dropable) {
                        //         return false;
                        //     }
                        //     var _el = angular.element(this);
                        //     var position = e.originalEvent.pageY - _el.offset().top;
                        //     var elHight = _el.height();
                        //     var before = elHight / 3;
                        //     var center = before * 2;
                        //     var insertTo = '';
                        //     iElm.removeClass('before after inner');
                        //     // default always insert
                        //     //if (el.isRoot) {
                        //     insertTo = 'i';
                        //     // } else {
                        //     //     if (position < before) {
                        //     //         insertTo = 'b';
                        //     //     } else if (position < center) {
                        //     //         insertTo = 'i';
                        //     //     } else if (position <= elHight) {
                        //     //         insertTo = 'a';
                        //     //     }
                        //     // }
                        //     var msg = treeViewService.moveCheck(el, insertTo);
                        //     $scope.at = '';
                        //     if (msg === true || msg === 1) {
                        //         switch (insertTo) {
                        //             case 'b':
                        //                 iElm.addClass('before');
                        //                 break;
                        //             case 'i':
                        //                 iElm.addClass('inner');
                        //                 break;
                        //             case 'a':
                        //                 iElm.addClass('after');
                        //                 break;
                        //         }
                        //         $scope.at = insertTo;
                        //     }
                        //     if (msg !== true && msg !== 1 && msg !== 'self') {
                        //         $scope.$emit('broadcast', {
                        //             event: 'message.notify',
                        //             message: msg,
                        //             key: "dragover",
                        //             replace: true,
                        //             delay: 400
                        //         });
                        //     }
                        //     if (e.preventDefault) {
                        //         e.preventDefault();
                        //     }

                        //     return false;
                        // });
                    }
                }
            }
        ]).directive('cbSubTreeView', ['$compile', '$timeout',
            function($compile, $timeout) {
                return {
                    restrict: 'A',
                    scope: {
                        'el': '=cbSubTreeView',
                        'ft': '=treeFilter'
                    },
                    link: function($scope, iElm, iAttrs, controller) {
                        $scope.$watchCollection('el.children', function(v) {
                            if (v && v.length && !iElm.children('ul').size()) {
                                var sub = angular.element('<ul cb-tree-view-list="el.children" parent="el" tree-filter="ft" ></ul>');
                                iElm.append(sub);
                                $timeout(function() {
                                    $compile(sub)($scope);
                                }, 1);

                            }
                        });


                    }
                }
            }
        ]).service('cbTreeViewService', ['$filter', '$timeout',
            function($filter, $timeout) {
                var method = {
                    'getParent': function(el) {
                        return el.getParent();
                    },
                    'getParents': function(el) {
                        return el.getParents();
                    },
                    'obtainEl': function(el, parent, $treeRootScope) {
                        var serv = this;
                        if (!el.isRoot) {
                            el = angular.extend(el, {
                                'isOwner': parent && parent.isOwner,
                                'saveTree': parent && parent.saveTree,
                                'getTree': parent && parent.getTree,
                                // 'isTemp': el.title.toLowerCase() === 'temp' && parent && parent.isRoot || (parent && parent.getParents(true)[1] && parent.getParents(true)[1].title.toLowerCase() === 'temp'),
                            });
                        }

                        // slef Method attribute;
                        el = angular.extend(el, {
                            '$treeRootScope': parent && parent.$treeRootScope || $treeRootScope,
                            //'title': el.title || 'new',
                            'title': el.title || '',
                            'open': false,
                            'getParent': function() {
                                return parent;
                            },
                            'getParents': function(withSelf, withRoot) {
                                var parents = [];
                                if (withSelf) {
                                    parents.push(el);
                                }
                                var _el = el;
                                while (_el.getParent && (_el = _el.getParent())) {
                                    parents.push(_el);
                                }
                                parents = parents.reverse()
                                if (withRoot === false) {
                                    parents.shift();
                                }
                                return parents;
                            },
                            'getPath': function(andSelf, andRoot) {
                                var path = [];
                                angular.forEach(el.getParents(), function(e) {
                                    path.push(e.title);
                                });
                                if (!andRoot) {
                                    path.shift();
                                }
                                if (andSelf) {
                                    path.push(el.title);
                                }
                                return path;

                            },
                            'getIndex': function() {
                                return el.getParent().children.indexOf(el);
                            },
                            'removeByParent': function() {
                                el.selected = false;
                                return el.getParent().children.splice(el.getIndex(), 1);
                            }
                        });
                        // service Method
                        el = angular.extend(el, {
                            'addNode': function(data) {
                                return serv.addNode(this, data);
                            },
                            'hasSubFolder': function() {
                                return serv.hasSubFolder(this);
                            },
                            'hasSubData': function() {
                                return serv.hasSubData(this);
                            }
                        });

                        //fix children empty error
                        if (el.type === 'folder' && !el.children) {
                            el.children = [];
                        }
                        return el;
                    },
                    'hasSubFolder': function(el) {
                        if (el.children) {
                            for (var i = 0; i < el.children.length; i++) {
                                if (el.children[i].type === 'folder') {
                                    return true;
                                }
                            }
                        }
                        return false;
                    },
                    'hasSubData': function(el) {
                        return el.children && !!el.children.length || false;
                    },
                    'travel': function(el, callback) {
                        var _this = this;
                        el && angular.forEach(el.children || [], function(_el) {
                            callback(_el, el);
                            if (_el.children && _el.children.length) {
                                _this.travel(_el, callback);
                            }
                        });
                    },
                    orderChildren: function(el, isRoot) {
                        if (el.type == 'folder') {
                            var folders = [],
                                documents = [],
                                rootFolder = [];
                            angular.forEach(el.children, function(e) {
                                if (e.type == 'doc') {
                                    documents.push(e);
                                } else {
                                    if (isRoot && e.title == 'readItLater') {
                                        rootFolder = [e];
                                    } else {
                                        folders.push(e);
                                    }
                                }
                            });
                            folders = $filter('orderBy')(folders, 'title');
                            documents = $filter('orderBy')(documents, 'title');
                            el.children.splice(0, el.children.length);
                            angular.forEach(rootFolder.concat(folders.concat(documents)), function(ee) {
                                el.children.push(ee);
                            });
                        }
                        return el;
                    }
                };
                return method;
            }
        ]);;
});
