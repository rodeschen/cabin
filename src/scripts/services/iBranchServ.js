'use strict';
define(['cabin'], function(cabin) {
    return ['service', 'iBranchServ', ['$rootScope', '$http', '$q', '$injector', '$timeout', 'cbDeviceAgentSrv', '$filter',
        function($rootScope, $http, $q, $injector, $timeout, cbDeviceAgentSrv, $filter) {
            //cbDeviceAgentSrv, cbSupeviseRequireModal
            var funcs = {
                send: function(txnId, data, headerData) {
                    var testOV = "N";
                    //remove empty data
                    for (var key in data) {
                        if (data[key] == "") {
                            delete data[key]
                        }
                    }

                    var sendData = angular.extend({
                        'txnId': txnId,
                        'txnData': data || {
                            'txnId': txnId
                        }
                    }, headerData || {});
                    console.log("send TxndId" + txnId);
                    if (txnId == '120606') {
                        sendData.txnData.TESTOV = testOV;
                    }
                    var http = $http({
                        url: '/iBranchApp/json',
                        method: 'POST',
                        responseType: 'JSON',
                        headers: {
                            //'Content-Type': 'application/x-www-form-urlencoded'
                            'Content-Type': 'text/plain;charset=UTF-8'
                        },
                        data: angular.toJson(sendData) // $.param(sendData)
                    });

                    http.then(function(xhr) {
                        console.log(txnId, "response", xhr.data);
                        var respData = xhr.data;
                        funcs.txnSuccess(respData, sendData);
                    }, function(xhr) {
                        console.log(xhr.data)
                        funcs.sendMessage('error', txnId + " : " + xhr.data.txnMessage);
                        console.error("send " + txnId + " error :" + xhr.data.txnMessage);
                    });
                    return http;
                },
                sendMessage: function(type, message) {
                    console.log(message)
                    $rootScope.$broadcast('notify', {
                        event: 'notify',
                        type: type,
                        message: message
                    });
                },
                txnSuccess: function(respData, sendData) {
                    var status = respData.txnStatus;
                    var jobs = [];
                    if (respData.ACTIONCOUNT) {
                        for (var i = 0; i < respData.ACTIONCOUNT; i++) {
                            var job = respData['A' + i];
                            job.txnId = sendData.txnId;
                            jobs.push(job);
                        }
                    }
                    //append override jobs to end
                    if (status === '9') {
                        jobs.push({
                            txnId: sendData.txnId,
                            TYPE: 'SUP',
                            DATA: {
                                respData: respData,
                                sendData: sendData
                            }
                        });
                    }
                    if (status === '1') {
                        jobs.push({
                            txnId: sendData.txnId,
                            TYPE: 'MSG',
                            DATA: sendData.txnId == '0110' ? '簽入成功。' : '交易完成。'
                        });
                    }
                    funcs.executeJobs(jobs).finally(function() {
                        console.log("all jobs finish")
                    });
                },
                executeJobs: function(jobs) {
                    var defer = $q.defer();
                    if (jobs.length) {
                        var job = jobs.shift();
                        funcs.action(job).finally(function() {
                            if (jobs.length) {
                                funcs.executeJobs(jobs).finally(function() {
                                    defer.resolve();
                                });
                            } else {
                                defer.resolve();
                            }
                        });
                    } else {
                        defer.resolve();
                    }
                    return defer.promise;
                },
                action: function(job) {
                    var defer = $q.defer();
                    job.deferred = defer;
                    switch (job.TYPE) {
                        case 'POPUP':
                            console.log("sPOPUP");
                            var modal = $injector.get('cbCommonModal');
                            modal.activate({
                                message: job.DATA,
                                deferred: job.deferred,
                                buttons: [{
                                    name: '確定',
                                    type: 'primary',
                                    action: function() {
                                        modal.deactivate().finally(function() {
                                            defer.resolve();
                                        });
                                    }
                                }]
                            });
                            return defer.promise;
                            break;
                        case 'PB':
                            console.log("sPB");
                            break;
                        case 'WARN':
                            console.log("sWARN");
                            break;
                        case 'CONFIRM':
                            console.log("sCONFIRM");
                            var modal = $injector.get('cbCommonModal');
                            modal.activate({
                                message: "客戶有待辦事項，是否需要列印?",
                                deferred: job.deferred,
                                buttons: [{
                                    name: '列印',
                                    type: 'primary',
                                    action: function() {
                                        modal.deactivate()
                                        cbDeviceAgentSrv.print(job.DATA, true, job.PROMPT, job.txnId).then(function() {
                                            defer.resolve();
                                        });

                                    }
                                }, {
                                    name: '取消',
                                    type: 'danger',
                                    action: function() {
                                        modal.deactivate().finally(function() {
                                            defer.reject();
                                        });
                                    }
                                }]
                            });
                            return defer.promise;
                            //return cbDeviceAgentSrv.print(job.DATA, true, job.PROMPT, job.txnId);
                            break;
                        case 'FORM':
                            console.log("sFORM");
                            return cbDeviceAgentSrv.print(job.DATA, true, job.PROMPT, job.txnId);
                            break;
                        case 'MSR':
                            console.log("sMSR");
                            break;
                        case 'PDF':
                            console.log("sPDF");
                            return cbDeviceAgentSrv.printWebPrinter(job.DATA, job.PROMPT, job.txnId);
                            break;
                        case 'MSG':
                            funcs.sendMessage('normal', '[' + job.txnId + '] ' + job.DATA);
                            break;
                        case 'SUP':
                            console.log("sSUP");
                            var modal = $injector.get('cbSupeviseRequireModal');
                            console.log(job.DATA);
                            funcs.sendMessage('error', '[' + job.txnId + '] ' + '交易需主管授權；' +  job.DATA.respData.OVERRIDE_MSG);
                            modal.activate(job);
                            return defer.promise;
                            break;
                    }
                    $timeout(function() {
                        console.log(job.TYPE, "AAA", job);
                        defer.resolve();
                    }, 1000);
                    return defer.promise;
                },
                queryEjContext: function(ejSeq, buzDate) {
                    return funcs.send("ejcontext", {
                        'ejSeq': ejSeq,
                        'buzDate': (buzDate || $filter("date")(new Date(), "yyyy/MM/dd"))
                    });
                }

            };


            //pooling supevise query
            (function querySup() {
                if ($rootScope.user && $rootScope.user.userId) {
                    funcs.send("OVQUERY", {
                        userid: $rootScope.user.userId
                    }).then(function(xhr) {
                        var resData = xhr.data;
                        if (resData.OVDATA && resData.OVDATA.OVSTATUS == "1") {
                            $rootScope.hasOV = true;
                        } else {
                            $rootScope.hasOV = false;
                        }
                    }).finally(function() {
                        $timeout(querySup, 10000);
                    });
                } else {
                    $timeout(querySup, 10000);
                };

            }) //();
            return funcs;
        }
    ]];
});
