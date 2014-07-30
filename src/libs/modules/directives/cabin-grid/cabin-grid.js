'use strict';
define(['cabin'], function(cabin) {
    return ['directive', 'cbGrid', ['$location', 'cabinModulePath', '$http', '$rootScope', '$window',
        function($location, cabinModulePath, $http, $rootScope) {
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
                    var columnWidth = 0,
                        parentWidth = iElement.outerWidth(),
                        usePercent = false,
                        table = iElement.find('table'),
                        headerTable = iElement.find('.cabin-grid-header'),
                        bodyTable = iElement.find('.cabin-grid-body');
                    angular.forEach($scope.columns, function(e) {
                        columnWidth += e.width || 10
                    });

                    if (columnWidth < parentWidth) {
                        usePercent = true;
                        table.css('width', parentWidth);
                    } else {
                        table.css('width', columnWidth);
                    }
                    $scope.getColumnStyle = function(column, index) {
                        return {
                            textAlign: column.align || 'center',
                            width: usePercent ? ((((column.width) * parentWidth) / columnWidth)) : column.width
                        };
                    }

                    $scope.getHeaderColumnStyle = function(column){
                        return {
                            width: usePercent ? ((((column.width) * parentWidth) / columnWidth)) : column.width
                        };
                    }

                    $scope.getBodyStyle = function() {
                        return {
                            height: $scope.gridSettings.height || 200
                        };
                    }
                    $scope.getHeaderStyle = function() {
                        return {
                        };
                    }
                    bodyTable.scroll(function() {
                        headerTable.scrollLeft(bodyTable.scrollLeft());
                    });



                }
            };
        }
    ]];
});
