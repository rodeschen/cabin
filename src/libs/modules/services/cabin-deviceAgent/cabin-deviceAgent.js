'use strict';
define(['cabin'], function(cabin) {
    return ['service', 'cbDeviceAgentSrv', ['$rootScope', 'properties', '$q', '$timeout',
        function($rootScope, properties, $q, $timeout) {
            // var alias = {
            //     /* Methods from MnmMoMBean */
            //     "initXmlRpcService": "tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.initXmlRpcService",
            //     "setName": "tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.setName",
            //     "getName": "tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.getName",
            //     "getType": "tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.getType",
            //     "setType": "tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.setType",
            //     "getObjectName": "tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.getObjectName",
            //     "init": "tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.init",
            //     "getDomain": "tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.getDomain",
            //     "getId": "tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.getId",
            //     /* Methods from MnmMoServiceMBean */
            //     "start": "tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.start",
            //     "stop": "tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.stop",
            //     "isActive": "tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.isActive",
            //     "isAutoStart": "tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.isAutoStart",
            //     "setAutoStart": "tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.setAutoStart",
            //     /* Methods from DeviceServiceMBean */
            //     "getFreeSessions": "tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.getFreeSessions",
            //     "getBusySessions": "tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.getBusySessions",
            //     "getFailedSessions": "tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.getFailedSessions",
            //     "obtainSession": "tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.obtainSession",
            //     "returnSession": "tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.returnSession",
            //     "listSessions": "tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.listSessions",
            //     "isSearchingRemoteSessionsEnabled": "tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.isSearchingRemoteSessionsEnabled",
            //     "setSearchingRemoteSessionsEnabled": "tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.setSearchingRemoteSessionsEnabled",
            //     "getWaitForPermissionTimeout": "tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.getWaitForPermissionTimeout",
            //     "setWaitForPermissionTimeout": "tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.setWaitForPermissionTimeout",
            //     "getAutoAnswerPermission": "tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.getAutoAnswerPermission",
            //     "setAutoAnswerPermission": "tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.setAutoAnswerPermission",
            //     /* Methods from PbPrinterServiceMBean */
            //     "open": "tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.open",
            //     "close": "tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.close",
            //     "print": "tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.print",
            //     "encode": "tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.encode",
            //     "decode": "tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.decode",
            //     "abort": "tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.abort",
            //     "eject": "tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.eject",
            //     "waitForDocument": "tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.waitForDocument",
            //     "isDocumentPresented": "tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.isDocumentPresented",
            //     "isWaitForDocument": "tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.isWaitForDocument",
            //     "setWaitForDocument": "tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.setWaitForDocument",
            //     "isEjectUnexpectedDocument": "tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.isEjectUnexpectedDocument",
            //     "setEjectUnexpectedDocument": "tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.setEjectUnexpectedDocument",
            //     "isRemsFeature": "tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.isRemsFeature",
            //     "setRemsFeature": "tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.setRemsFeature"

            // }






            // $.xmlrpc("http://localhost:9920/nodeagent/xmlrpc", {
            //     'methodName': 'com.iisigroup.infinity.kernel.nodeagent.xmlrpc.NodeAgentXmlRpcService.invoke',
            //     'params': ["MNM:type=com.iisigroup.infinity.modules.dummyflowstart.DummyFlowStart,name=dummyFlowStart", "hello", ["ddd"],
            //         ["java.lang.String"]
            //     ],
            //     'success': function(data, request) {
            //         console.log(data);
            //     },
            //     'error': function() {
            //       console.log("Error")
            //     }
            // });
            var url = "http://10.204.1.63:9980/deviceagent/xmlrpc";
            // var url = "http://192.168.221.111:9980/deviceagent/xmlrpc";
            // var url = "http://192.168.221.129:9980/deviceagent/xmlrpc";
            // $.xmlrpc(url, {
            //     'methodName': 'tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.getObjectName',
            //     'params': [],
            //     'success': function(data, request) {
            //         $.xmlrpc(url, {
            //             'methodName': 'tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.obtainSession',
            //             'params': [],
            //             'success': function(data, request) {
            //                 $.xmlrpc(url, {
            //                     'methodName': 'tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.print',
            //                     'params': ["ibm9068session;rmi://127.0.0.1  4", "測asdfads試adsfadsf測asdfasdf試<ff>", "sssddd", "12", "5"],
            //                     'success': function(data, request) {
            //                         $.xmlrpc(url, {
            //                             'methodName': 'tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.returnSession',
            //                             'params': ["ibm9068session;rmi://127.0.0.1  4"],
            //                             'success': function(data, request) {
            //                                 console.log(data);
            //                             },
            //                             'error': function() {
            //                                 console.log("returnSession Error")
            //                             }
            //                         });
            //                     },
            //                     'error': function() {
            //                         console.log("print returnSessionError")
            //                     }
            //                 });
            //             },
            //             'error': function() {
            //                 console.log("obtainSession Error")
            //             }
            //         });
            //     },
            //     'error': function() {
            //         console.log("getObjectName Error")
            //     }
            // });

            // $.xmlrpc("http://mimic-xmlrpc.sourceforge.net/demos/calc.php", {
            //     'methodName': 'calc.minus',
            //     'params': ["1", "2"],
            //     'success': function(data, request) {
            //         console.log(data);
            //     },
            //     'error': function() {
            //         console.log("Error")
            //     }
            // });





            var methods = {
                initXmlRpcService: 'tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.initXmlRpcService',
                // no parm 
                getObjectName: 'tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.getObjectName',
                // no parm
                createService: 'com.iisigroup.infinity.kernel.nodeagent.xmlrpc.NodeAgentXmlRpcService.invoke',
                // parm ['random']
                obtainSession: 'tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.obtainSession',
                // no parm
                returnSession: 'tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.returnSession',
                // param ['sessionId','data','prompt','12','5']
                print: 'tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.print',
                // param ['sessionId']
                eject: 'tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.eject',
                // param ['sessionId',"",2,eject(true or false)]                
                decode: "tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.decode",
                // param ['sessionId',":20016801378622373500000054595000112340","",2,eject(true or false)]                
                encode: "tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.encode",
            };

            //create Service
            //var url = "http://10.204.1.63:9980/deviceagent/xmlrpc";
            // $.xmlrpc(url, {
            //     'methodName': methods.createService,
            //     'params': []
            // });


            // $.xmlrpc(url, {
            //     "methodName": methods.obtainSession //,
            //         //"params": params
            // })

            function deviceAction(action, params) {
                return $.xmlrpc(url, {
                    "methodName": action,
                    "params": params
                });
            }

            deviceAction(methods.initXmlRpcService, []).success(function(data) {
                deviceAction(methods.getObjectName, []).success(function(data) {

                });
            });


            var allAction = {
                print: function(printData, eject, prompt, prefix) {
                    var deferred = $q.defer();
                    //obtainSession
                    deviceAction(methods.obtainSession, []).success(function(data) {
                        allAction.sendMessage("normal", (prefix ? '[' + prefix + '] ' : "") + (prompt || "請放入紙張..."));
                        var sessionId = data;
                        //print
                        deviceAction(methods.print, [sessionId, printData, "", "12", "5"]).success(function() {
                            if (eject) {
                                allAction.sendMessage("normal", (prefix ? '[' + prefix + '] ' : "") + "列印中...");
                                //eject
                                deviceAction(methods.eject, [sessionId]).success(function() {
                                    //relase
                                    allAction.releaseSession(sessionId, deferred, "", prefix);
                                }).error(function(xhr) {
                                    console.log("deviceAgent returnSession error");
                                    deferred.reject("deviceAgent returnSession error");
                                    allAction.releaseSession(sessionId, deferred, "", prefix);
                                });
                            } else {
                                //relase
                                allAction.releaseSession(sessionId, deferred, "", prefix);
                            }
                        }).error(function(xhr) {
                            console.log("deviceAgent print error");
                            //relase
                            allAction.releaseSession(sessionId, deferred, "", prefix);
                            //deferred.reject("deviceAgent print error");
                        });
                    }).error(function(xhr) {
                        console.log("deviceAgent obtainSession error");
                        //relase
                        deferred.reject("deviceAgent obtainSession error");
                    });
                    return deferred.promise;
                },

                releaseSession: function(sessionId, deferred, data, prefix) {
                    //relase
                    deviceAction(methods.returnSession, [sessionId]).success(function() {
                        allAction.sendMessage("normal", (prefix ? '[' + prefix + '] ' : "") + "動作結束…");
                        return deferred.resolve(data || "ok");
                    }).error(function() {
                        console.log("deviceAgent returnSession error");
                        if (deferred) {
                            deferred.reject("deviceAgent returnSession error");
                        }
                    });
                },
                printWebPrinter: function(url) {
                    var deferred = $q.defer();
                    $timeout(function() {
                        deferred.resolve();
                    }, 2000);
                    return deferred.promise;
                },
                decode: function(eject, prompt, prefix) {
                    var deferred = $q.defer();
                    //obtainSession
                    deviceAction(methods.obtainSession, []).success(function(data) {
                        allAction.sendMessage("normal", (prefix ? '[' + prefix + '] ' : "") + (prompt || "請放入紙張..."));
                        var sessionId = data;
                        //decode
                        deviceAction(methods.decode, [sessionId, "", 2, eject]).success(function(data) {
                            console.log('decodeData', data)
                            //release
                            allAction.releaseSession(sessionId, deferred, data, prefix);
                        }).error(function(xhr) {
                            console.log("deviceAgent decode error");
                            deferred.reject("deviceAgent decode error");
                            //release
                            allAction.releaseSession(sessionId, deferred, "", prefix);
                        });
                    }).error(function(xhr) {
                        console.log("deviceAgent obtainSession error");
                        deferred.reject("deviceAgent obtainSession error");
                    });
                    return deferred.promise;
                },
                encode: function(writterData, eject, prompt, prefix) {
                    var deferred = $q.defer();
                    //obtainSession
                    deviceAction(methods.obtainSession, []).success(function(data) {
                        allAction.sendMessage("normal", (prefix ? '[' + prefix + '] ' : "") + (prompt || "請放入紙張..."));
                        var sessionId = data;
                        //encode
                        deviceAction(methods.encode, [sessionId, writterData, "", 2, eject]).success(function(data) {
                            console.log('decodeData', data)
                            //release
                            allAction.releaseSession(sessionId, deferred, data, prefix);
                        }).error(function(xhr) {
                            console.log("deviceAgent encode error");
                            deferred.reject("deviceAgent encode error");
                            //release
                            allAction.releaseSession(sessionId, deferred, "", prefix);
                        });
                    }).error(function(xhr) {
                        console.log("deviceAgent obtainSession error");
                        deferred.reject("deviceAgent obtainSession error");
                    });
                    return deferred.promise;
                },
                sendMessage: function(type, message) {
                    console.log(message)
                    $rootScope.$broadcast('notify', {
                        event: 'notify',
                        type: type,
                        message: message
                    });
                },
            };
            return allAction;
        }
    ]];
});
