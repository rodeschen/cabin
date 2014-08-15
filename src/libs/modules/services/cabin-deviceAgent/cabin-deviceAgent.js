'use strict';
define(['cabin'], function(cabin) {
    return ['service', 'cbDeviceAgentSrv', ['$rootScope', 'properties', '$q', '$timeout', 'cbCommonModal', '$document',
        function($rootScope, properties, $q, $timeout, cbCommonModal, $document) {
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
            //var url = "http://10.204.1.63:9980/deviceagent/xmlrpc";
            //var url = "http://127.0.0.1:9980/deviceagent/xmlrpc";
            var url = "http://" + properties.deviceAgentHost + "/deviceagent/xmlrpc";
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
                // param ['sessionId']                
                abort: "tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.abort"
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
                    console.log('devinceAgent get Object Success');
                }).error(function() {
                    console.error('devinceAgent get Object error');
                });
            }).error(function() {
                console.error('devinceAgent Init error');
            });

            var sessionId = null;
            var decode = false;
            var allAction = {
                modalId: null,
                print: function(printData, eject, prompt, prefix) {
                    var deferred = $q.defer();
                    //     var modal = null;;
                    //     //obtainSession
                    //     deviceAction(methods.obtainSession, []).success(function(data) {
                    //         modal = allAction.sendMessage("normal", (prefix ? '[' + prefix + '] ' : "") + (prompt || "請放入紙張..."), true);
                    //         sessionId = data;
                    //         //print
                    //         deviceAction(methods.print, [sessionId, printData, "", "12", "5"]).success(function() {
                    //             if (eject) {
                    //                 modal = allAction.sendMessage("normal", (prefix ? '[' + prefix + '] ' : "") + "列印中...", true);
                    //                 //eject
                    //                 deviceAction(methods.eject, [sessionId]).success(function() {
                    //                     //relase
                    //                     allAction.releaseSession(sessionId, deferred, "", prefix);
                    //                 }).error(function(xhr) {
                    //                     console.error("deviceAgent returnSession error");
                    //                     deferred.reject("deviceAgent returnSession error");
                    //                     allAction.releaseSession(sessionId, deferred, "", prefix);
                    //                 });
                    //                 decode = false;
                    //             } else {
                    //                 //relase
                    //                 allAction.releaseSession(sessionId, deferred, "", prefix);
                    //             }
                    //         }).error(function(xhr) {
                    //             //modal.deactivate();
                    //             console.error("deviceAgent print error");
                    //             //relase
                    //             allAction.releaseSession(sessionId, deferred, "", prefix);
                    //             //deferred.reject("deviceAgent print error");
                    //         });
                    //     }).error(function(xhr) {
                    //         cbCommonModal.deactivate();
                    //         console.error("deviceAgent obtainSession error");
                    //         //relase
                    //         deferred.reject("deviceAgent obtainSession error");
                    //     });
                    //for one demo
                    allAction.sendMessage("normal", (prefix ? '[' + prefix + '] ' : "") + (prompt || "請放入紙張..."), true);
                    $timeout(function(){
                      cbCommonModal.deactivate(allAction.modalId);
                      deferred.reject("deviceAgent obtainSession error");
                    },3000);
                    //cbCommonModal.deactivate(allAction.sendMessage("normal", (prefix ? '[' + prefix + '] ' : "") + (prompt || "請放入紙張..."), true));

                    return deferred.promise;
                },

                releaseSession: function(sessionId, deferred, data, prefix) {
                    //relase
                    deviceAction(methods.returnSession, [sessionId]).success(function() {
                        allAction.sendMessage("normal", (prefix ? '[' + prefix + '] ' : "") + "動作結束…");
                        return deferred.resolve(data || "ok");
                    }).error(function() {
                        console.error("deviceAgent returnSession error");
                        if (deferred) {
                            deferred.reject("deviceAgent returnSession error");
                        }
                    });
                    angular.element($document).off('keydown.decode');
                },
                printWebPrinter: function(url, prompt, prefix) {
                    var deferred = $q.defer();
                    //obtainSession
                    // deviceAction(methods.obtainSession, []).success(function(data) {
                    //     allAction.sendMessage("normal", (prefix ? '[' + prefix + '] ' : "") + (prompt || "請放入紙張..."), true);
                    //     sessionId = data;
                    //     //print
                    //     //console.log("XXXX" , "[PDF]" + window.location.origin + url);
                    //     deviceAction(methods.print, [sessionId, "[PDF]" + window.location.origin + url, "", "12", "5"]).success(function() {
                    //         //relase
                    //         allAction.releaseSession(sessionId, deferred, "", prefix);
                    //     }).error(function(xhr) {
                    //         console.error("deviceAgent print error");
                    //         //relase
                    //         allAction.releaseSession(sessionId, deferred, "", prefix);
                    //         //deferred.reject("deviceAgent print error");
                    //     });
                    // }).error(function(xhr) {
                    //     cbCommonModal.deactivate();
                    //     console.error("deviceAgent obtainSession error");
                    //     //relase
                    //     deferred.reject("deviceAgent obtainSession error");
                    // });
                    // for one demo
                    allAction.sendMessage("normal", (prefix ? '[' + prefix + '] ' : "") + (prompt || "請放入紙張..."), true);
                    $timeout(function(){
                      cbCommonModal.deactivate(allAction.modalId);
                      deferred.reject("deviceAgent obtainSession error");
                    },3000);
                    //cbCommonModal.deactivate(allAction.sendMessage("normal", (prefix ? '[' + prefix + '] ' : "") + (prompt || "請放入紙張..."), true));
                    return deferred.promise;
                },
                abort: function(sessionId, deferred, prefix) {
                    deviceAction(methods.abort, [sessionId]).success(function(data) {
                        //allAction.sendMessage("normal", (prefix ? '[' + prefix + '] ' : "") + (prompt || "請放入紙張..."), true);
                        allAction.releaseSession(sessionId, deferred, "", prefix);
                        decode = false;
                    }).error(function(xhr) {
                        cbCommonModal && cbCommonModal.deactivate();
                        console.error("deviceAgent abort error");
                        //relase
                        deferred.reject("deviceAgent abort error");
                    });
                },

                eject: function() {
                    var deferred = $q.defer();
                    //obtainSession
                    decode && sessionId && deviceAction(methods.obtainSession, []).success(function(data) {
                        //allAction.sendMessage("normal", (prefix ? '[' + prefix + '] ' : "") + (prompt || "請放入紙張..."), true);
                        sessionId = data;
                        //print
                        //console.log("XXXX" , "[PDF]" + window.location.origin + url);
                        deviceAction(methods.eject, [sessionId]).success(function() {
                            //relase
                            allAction.releaseSession(sessionId, deferred, "", "");
                            decode = false;
                        }).error(function(xhr) {
                            console.error("deviceAgent print error");
                            //relase
                            allAction.releaseSession(sessionId, deferred, "", "");
                            //deferred.reject("deviceAgent print error");
                        });
                    }).error(function(xhr) {
                        cbCommonModal.deactivate();
                        console.error("deviceAgent obtainSession error");
                        //relase
                        deferred.reject("deviceAgent obtainSession error");
                    });
                    return deferred.promise;
                },
                decode: function(eject, prompt, prefix) {
                    var deferred = $q.defer();
                    //obtainSession
                    var modId;
                    deviceAction(methods.obtainSession, []).success(function(data) {
                        allAction.sendMessage("normal", (prefix ? '[' + prefix + '] ' : "") + (prompt || "請放入存褶..."), true);
                        sessionId = data;
                        decode = true;
                        angular.element($document).on('keydown.decode', function(e) {
                            $rootScope.$apply(function() {
                                if (e.which == 27) {
                                    allAction.abort(sessionId, deferred, prefix);
                                    angular.element($document).off('keydown.decode');
                                }
                            });
                        });
                        //decode
                        deviceAction(methods.decode, [sessionId, "", 2, eject]).success(function(data) {
                            console.log('decodeData', data)
                            //release
                            decode = true;
                            allAction.releaseSession(sessionId, deferred, data, prefix);
                        }).error(function(xhr) {
                            console.error("deviceAgent decode error");
                            deferred.reject("deviceAgent decode error");
                            //release
                            allAction.releaseSession(sessionId, deferred, "", prefix);
                        });
                    }).error(function(xhr) {
                        cbCommonModal.deactivate();
                        console.error("deviceAgent obtainSession error");
                        deferred.reject("deviceAgent obtainSession error");
                    });
                    return deferred.promise;
                },
                encode: function(writterData, eject, prompt, prefix) {
                    var deferred = $q.defer();
                    //obtainSession
                    deviceAction(methods.obtainSession, []).success(function(data) {
                        allAction.sendMessage("normal", (prefix ? '[' + prefix + '] ' : "") + (prompt || "請放入存褶..."), true);
                        sessionId = data;
                        //encode
                        deviceAction(methods.encode, [sessionId, writterData, "", 2, eject]).success(function(data) {
                            console.log('decodeData', data)
                            //release
                            allAction.releaseSession(sessionId, deferred, data, prefix);
                        }).error(function(xhr) {
                            console.error("deviceAgent encode error");
                            deferred.reject("deviceAgent encode error");
                            //release
                            allAction.releaseSession(sessionId, deferred, "", prefix);
                        });
                    }).error(function(xhr) {
                        cbCommonModal.deactivate();
                        console.error("deviceAgent obtainSession error");
                        deferred.reject("deviceAgent obtainSession error");
                    });
                    return deferred.promise;
                },
                sendMessage: function(type, message, openModal) {
                    console.log(message)
                    try {
                        cbCommonModal.deactivate(allAction.modalId);
                        allAction.modalId = null;
                    } catch (e) {
                        console.error('close error', e)
                    }
                    $rootScope.$broadcast('notify', {
                        event: 'notify',
                        type: type,
                        message: message
                    });
                    if (openModal) {
                        allAction.modalId = cbCommonModal.activate({
                            message: message,
                            closeByEsc: false
                        });
                    }

                    return allAction.modalId;
                },
            };
            return allAction;
        }
    ]];
});
