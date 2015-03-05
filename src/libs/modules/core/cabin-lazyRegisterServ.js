'use strict';
define(['cabinCoreModule'], function(cabinCoreModule) {
    cabinCoreModule.provider('cbLazyRegisterServ', function() {
        var register = {
            'controller': undefined,
            'directive': undefined,
            'filter': undefined,
            'factory': undefined,
            'service': undefined,
            'provider': undefined
        };

        var registered = {};

        angular.extend(this, {
            setRegisters: function(allRegisters) {
                angular.extend(register, allRegisters);
            },
            setControllerRegister: function($register) {
                this.setRegister("controller", $register);
            },
            setDirectiveRegister: function($register) {
                this.setRegister("directive", $register);
            },
            setFilterRegister: function($register) {
                this.setRegister("filter", $register);
            },
            setfactoryRegister: function($register) {
                this.setRegister("factory", $register);
            },
            setServiceRegister: function($register) {
                this.setRegister("servide", $register);
            },
            controller: function(name, item) {
                return this.register('controller', name, item);
            },
            directive: function(name, item) {
                return this.register('directive', name, item);;
            },
            filter: function(name, item) {
                return this.register('filter', name, item);
            },
            factory: function(name, item) {
                return this.register('factory', name, item);
            },
            service: function(name, item) {
                return this.register('service', name, item);
            },
            register: function(type, name, item) {
                var collection = registered[type] || (registered[type] = {}) && registered[type];
                !collection[name] && register[type](name, item);
                return this;
            },
            isRegistered: function(type, name) {
                return !!(registered[type] && registered[type][name])
            }
        });

        this.$get = function() {
            return this;
        }

    });
});