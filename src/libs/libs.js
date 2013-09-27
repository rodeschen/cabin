require.config({
    paths : {
        'socket-io' : 'libs/components/socket.io-client/dist/socket.io.min',
        'angular' : 'libs/components/angular/angular',
        'angular-animate' : 'libs/components/angular-animate/angular-animate',
        'angular-resource' : 'libs/components/angular-resource/angular-resource',
        'angular-ui-router' : 'libs/components/angular-ui-router/release/angular-ui-router',
        'angular-socket-io' : 'libs/components/angular-socket-io/socket'
        
    },
    shim : {
        'angular-animate' : ['angular'],
        'angular-ui-router' : ['angular'],
        'angular-resource' : ['angular'],
        'angular-socket-io' :['socket-io', 'angular']
    }
});

define('libs', ['socket-io', 'angular', 'angular-animate', 'angular-resource', 'angular-ui-router', 'angular-socket-io'], function() {
    console.log('lib init');
});