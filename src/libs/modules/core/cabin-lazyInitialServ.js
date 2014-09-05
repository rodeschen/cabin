'use strict';
define(['cabinCoreModule'], function(cabinCoreModule) {
    cabinCoreModule.service('cbLazyInitialServ', function($q) {

        var poll = {};
        return {
            add: function(key) {
                poll[key] = $q.defer();
                return poll[key];
            },
            get: function(key) {
                return poll[key];
            }
        }
    });
});
