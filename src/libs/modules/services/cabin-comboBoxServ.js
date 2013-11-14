'use strict';
define(['cabin'], function(cabin) {
    return ['factory', 'cbComboBoxServ', ['$resource', '$timeout', 'properties',
        function($resource, $timeout, properties) {
            var isCache = (properties.comboBoxCache === false) ? false : true;
            var cacheData = {};
            var queryQueue = [];

            var lastTime = undefined;
            var resource = $resource('basehandler/querybombobox', {}, {
                query: {
                    method: 'POST'
                }
            });

            var size = 0;
            var queryPromise = null;

            function query() {
                if (queryPromise) {
                    $timeout.cancel(queryPromise);
                }
                queryPromise = $timeout(function() {
                    var size = queryQueue.length;
                    var keys = [];
                    var dymanicKeys = [];
                    var _queue = [];
                    for (var i = 0; i < size; i++) {
                        var o = queryQueue.shift();
                        //ignore cache
                        if (cacheData[o.key]) {
                            //console.log("get cache", o.key)
                            o.fn(cacheData[o.key]);
                        } else {
                            if (o.isDymanic) {
                                dymanicKeys.push(o.key);
                            } else {
                                keys.push(o.key);
                            }
                            _queue.push(o);
                        }
                    }
                    if (_queue.length) {
                        resource.query({
                            keys: keys,
                            dymanicKeys: dymanicKeys
                        }, function(res) {
                            var i = 0;
                            for (var i = 0; i < size; i++) {
                                var o = _queue.shift();
                                o.fn(res[o.key] || []);
                                if (isCache) {
                                    cacheData[o.key] = res[o.key] || "";
                                }
                            }
                        });
                    }
                }, 40);
            }


            return {
                addKey: function(key, isDymanic, fn) {
                    queryQueue.push({
                        key: key,
                        isDymanic: isDymanic,
                        fn: fn
                    });
                    query();
                }
            };
        }
    ]];
});
