'use strict';
define(['cabin'], function(cabin) {
    return ['service', 'cbDeviceAgentSrv', ['properties',
        function(properties) {
            var alias = {
                /* Methods from MnmMoMBean */
                "initXmlRpcService": "tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.initXmlRpcService",
                "setName": "tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.setName",
                "getName": "tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.getName",
                "getType": "tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.getType",
                "setType": "tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.setType",
                "getObjectName": "tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.getObjectName",
                "init": "tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.init",
                "getDomain": "tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.getDomain",
                "getId": "tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.getId",
                /* Methods from MnmMoServiceMBean */
                "start": "tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.start",
                "stop": "tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.stop",
                "isActive": "tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.isActive",
                "isAutoStart": "tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.isAutoStart",
                "setAutoStart": "tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.setAutoStart",
                /* Methods from DeviceServiceMBean */
                "getFreeSessions": "tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.getFreeSessions",
                "getBusySessions": "tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.getBusySessions",
                "getFailedSessions": "tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.getFailedSessions",
                "obtainSession": "tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.obtainSession",
                "returnSession": "tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.returnSession",
                "listSessions": "tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.listSessions",
                "isSearchingRemoteSessionsEnabled": "tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.isSearchingRemoteSessionsEnabled",
                "setSearchingRemoteSessionsEnabled": "tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.setSearchingRemoteSessionsEnabled",
                "getWaitForPermissionTimeout": "tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.getWaitForPermissionTimeout",
                "setWaitForPermissionTimeout": "tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.setWaitForPermissionTimeout",
                "getAutoAnswerPermission": "tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.getAutoAnswerPermission",
                "setAutoAnswerPermission": "tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.setAutoAnswerPermission",
                /* Methods from PbPrinterServiceMBean */
                "open": "tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.open",
                "close": "tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.close",
                "print": "tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.print",
                "encode": "tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.encode",
                "decode": "tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.decode",
                "abort": "tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.abort",
                "eject": "tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.eject",
                "waitForDocument": "tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.waitForDocument",
                "isDocumentPresented": "tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.isDocumentPresented",
                "isWaitForDocument": "tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.isWaitForDocument",
                "setWaitForDocument": "tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.setWaitForDocument",
                "isEjectUnexpectedDocument": "tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.isEjectUnexpectedDocument",
                "setEjectUnexpectedDocument": "tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.setEjectUnexpectedDocument",
                "isRemsFeature": "tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.isRemsFeature",
                "setRemsFeature": "tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.setRemsFeature"

            }

            // var pbPrinterService = XMLRPC.getService("http://localhost:9920/nodeagent/xmlrpc");
            // pbPrinterService.add("com.iisigroup.infinity.kernel.nodeagent.xmlrpc.NodeAgentXmlRpcService.invoke", "aaaa");
            // pbPrinterService.aaaa("MNM:type=com.iisigroup.infinity.modules.dummyflowstart.DummyFlowStart,name=dummyFlowStart", "hello", ["ddd"],
            //          ["java.lang.String"]);
            $.xmlrpc("http://localhost:9920/nodeagent/xmlrpc", {
                'methodName': 'com.iisigroup.infinity.kernel.nodeagent.xmlrpc.NodeAgentXmlRpcService.invoke',
                'params': ["MNM:type=com.iisigroup.infinity.modules.dummyflowstart.DummyFlowStart,name=dummyFlowStart", "hello", ["ddd"],
                    ["java.lang.String"]
                ],
                'success': function(data, request) {
                    console.log(data);
                },
                'error': function() {
                  console.log("Error")
                }
            });

            // $.ajax({
            //     url: 'http://www.example.com/dir/page2.html',
            //     type: 'GET',
            //     crossDomain: true,
            //     dataType: 'json',
            //     success: function() {
            //         alert("SSS")
            //     }
            // })

            // $.ajax({
            //       url : "http://localhost:9920/nodeagent/xmlrpc",
            //       type : 'POST'//,
            //       //contentType:'text/xml'

            // }).success(function(data){
            //       alert(data);
            // }).error(function(){

            // })
            // var xhr = new XMLHttpRequest();;
            // xhr.open('POST', 'http://localhost:9920/nodeagent/xmlrpc', true);
            // //xhr.withCredentials = true;
            // xhr.onload = function() {
            //     alert(xhr.response); //reposHTML;
            // };
            // xhr.onerror = function() {
            //     alert('error making the request.');
            // };
            // xhr.send("<xml></xml>");
                    // var method = document.getElementById("operation").value;  
            // var request = new XmlRpcRequest("http://localhost:9920/nodeagent/xmlrpc", "com.iisigroup.infinity.kernel.nodeagent.xmlrpc.NodeAgentXmlRpcService.invoke");  
            // request.addParam("MNM:type=com.iisigroup.infinity.modules.dummyflowstart.DummyFlowStart,name=dummyFlowStart");  
            // request.addParam("hello");
            // request.addParam(["ddd"]);
            // request.addParam(["java.lang.String"]);
            // var response = request.send();  
            // alert(response.parseXML());  


        }
    ]];
});
