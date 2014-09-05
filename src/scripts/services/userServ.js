'use strict';
define(['custModule'], function(custModule) {
    custModule.service('userServ', ['$rootScope', '$http', '$q', 'iBranchServ',
        function($rootScope, $http, $q, iBranchServ) {
            var defer = $q.defer();
            var promise = defer.promise;
            var user = {
                userId: false
            };
            iBranchServ.send('000002', {
                "queryLogin": "true"
            }).success(function(data) {
                //  data = data[0] || {};
                //if (data.poc.userId) {
                if (data.txnData.userId) {
                    user = angular.extend(user, data.txnData);
                    defer.resolve(data.txnData);
                } else {
                    angular.extend(promise, {
                        userId: false
                    });
                    defer.reject({
                        userId: false
                    });
                }
            }).error(function() {
                angular.extend(promise, {
                    userId: false
                });
                defer.reject({
                    userId: false
                });
            });



            angular.extend(promise, {
                login: function(userId, password) {
                    return iBranchServ.send("0110", {
                        userid: userId,
                        password: password
                    }).then(function(data) {
                        data = data.data || {};
                        if (data.txnStatus == '1') {
                            console.log(data)
                            angular.extend(user, data.txnData);
                            $rootScope.isLogin = true;
                        } else {
                            $rootScope.isLogin = false;
                        }
                    }, function(data) {
                        console.log('error');
                    });
                },
                logout: function() {
                    return iBranchServ.send("0221", {
                        userid: user.userId,
                    }).then(function(data) {
                        user = {}
                        $rootScope.isLogin = false;
                    }, function(data) {
                        console.log('error');
                    });
                },
                getUser: function() {
                    return user;
                }
            })

            return promise;
        }
    ]);
});
