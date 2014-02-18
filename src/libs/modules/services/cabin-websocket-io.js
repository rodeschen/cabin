'use strict';
define(['cabin'], function(cabin) {
    return ['service', 'cbWebSocketIoServ', ['$rootScope', 'socketFactory', 'cbLazyRegisterServ',
        function($rootScope, socketFactory, cbLazyRegisterServ) {

            var pool = {};

            return {
                getConnect: function(url, serviceName) {
                    if (pool[url]) {
                        return pool[url];
                    }
                    var socketIo = io.connect(url, {
                        //最長每次 reconnect 等待時間
                        "reconnection limit": 7000,
                        //最多 reconnect 幾次
                        "max reconnection attempts": 10,
                        transports: ['websocket']
                    });
                    var factory = angular.extend(socketFactory({
                        prefix: serviceName ? 'socket.' + serviceName + '.' : '',
                        ioSocket: socketIo
                    }), {
                        socket: socketIo
                    });

                    pool[url] = factory;

                    if (serviceName) {
                        factory.forward("connect");
                        //add to service container
                        cbLazyRegisterServ.service(serviceName, function() {
                            return factory
                        });
                    }

                    return factory;
                }
            }
        }
    ]];
});
