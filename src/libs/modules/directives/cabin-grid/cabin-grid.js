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
                    $scope.columns = $scope.gridSettings.columns;
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
                            textAlign: 'center',
                            'display': 'inline-block',
                            overflow: 'hidden',
                            //'float': 'left',
                            'float' : column.float || 'none',
                            width: usePercent ? (((column.width * parentWidth) / columnWidth)) : column.width
                        }
                    }

                    $scope.getBodyStyle = function() {
                        return {
                            height: 200,
                            overflow: 'auto'
                        }
                    }
                    $scope.getHeaderStyle = function() {
                        return {
                            overflow: 'hidden'
                        }
                    }
                    bodyTable.scroll(function() {
                        headerTable.scrollLeft(bodyTable.scrollLeft());
                    });



                }
            };
        }
    ]];
});
