/* 
 * Setup PbPrinterService XML-RPC Service
 */
//var pbPrinterService = XMLRPC.getService("http://192.168.221.111:9980/deviceagent/xmlrpc");
var pbPrinterService = XMLRPC.getService("http://192.168.221.129:9980/deviceagent/xmlrpc");
/* Methods from MnmMoMBean */

pbPrinterService.add("tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.initXmlRpcService", "initXmlRpcService");
pbPrinterService.add("tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.getName", "getName");
pbPrinterService.add("tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.setName", "setName");
pbPrinterService.add("tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.getType", "getType");
pbPrinterService.add("tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.setType", "setType");
pbPrinterService.add("tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.getObjectName", "getObjectName");
pbPrinterService.add("tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.init", "init");
pbPrinterService.add("tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.getDomain", "getDomain");
pbPrinterService.add("tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.getId", "getId");
/* Methods from MnmMoServiceMBean */
pbPrinterService.add("tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.start", "start");
pbPrinterService.add("tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.stop", "stop");
pbPrinterService.add("tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.isActive", "isActive");
pbPrinterService.add("tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.isAutoStart", "isAutoStart");
pbPrinterService.add("tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.setAutoStart", "setAutoStart");
/* Methods from DeviceServiceMBean */
pbPrinterService.add("tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.getFreeSessions", "getFreeSessions");
pbPrinterService.add("tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.getBusySessions", "getBusySessions");
pbPrinterService.add("tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.getFailedSessions", "getFailedSessions");
pbPrinterService.add("tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.obtainSession", "obtainSession");
pbPrinterService.add("tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.returnSession", "returnSession");
pbPrinterService.add("tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.listSessions", "listSessions");
pbPrinterService.add("tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.isSearchingRemoteSessionsEnabled", "isSearchingRemoteSessionsEnabled");
pbPrinterService.add("tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.setSearchingRemoteSessionsEnabled", "setSearchingRemoteSessionsEnabled");
pbPrinterService.add("tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.getWaitForPermissionTimeout", "getWaitForPermissionTimeout");
pbPrinterService.add("tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.setWaitForPermissionTimeout", "setWaitForPermissionTimeout");
pbPrinterService.add("tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.getAutoAnswerPermission", "getAutoAnswerPermission");
pbPrinterService.add("tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.setAutoAnswerPermission", "setAutoAnswerPermission");
/* Methods from PbPrinterServiceMBean */
pbPrinterService.add("tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.open", "open");
pbPrinterService.add("tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.close", "close");
pbPrinterService.add("tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.print", "print");
pbPrinterService.add("tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.encode", "encode");
pbPrinterService.add("tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.decode", "decode");
pbPrinterService.add("tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.abort", "abort");
pbPrinterService.add("tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.eject", "eject");
pbPrinterService.add("tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.waitForDocument", "waitForDocument");
pbPrinterService.add("tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.isDocumentPresented", "isDocumentPresented");
pbPrinterService.add("tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.isWaitForDocument", "isWaitForDocument");
pbPrinterService.add("tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.setWaitForDocument", "setWaitForDocument");
pbPrinterService.add("tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.isEjectUnexpectedDocument", "isEjectUnexpectedDocument");
pbPrinterService.add("tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.setEjectUnexpectedDocument", "setEjectUnexpectedDocument");
pbPrinterService.add("tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.isRemsFeature", "isRemsFeature");
pbPrinterService.add("tw.com.iisi.deviceagent.xmlrpc.pbprinter.PbPrinterServiceInterface.setRemsFeature", "setRemsFeature");
