'use strict';
define(['cabin'], function(cabin) {
    return ['service', 'cbDeviceAgentSrv', ['$rootScope', 'properties',
        function($rootScope, properties) {
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

            var url = "http://192.168.221.111:9980/deviceagent/xmlrpc";
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
            //                                 console.log("Error")
            //                             }
            //                         });

            //                     },
            //                     'error': function() {
            //                         console.log("Error")
            //                     }
            //                 });
            //             },
            //             'error': function() {
            //                 console.log("Error")
            //             }
            //         });
            //     },
            //     'error': function() {
            //         console.log("Error")
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
                // no parm
                createService: 'com.iisigroup.infinity.kernel.nodeagent.xmlrpc.NodeAgentXmlRpcService.invoke',
                // no parm
                obtainSession: 'tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.obtainSession',
                // no parm
                returnSession: 'tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.returnSession',
                // param ['sessionId','data','prompt','12','5']
                print: 'tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.print'
            };

            //create Service
            $.xmlrpc(url, {
                'methodName': methods.createService,
                'params': []
            });

            function deviceAction(action, params) {
                return $.xmlrpc(url, {
                    "methodName": action,
                    "params": params
                })
            }


            return {
                print: function(printData) {
                    deviceAction(methods.obtainSession, []).success(function(data) {
                        deviceAction(methods.print, [data, printData, "", "12", "5"]).success(function() {
                            deviceAction(method.returnSession).success(function() {

                            });
                        })
                    }).error(function() {
                        console.log("Error")
                    });
                },
                printWebPrinter: function(url) {

                }
            }

        }
    ]];
});
