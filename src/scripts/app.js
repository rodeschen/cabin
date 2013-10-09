define('app', ['cabin'], function(cabin) {
    return cabin.run(['$rootScope',
        function($rootScope) {
            $rootScope.$on("broadcast", function(ev, args) {
                $rootScope.$broadcast(args.event, args);
            });
        }
    ]);
})