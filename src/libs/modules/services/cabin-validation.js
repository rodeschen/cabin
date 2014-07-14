'use strict';
define(['cabin'], function(cabin) {
    return ['service', 'cbValidationServ', ['$rootScope', 'defaultValidations',
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
    ]];
});
