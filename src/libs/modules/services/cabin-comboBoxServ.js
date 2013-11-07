'use strict';
define(['cabin'], function(cabin) {
    return ['factory', 'cbComboBoxServ', ['$resource', '$timeout', 'properties',
        function($resource, $timeout, properties) {
            var _cache = (properties.comboBoxCache === false) ? false : true;
            var cacheData = {};
            var _queryQueue = [];
            var _DynmaicQueryQueue = [];

            var lastTime = undefined;
            var resource = $resource('basehandler/querybombobox', {}, {
                query: {
                    method: 'POST'
                }
            });

            var size = 0;

            function query() {
                size = _queryQueue.length;
                (function(s) {
                    $timeout(function() {
                        size = _queryQueue.length;
                        if (s === size) {
                            var keys = [];
                            var dymanicKeys = [];
                            var _queue = [];
                            var i = 0;
                            while (i < s) {
                                var o = _queryQueue.shift();
                                //ignore cache
                                if (cacheData[o.key]) {
                                    console.log("get cache", o.key)
                                    o.fn(cacheData[o.key]);
                                } else {
                                    if (o.isDymanic) {
                                        dymanicKeys.push(o.key);
                                    } else {
                                        keys.push(o.key);
                                    }
                                    _queue.push(o);
                                }

                                i++;
                            }
                            if (keys.length || dymanicKeys.length) {
                                resource.query({
                                    keys: keys,
                                    dymanicKeys: dymanicKeys
                                }, function(res) {
                                    var i = 0;
                                    while (i < s) {
                                        var o = _queue.shift();
                                        o.fn(res[o.key] || []);
                                        if (_cache) {
                                            cacheData[o.key] = res[o.key] || "";
                                        }
                                        i++;
                                    }
                                    if (_queryQueue.length != 0) {
                                        query();
                                    }
                                });
                            } else {
                                if (_queryQueue.length != 0) {
                                    query();
                                }
                            }
                        } else {
                            query();
                        }
                    }, 40);
                })(size);
            }

            return {
                addKey: function(key, isDymanic, fn) {

                    _queryQueue.length == 0 && query();
                    _queryQueue.push({
                        key: key,
                        isDymanic: isDymanic,
                        fn: fn
                    });

                }
            };
        }
    ]];
});
