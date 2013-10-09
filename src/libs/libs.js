require.config({
    paths : {
        'jquery' : 'libs/components/jquery/jquery',
        'socket-io' : 'libs/components/socket.io-client/dist/socket.io.min',
        'angular' : 'libs/components/angular/angular',
        'angular-animate' : 'libs/components/angular-animate/angular-animate',
        'angular-resource' : 'libs/components/angular-resource/angular-resource',
        'angular-sanitize' : 'libs/components/angular-sanitize/angular-sanitize',
        'angular-ui-router' : 'libs/components/angular-ui-router/release/angular-ui-router',
        'angular-socket-io' : 'libs/components/angular-socket-io/socket'
        
    },
    shim : {
        'angular': ['jquery'],
        'angular-animate' : ['angular'],
        'angular-ui-router' : ['angular'],
        'angular-resource' : ['angular'],
        'angular-sanitize' : ['angular'],
        'angular-socket-io' :['socket-io', 'angular']
    }
});

define('libs', ['jquery', 'socket-io', 'angular', 'angular-animate', 'angular-sanitize', 'angular-resource', 'angular-ui-router', 'angular-socket-io'], function() {
    console.log('libs Initialized');
});