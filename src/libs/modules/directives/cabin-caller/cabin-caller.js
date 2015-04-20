'use strict';
define(['cabinDirectivesModule'], function(cabinDirectivesModule) {
    cabinDirectivesModule.directive('cbCaller', ['$timeout', '$window', 'cabinModulePath',
        function($timeout, $window, cabinModulePath) {
            return {
                templateUrl: cabinModulePath + 'directives/cabin-caller/templates/caller.html',
                restrict: 'EA',
      scope: false, 
      link:function($scope){
        $scope.index=1;
        $scope.nownum=100001;
         var numout=200001;
         var numtai=100001;
         var numnor=300001;
        $scope.selectta=function(){
         $scope.index = 1;
         
          $scope.nownum=numtai;
        },
        $scope.selectou=function(){
         $scope.index = 2;
         
         $scope.nownum=numout;
        },
        $scope.selectno=function(){
         $scope.index = 3;
          
        $scope.nownum=numnor;
        },
        $scope.next=function(){
          $scope.nownum=parseInt($scope.nownum,10); 
          if( $scope.index == 1){
              $scope.nownum+=1;
               numtai=$scope.nownum;
          }
          else if( $scope.index == 2){
               $scope.nownum+=1;
               numout=$scope.nownum;
          }
          else if($scope.index == 3){
               $scope.nownum+=1;
               numnor=$scope.nownum;
          } 
        }
          $scope.recal=function(){
            alert($scope.nownum);
        }
         $scope.calnum=function(){
           if($scope.calnumber<100000){
             alert("查詢號碼錯誤,無法查詢");
           } 
           else if($scope.calnumber<200000 && $scope.calnumber>100000){
               $scope.nownum = $scope.calnumber;
               $scope.index = 1;
          }
           else if($scope.calnumber<300000 && $scope.calnumber>200000){
               $scope.nownum = $scope.calnumber;
               $scope.index = 2;
          }
           else if($scope.calnumber>300000 ){
               $scope.nownum = $scope.calnumber;
               $scope.index = 3;
          }
        }
      }
    }; 
        }
    ]);
});
