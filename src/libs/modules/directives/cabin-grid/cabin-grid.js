'use strict';
define(['cabinDirectivesModule'], function(cabinDirectivesModule) {
    cabinDirectivesModule.directive('cbGrid', ['$location', 'cabinModulePath', '$http', '$rootScope', '$window', '$timeout',
        function($location, cabinModulePath, $http, $rootScope, $window, $timeout) {
            return {
                templateUrl: cabinModulePath + 'directives/cabin-grid/templates/cabin-grid.html',
                restrict: 'A',
                scope: {
                    gridSettings: '=cbGrid',
                    gridData: '='
                },
                link: function($scope, iElement) {
                    $scope.s = $scope.gridSettings;
                    $scope.columns = $scope.gridSettings.columns;
                    $scope.actions = $scope.gridSettings.actions || {};
                    $scope.iGridData = [];
                    var columnWidth = 0,
                        parentWidth = iElement.outerWidth() - 18,
                        usePercent = false,
                        headerTable = iElement.find('.cabin-grid-header'),
                        bodyTable = iElement.find('.cabin-grid-body');
                    angular.forEach($scope.columns, function(e) {
                        columnWidth += e.width || 10
                    });



                    $scope.$watch("gridData", function(v) {
                        $scope.iGridData = [];
                        if (v && v.length) {
                            (function appendData(d) {
                                $timeout(function() {
                                    $scope.iGridData.push(d.shift());
                                    if (d.length) {
                                        appendData(d);
                                    }
                                }, 5);
                            })(v);
                        }
                    });
                    // var resizeTimeout = null;
                    // angular.element($window).on('resize', function() {
                    //     $timeout.cancel(resizeTimeout);
                    //     resizeTimeout = $timeout(function() {
                    //         parentWidth = iElement.outerWidth();
                    //         if (columnWidth < parentWidth) {
                    //             usePercent = true;
                    //             table.css('width', parentWidth);
                    //         } else {
                    //             table.css('width', columnWidth);
                    //         }
                    //     }, 100);
                    //     console.log("DD");
                    // });

                    if (columnWidth < parentWidth) {
                        usePercent = true;
                        headerTable.children().css('width', parentWidth + 18);
                        bodyTable.children().css('width', parentWidth);
                    } else {
                        headerTable.children().css('width', columnWidth + 18);
                        bodyTable.children().css('width', columnWidth);
                    }
                    $scope.getColumnStyle = function(column, index, isLast) {
                        var width = usePercent ? ((((column.width) * parentWidth) / columnWidth)) : column.width;
                        return {
                            textAlign: column.align || 'center',
                            width: width
                        };
                    }

                    $scope.getHeaderColumnStyle = function(column, index, isLast) {
                        var width = usePercent ? ((((column.width) * parentWidth) / columnWidth)) : column.width;
                        return {
                            width: width
                        };
                    }

                    $scope.getBodyStyle = function() {
                        return {
                            height: $scope.gridSettings.height || 200
                        };
                    }
                    $scope.getHeaderStyle = function() {
                        return {};
                    }
                    bodyTable.scroll(function() {
                        headerTable.scrollLeft(bodyTable.scrollLeft());
                    });



                }
            };
        }
    ]);
});
