require.config({
    paths: {
        'jquery': 'libs/components/jquery/jquery',
        'socket-io': 'libs/components/socket.io-client/dist/socket.io',
        'angular': 'libs/components/angular/angular',
        'angular-animate': 'libs/components/angular-animate/angular-animate',
        'angular-resource': 'libs/components/angular-resource/angular-resource',
        'angular-sanitize': 'libs/components/angular-sanitize/angular-sanitize',
        'angular-socket-io': 'libs/components/angular-socket-io/socket',
        'angular-ui-router': 'libs/components/angular-ui-router/release/angular-ui-router',
        'angular-ui-bootstrap': 'libs/components/angular-bootstrap/ui-bootstrap',
        'angular-ui-utils': 'libs/components/angular-ui-utils/ui-utils',
        'angular-ui-utils-hiv': 'libs/components/angular-ui-utils/ui-utils-ieshiv.min',
        // 'tether-utils': 'libs/components/tether/js/utils',
        // 'tether': 'libs/components/tether/js/tether',
        'angular-validation' : 'libs/components/angular-validation/dist/angular-validation',
        //'angular-tooltip': 'libs/components/angular-tooltip/src/angular-tooltip',

        'angular-modal': 'libs/components-fixed/angular-modal',

        //poc
        //deviceAgent
        //'xmlRPC': 'libs/modules/services/cabin-deviceAgent/libs/vcXMLRPC',
        //'xmlRPC' : 'libs/components/mimic',
        //'xmlRPC': 'libs/components/mimic',
        'xmlRPC': 'libs/components/jquery-xmlrpc/jquery.xmlrpc',
    },
    shim: {
        'angular': ['jquery'],
        'angular-animate': ['angular'],
        'angular-ui-router': ['angular'],
        'angular-resource': ['angular'],
        'angular-sanitize': ['angular'],
        'angular-socket-io': ['socket-io', 'angular'],
        'angular-ui-bootstrap': ['angular'],
        'angular-ui-utils': ['angular'],
        'angular-ui-utils-hiv': ['angular'],
        'angular-validation' :['angular'],
        'angular-modal': ['angular'],
       // 'tether': ['tether-utils'],
        //'angular-tooltip': ['angular', 'tether'],
        'xmlRPC': ['jquery']
    }
});

define('libs', ['jquery',
    'xmlRPC',
    'socket-io',
    'angular',
    'angular-animate',
    'angular-sanitize',
    'angular-resource',
    'angular-ui-router',
    'angular-socket-io',
    'angular-ui-bootstrap',
    'angular-ui-utils',
    'angular-ui-utils-hiv',
    'angular-validation',
    // 'tether-utils',
    // 'tether',
    //'angular-tooltip',
    'angular-modal'
], function() {
    console.log('libs Initialized');
});
