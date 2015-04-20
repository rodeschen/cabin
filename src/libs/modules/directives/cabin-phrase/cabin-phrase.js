'use strict';
define(['cabinDirectivesModule'], function(cabinDirectivesModule) {
    cabinDirectivesModule.directive('cbPhrase', ['$timeout', '$window', 'cabinModulePath',
        function($timeout, $window, cabinModulePath /*,hotkey*/ ) {
            return {


                templateUrl: cabinModulePath + 'directives/cabin-phrase/templates/phrase.html',
                restrict: 'A',
                scope: {
                    'cbPhrase': "@",
                },
                link: function(scope, iElement) {



                    scope.classes = [{
                        item: '分行中文名'
                    }, {
                        item: '台灣城市'
                    }];

                    scope.cities = [{
                        city: 'C06 台北市'
                    }, {
                        city: 'C05 新北市'
                    }];

                    scope.choosePhrase = function(idx) {
                        scope.selectedIdx = idx;

                    };
                    scope.phraseSubmit = function() {
                        scope.phrase = scope.cities[scope.selectedIdx].city;
                        scope.$emit('sentPhrase', scope.phrase);
                        scope.phrase = '';
                        // hotkey.resetCount();
                        scope.$emit('hotkeyPress', scope.phrase);

                    }


                }
            };
        }
    ]);
});
