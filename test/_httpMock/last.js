'use strict';
define(['cabin'], function(cabin) {
    cabin.run(['$httpBackend',
        function($httpBackend) {
            //other all pass
             $httpBackend.whenGET(/^.*/).passThrough();
             $httpBackend.whenPOST(/^.*/).passThrough();
        }
    ]);
});
