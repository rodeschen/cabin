'use strict';
define(['cabin'], function(cabin) {
    return [['service', 'userServ', ['$rootScope', '$http', '$q', 'iBranchServ',
        function($rootScope, $http, $q, iBranchServ) {
            var defer = $q.defer();
            var promise = defer.promise;
            var user = {
                userId: false
            };
            iBranchServ.send('000002').success(function(data) {
                user = angular.extend(user, data);
                console.log(user)
                defer.resolve(data);
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
                    return iBranchServ.send("000001", {
                        userId: userId,
                        password: password
                    }).then(function(data) {
                        angular.extend(user, data.data);
                        $rootScope.isLogin = true;
                    }, function(data) {
                        console.log('error');
                    });
                },
                logout: function() {
                    return iBranchServ.send("000003", {
                        userId: user.userId,
                    }).then(function(data) {
                        angular.extend(user, {
                            user: false
                        });
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
    ]]];
});
