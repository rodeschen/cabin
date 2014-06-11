/*
 * @license
 * angular-modal v0.2.0
 * (c) 2013 Brian Ford http://briantford.com
 * License: MIT
 */

'use strict';

angular.module('btford.modal', ['ngAnimate']).
factory('btfModal', ['$compile', '$rootScope', '$controller', '$q', '$http', '$templateCache', '$animate',
    function($compile, $rootScope, $controller, $q, $http, $templateCache, $animate) {
        return function modalFactory(config) {
            if ((+ !! config.template) + (+ !! config.templateUrl) !== 1) {
                throw new Error('Expected modal to have exacly one of either `template` or `templateUrl`');
            }

            var template = config.template,
                controller = config.controller || angular.noop,
                controllerAs = config.controllerAs,
                container = angular.element(config.container || document.body),
                _overlay = angular.element('<div class="btf-modal-overlay toggle"></div>'),
                duplicate = config.duplicate || false,
                element = null,
                overlay = null,
                scope = null,
                closeByEsc = config.closeByEsc !== false ? true : false,
                html;

            if (config.template) {
                var deferred = $q.defer();
                deferred.resolve(config.template);
                html = deferred.promise;
            } else {
                html = $http.get(config.templateUrl, {
                    cache: $templateCache
                }).
                then(function(response) {
                    return response.data;
                });
            }

            function activate(locals) {
                html.then(function(html) {
                    if (!element) {
                        attach(html, locals);
                    }
                });
            }

            function attach(html, locals) {
                if (locals && locals.$parentScope) {
                    scope = locals.$parentScope.$new();
                    locals.$parentScope = undefined;
                } else {
                    scope = $rootScope.$new();
                }
                element = angular.element(html);

                container.prepend(element);
                scope.closeModal = deactivate;

                overlay = _overlay.clone();
                if (closeByEsc) {
                    overlay.on('click', function() {
                        scope.$apply(deactivate)
                    });
                    scope.$on("keydown.esc", deactivate);
                }
                container.prepend(overlay);
                var _locals = duplicate ? angular.copy(locals) : locals;
                if (locals) {
                    for (var prop in _locals) {
                        scope[prop] = _locals[prop];
                    }
                }
                var ctrl = $controller(controller, {
                    $scope: scope
                });
                if (controllerAs) {
                    scope[controllerAs] = ctrl;
                }
                $compile(element)(scope);
                $animate.enter(overlay, container);
                $animate.enter(element, container);
            }

            function deactivate() {
                if (element) {
                    $animate.leave(element, function() {
                        element.remove();
                        element = null;
                        scope.$destroy();
                    });
                    $animate.leave(overlay, function() {
                        overlay.remove();
                        overlay = null;
                    });
                }
            }

            function active() {
                return !!element;
            }

            return {
                activate: activate,
                deactivate: deactivate,
                active: active
            };
        };
    }
]);
