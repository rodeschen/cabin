'use strict';
define(['cabin'], function(cabin) {
    return [
        ['service', 'cbValidationServ', ['$rootScope', 'defaultValidations',
            function($rootScope, defaultValidations) {
                var errorMessages = {
                    'required': '此欄位必填',
                    'cbComboBox': '請選擇正確選項',
                    'cbTwDate': '日期錯誤'
                };

                var validations = defaultValidations;


                return {
                    addValid: function(name, valid) {
                        validations[name] = valid;
                    },
                    validation: function(name) {
                        return validations[name];
                    },
                    initValidation: function(name) {
                        if (validations[name]) return;
                        require([name], function(valid) {
                            validations[name] = valid[1];
                        });
                    },
                    errorMessage: function(key) {
                        return errorMessages[key] || key;
                    },
                    setErrorMessage: function(key, value) {
                        errorMessages[key] = value;
                    }
                }
            }
        ]],
        ['directive', 'validator', ['cbValidationServ', '$timeout', '$injector',
            function(cbValidationServ, $timeout, $injector) {
                return {
                    require: 'ngModel',
                    restrict: 'A',
                    priority: 2,
                    link: function(scope, element, attrs, ngModel) {
                        var parentScope = scope;
                        var scope = scope.$new();
                        scope.ngModel = ngModel;
                        ngModel.putValue = function(data) {
                            scope.$emit('putValue', data);
                        };
                        scope.$watchCollection('ngModel.$viewValue', function(v) {
                            $timeout(function() {
                                var err = '';
                                v = ngModel.$error;
                                for (var key in v) {
                                    if (v[key]) {
                                        err = cbValidationServ.errorMessage(key);
                                        break;
                                    }
                                }
                                var after = element.next();
                                if (!after.is('.cb-hint')) {
                                    after = $('<span class="cb-hint hint hint--error  hint--right" data-hint=""></span>').insertAfter(element);
                                }
                                after.attr('data-hint', err);
                            }, 200);

                        });
                        //add valid
                        if (attrs.validator) {
                            angular.forEach(attrs.validator.split(","), function(e, i) {
                                var valid = {
                                    name: undefined,
                                    type: 'keyup',
                                    attrs: undefined
                                };
                                if (/-/.test(e)) {
                                    valid.type = e.split('-')[0];
                                    e = e.split("-")[1];
                                }
                                if (/:/.test(e)) {
                                    e = e.replace(/:$/, '').split(':');
                                    valid.name = e[0];
                                    valid.attrs = e.slice(1);
                                } else {
                                    valid.name = e;
                                }

                                cbValidationServ.initValidation(valid.name);
                                element.on(valid.type, function(event) {
                                    var _this = this;
                                    parentScope.$apply(function() {
                                        try {
                                            var localVar = {
                                                'value': _this.value,
                                                'allValue': parentScope.data,
                                                'ngModel': ngModel,
                                                'element': element,
                                                'scope': parentScope,

                                            };
                                            try {
                                                if (valid.type == 'focus' || _this.value) {
                                                    var text = $injector.invoke(cbValidationServ.validation(valid.name), ngModel, localVar);
                                                    if (text !== true) {
                                                        throw text;
                                                    }
                                                }
                                            } catch (e) {
                                                event.preventDefault();
                                                throw text;
                                            }
                                            ngModel.$setValidity(e, true);

                                        } catch (exp) {
                                            cbValidationServ.setErrorMessage(e, exp);
                                            ngModel.$setValidity(e, false);
                                        }
                                    });
                                });
                            });

                        }
                    }
                };
            }
        ]]
    ];
});
