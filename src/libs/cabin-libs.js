require.config({
    paths : {
      'libs': 'libs/libs',
      'cabin-notify': 'libs/modules/cabin-notify/cabin-notify'
    },
    shim : {
      'cabin-notify' : ['libs']
    }
});

define('cabin-libs', ['libs','cabin-notify'], function() {
    console.log('cabin-libs init');
});