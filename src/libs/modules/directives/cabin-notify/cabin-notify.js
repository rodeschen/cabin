'use strict';
define(['cabin'], function(cabin) {
    return ['directive', 'cbNotify', ['$timeout', '$window', 'cabinModulePath',
        function($timeout, $window, cabinModulePath) {
            return {
                templateUrl: cabinModulePath + 'directives/cabin-notify/templates/notify.html',
                restrict: 'A',
                scope: {
                    'cbNotify': "@",
                    'receiveEvent': '@',
                    'clearEvent' : '@',
                    'maxNotify': '@'
                },
                link: function(scope, iElement) {
                    scope.events = [];
                    scope.maxNofiy = parseInt(scope.maxNotify || 30, 10);
                    // scope.events = [{
                    //  'type':'normal',
                    //  'time':'10/01 10:10:10',
                    //  'message':'aaaaa<br />sdafas'
                    // },{
                    //  'type': 'error',
                    //  'time': '10/02 10:10:10',
                    //  'message' : 'message'
                    // },{
                    //  'type': 'warn',
                    //  'time': '10/02 10:10:10',
                    //  'message' : 'warnadfaf'
                    // }];

                    scope.addIcon = function(type) {
                        return {
                            'error': 'icon-exclamation-sign',
                            'normal': 'icon-bell',
                            'warn': 'icon-warning-sign'
                        }[type];
                    };

                    //init
                    iElement.css('zIndex', 1040);
                    // action event
                    scope.$on(scope.receiveEvent || 'notify', function(ev, data) {
                        data.type = data.type || 'normal';
                        data.time = data.time || new Date;
                        scope.events.push(data);
                        if (scope.events.length > scope.maxNofiy) {
                            scope.events.shift();
                        }
                        scope.hasNotify = true;
                    });

                    scope.$on(scope.clearEvent || 'notify-clear', function(ev, data) {
                        scope.events = [];
                    });

                    scope.toggleNotify = function() {
                        (scope.isOpen = !scope.isOpen);
                        resizeAndScrollBody();
                    };

                    var body = iElement.find('.msg-body');
                    var wrap = body.children('.msg-wrapper');
                    var resizeAndScrollBody = function() {
                        if (scope.isOpen) {
                            body.height($($window).innerHeight() < 450 ? ($($window).innerHeight() - 100) : 350);
                            $timeout(function() {
                                if (wrap.height() > body.height() && body.height() > 10) {
                                    wrap.css('position', 'static');
                                    body.scrollTop(wrap.height() + 50);
                                } else {
                                    wrap.css('position', 'absolute');
                                }
                            }, 500);
                        } else {
                            body.height(-1);
                        }

                    };
                    scope.$watchCollection('events', resizeAndScrollBody);
                    angular.element(window).on('resize', resizeAndScrollBody);
                }
            };
        }
    ]];
});
