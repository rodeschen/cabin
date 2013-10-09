require.config({
    paths: {
        'cabin-notify': 'libs/modules/directives/cabin-notify'
    },
    shim: {
        'cabin-notify': ['libs', 'cabin']
    }
});
define('cabin-libs', ['libs', 'cabin'].concat(properties.useCabinLibs), function() {
    console.log("cabin-libs Initialized");
});