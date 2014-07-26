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
            if ((+!!config.template) + (+!!config.templateUrl) !== 1) {
                throw new Error('Expected modal to have exacly one of either `template` or `templateUrl`');
            }
            var template = config.template,
                controller = config.controller || angular.noop,
                controllerAs = config.controllerAs,
                container = angular.element(config.container || document.body),
                _overlay = angular.element('<div class="btf-modal-overlay toggle"></div>'),
                duplicate = config.duplicate || false,
                showOverlay = config.showOverlay === false ? false : true,
                element = null,
                overlay = null,
                //scope = null,
                closeByEsc = config.closeByEsc !== false ? true : false,
                html,
                modals = {};

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
                var modalId = "modalId" + parseInt(Math.random() * 1000, 10);
                html.then(function(html) {
                    //if (!element) {
                    attach(html, locals, modalId);
                    //}
                });
                return modalId;
            }

            function attach(html, locals, modalId) {
                var scope;
                if (locals && locals.$parentScope) {
                    scope = locals.$parentScope.$new();
                    locals.$parentScope = undefined;
                } else {
                    scope = $rootScope.$new();
                }
                scope.modalId = modalId;
                element = angular.element(html);

                container.prepend(element);
                scope.closeModal = deactivate;
                scope.close = deactivate;
                overlay = _overlay.clone();
                if (!showOverlay) {
                    overlay.css('opacity', 0);
                }

                modals[modalId] = {
                    el: element,
                    ov: overlay
                };
                if (closeByEsc) {
                    overlay.on('click', function() {
                        scope.$apply(function() {
                            deactivate();
                        });
                    });
                    scope.$on("keydown.esc", function() {
                        deactivate();
                    });
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

            function deactivate(modalId) {
                var deferred = $q.defer();
                var el, ov;
                if (modalId) {
                    if (modals[modalId]) {
                        el = modals[modalId].el;
                        ov = modals[modalId].ov;
                    }

                } else {
                    el = element;
                    ov = overlay;
                }
                if (el) {
                    var scope = el.scope();
                    $animate.leave(el, function() {
                        el.remove();
                        el = null;
                        scope.$destroy();
                        delete modals[modalId || ""];
                        deferred.resolve();
                    });
                    $animate.leave(ov, function() {
                        ov.remove();
                        ov = null;
                    });
                }
                return deferred.promise;
            }

            function active() {
                return !!element;
            }

            return {
                open: activate,
                close: deactivate,
                closeModal: deactivate,
                activate: activate,
                deactivate: deactivate,
                active: active
            };
        };
    }
]);
