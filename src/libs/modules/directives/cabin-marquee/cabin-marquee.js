'use strict';
define(['cabinDirectivesModule'], function(cabinDirectivesModule) {
    cabinDirectivesModule.directive('cbMarquee', ['$timeout', '$window', 'cabinModulePath',
        function($timeout, $window, cabinModulePath) {
              return {
      restrict: 'EA',
      templateUrl: cabinModulePath + 'directives/cabin-marquee/templates/marquee.html',
      scope: false,
      link: function($scope) {
        $scope.data={info:"預計在5/30星期五晚上換版",info2:"請使用者在當天晚上8:30前登出系統。"};
      },
      //$scope.label = [{$scope}]
    };
        }
    ]);
});
