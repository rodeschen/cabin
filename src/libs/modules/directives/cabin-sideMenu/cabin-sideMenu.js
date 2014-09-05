 'use strict';
 define(['cabinDirectivesModule'], function(cabinDirectivesModule) {
     cabinDirectivesModule.directive('cbSideMenu', ['$location', 'cabinModulePath', '$http', '$timeout',
         function($location, cabinModulePath, $http, $timeout) {
             return {
                 templateUrl: cabinModulePath + 'directives/cabin-sideMenu/templates/sideMenu.html',
                 restrict: 'A',
                 scope: {
                     'cbSideBar': '@',
                     'receiveEvent': '@',
                     'emitEvent': '@'
                 },
                 link: function(scope, iElement) {
                     scope.pages = [];
                     scope.current;
                     scope.currentGroup;
                     scope.$on(scope.receiveEvent || 'slideMenu', function(event, data) {
                         scope.currentGroup = data.menus;
                         scope.current = {};
                         scope.pages = data.menus.child || [];

                     });
                     scope.navAndTrigger = function(page) {
                         if (new RegExp("^" + page.url + "$").test($location.path())) {
                             scope.current = page;
                             return 'active';
                         }
                         return '';
                     };
                     scope.$watchCollection("current", function(page) {
                         page && emit(page || "");
                     })
                     scope.routeTo = function(page) {
                         $location.path(page.url);
                     }


                     function emit(page) {
                         scope.$emit("broadcast", {
                             'event': scope.emitEvent || 'pageViewer',
                             'page': page || {}
                         });
                     }
                 }
             };
         }
     ]);
 });
