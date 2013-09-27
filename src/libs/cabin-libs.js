require.config({
    paths : {
      'libs': 'libs/libs'
    },
    shim : {
      
    }
});

define('cabin-libs', ['libs'], function() {
    console.log('cabin-libs init');
});