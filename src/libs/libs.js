require.config({
    paths: {
        'jquery': 'libs/components/jquery/jquery',
        'socket-io': 'libs/components/socket.io-client/dist/socket.io.min',
        'angular': 'libs/components/angular/angular',
        'angular-animate': 'libs/components/angular-animate/angular-animate',
        'angular-resource': 'libs/components/angular-resource/angular-resource',
        'angular-sanitize': 'libs/components/angular-sanitize/angular-sanitize',
        'angular-ui-router': 'libs/components/angular-ui-router/release/angular-ui-router',
        'angular-socket-io': 'libs/components/angular-socket-io/socket',
        'angular-ui-bootstrap': 'libs/components/angular-bootstrap/ui-bootstrap',
        'angular-ui-utils': 'libs/components/angular-ui-utils/components/angular-ui-docs/build/ui-utils',
        'angular-ui-utils-hiv': 'libs/components/angular-ui-utils/components/angular-ui-docs/build/ui-utils-ieshiv.min'
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
        'angular-ui-utils-hiv': ['angular']
    }
});

define('libs', ['jquery', 'socket-io', 'angular', 'angular-animate', 'angular-sanitize', 'angular-resource', 'angular-ui-router', 'angular-socket-io', 'angular-ui-bootstrap', 'angular-ui-utils', 'angular-ui-utils-hiv'], function() {
    console.log('libs Initialized');
});
