/**
 * Table Component, Table Cell Component
 */
'use strict';


/** Table */
define(['cabin'], function(cabin) {
    return [['directive', 'cbWiTable', ['cabinModulePath', '$http', '$compile',
        function(cabinModulePath, $http, $compile) {

            return {
                scope: {
                    /* paging */
                    pageSize: '@pageSize', //for paging, if infinityScroll is true, pageSize is ignore
                    recordCount: '@recordCount', //total record count, if pageSize > -1 && infinityScroll: false, for paging purpose, this field must filled
                    currentPage: '@currentPage', //current page number
                    positionTop: '@pagingPositionTop',
                    positionBottom: '@pagingPositionBottom',

                    /* sorting */
                    sortOrder: '@sortOrder', //sort 
                    sortDirection: '@sortDirection', //sort direction: asc, desc
                    serverSort: '@serverSort', //sort through server data or page data

                    /* fixing table */
                    fixedCell: '@fixedCell', // [x, y], TODO: multiple fix

                    /* edit mode */
                    editable: '@editable', //default readonly

                    /* dragable */
                    draggable: '@dragable', //is table cell dragable

                    /* filtering */
                    searchable: '@searchable', //is filtering
                    queryString: '@queryString', // query string
                    isRegex: '@isRegex', // is regular expressions

                    /* dataSource */
                    dataSource: '=tbDataSource',
                    /* row style */
                    classodd: '@classodd',
                    classeven: '@classeven',

                    /* hover */
                    classhover: '@classhover',


                },
                restrict: 'A',
                link: function($scope, iElm, iAttrs, controller) {

                    //initialize attribute
                    $scope.settings = {

                        /* paging */
                        pageSize: iAttrs.pageSize || -1,

                        infinityScroll: iAttrs.infinityScroll || false,

                        recordCount: iAttrs.recordCount || -1,

                        currentPage: iAttrs.currentPage || 0,

                        positionTop: iAttrs.pagingPositionTop || false,

                        positionBottom: iAttrs.pagingPositionBottom || false,

                        datasource: iAttrs.datasource || {},

                        /* sorting */

                        sortOrder: iAttrs.sortOrder || [],

                        sortDirection: iAttrs.sortDirection || "desc",
                        serverSort: iAttrs.serverSort || false,

                        /* fixing table */

                        fixedCell: iAttrs.fixedCell || [],

                        /* edit mode */

                        editable: iAttrs.editable || false,

                        /* dragable */

                        draggable: iAttrs.dragable || false,

                        /* filtering */

                        searchable: iAttrs.searchable || false,

                        queryString: iAttrs.queryString || '',

                        isRegex: iAttrs.isRegex || false
                    };

                    // 1. 取得inner element 內容
                    var inner = angular.element("<div/>").append(iElm.find("col-setting").html());
                    $scope.innerElm = inner;

                    // 2. 取得欄位定義
                    var colDef = [];
                    inner.children("").each(function(index, elem) {
                        var _ele = $(elem);
                        colDef.push({
                            isNested: _ele.children().size() > 0,
                            childrenElm: function() {
                                if (_ele.children().size() > 0)
                                    return angular.element("<div/>").append(_ele.html());
                                return;
                            },
                            fieldName: _ele.attr('field-name') || '',
                            headerText: _ele.attr('header-text') || '',
                            editable: _ele.attr('editable') || false
                        });
                    });

                    //parse column definition, assign to scope object
                    $scope.colDef = colDef;

                    //3. 取得分頁定義
                    var pagElm = iElm.find("paging-settings").first();
                    if (pagElm) {

                        var pagingDef = {
                            recordPerPage: pagElm.attr("record-per-page") || 20,
                            allowComboBoxSelect: pagElm.attr("allow-combo-box-select") || false,
                            pagingClick: pagElm.attr("paging-click") || '',
                            firstPageText: pagElm.attr("first-page-text") || '',
                            lastPageText: pagElm.attr("last-page-text") || '',
                            totalRecordCount: pagElm.attr("total-record-count") || $scope.dataSource.data.length,
                            currentPage: pagElm.attr("current-page") || 0
                        };
                        //計算總頁數
                        pagingDef["totalPageCount"] = Math.floor(pagingDef.totalRecordCount / pagingDef.recordPerPage) + (pagingDef.totalRecordCount % pagingDef.recordPerPage > 0 ? 1 : 0);
                        console.log("W@", Math.floor(pagingDef.totalRecordCount / pagingDef.recordPerPage));
                        console.log("W@", pagingDef.totalRecordCount % pagingDef.recordPerPage > 0 ? 1 : 0);
                        $scope.pagingDef = pagingDef;
                    }


                    //動態compile template
                    var tpl = cabinModulePath + 'directives/cabin-williamTable/templates/williamTable.html';
                    $http.get(tpl).then(function(response) {
                        if (response) {
                            iElm.html($compile(response.data)($scope));
                        }
                    });


                    /* paging methods */
                    $scope.prev = function() {};
                    $scope.next = function() {};
                    $scope.first = function() {};
                    $scope.end = function() {};
                    $scope.toPage = function() {};

                    /* sorting methods */
                    $scope.sort = function(iElm) {};

                    /* filter methods */
                    $scope.filter = function() {};

                    /* infinity scroll */
                    $scope.rollingData = function() {}; //connecting to service provider
                } //,
                // compile: function(iElm, iAttr) {
                //     debugger;
                //     console.log("@wCompile", iElm.html());
                // }
            };
        }
    ]], ['directive', 'placeHolder', ['cabinModulePath', '$compile', '$http', "$sce",
        function(cabinModulePath, $compile, $http, $sce) {

            return {

                scope: {
                    /* data source*/
                    cell: '=placeHolder',
                    innerHtml: '=nestedEl'

                },

                restrict: 'A',
                link: function($scope, iElm, iAttrs, controller) {
                    // $scope.cell = $scope.placeHolder;
                    var children = iElm.empty().append($scope.innerHtml()).children();
                    var field = children.find("[field-name]");
                    if (field.size()) {
                        var fieldName = field.attr('field-name');
                        field.attr('ng-model', "cell['" + fieldName + "']");
                    }

                    $compile(children)($scope);

                }
            };
        }
    ]], ['directive', 'pagingSettings', ['cabinModulePath', '$compile', '$http',
        function(cabinModulePath, $compile, $http) {
            // paging settings directive
            return {
                scope: {
                    rPerPage: "@recordPerPage",
                    comboBoxSelect: "@allowComboBoxSelect",
                    fPageText: "@firstPageText",
                    lPageText: "@lastPageText",
                    pElmClick: "@pagingClick"
                },

                restrict: 'E',
                link: function($scope, iElm, iAttrs, controller) {

                    //init
                    $scope.settings = {
                        rPerPage: $scope.rPerPage || 20,
                        comboBoxSelect: $scope.comboBoxSelect || false,
                        fPageText: $scope.fPageText || "first",
                        lPageText: $scope.lPageText || "last",
                        pElmClick: $scope.pElmClick || ''
                    };

                    //如果不用paging, return
                    if (!$scope.paging)
                        return;

                    //計算共幾頁


                }
            };
        }
    ]], ['directive', 'wiTableCeiling', ['cabinModulePath', '$compile', '$http',
        function(cabinModulePath, $compile, $http) {
            // paging settings directive
            return {
                scope: true,
                restrict: 'E',
                templateUrl: cabinModulePath + 'directives/cabin-williamTable/templates/williamTableCeiling.html',

            };
        }
    ]], ['directive', 'wiTableFloor', ['cabinModulePath', '$compile', '$http',
        function(cabinModulePath, $compile, $http) {
            // paging settings directive
            return {
                scope: true,
                restrict: 'E',
                templateUrl: cabinModulePath + 'directives/cabin-williamTable/templates/williamTableFloor.html',

            };
        }
    ]], ['directive', 'wiTablePaging', ['cabinModulePath', '$compile', '$http',
        function(cabinModulePath, $compile, $http) {
            // paging settings directive
            return {
                scope: true,
                restrict: 'E',
                templateUrl: cabinModulePath + 'directives/cabin-williamTable/templates/williamTablePaging.html',

            };
        }
    ]]];
});
