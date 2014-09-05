'use strict';
require.config({
    'paths': {
        // Directives
        'cabinDirectivesModule': 'libs/modules/directives/module',
        'cbBehavior': 'libs/modules/directives/cabin-behavior/cabin-behavior',
        'cbSplitter': 'libs/modules/directives/cabin-splitter/cabin-splitter',
        'cbNotify': 'libs/modules/directives/cabin-notify/cabin-notify',
        'cbTopMenu': 'libs/modules/directives/cabin-topMenu/cabin-topMenu',
        'cbSideMenu': 'libs/modules/directives/cabin-sideMenu/cabin-sideMenu',
        'cbPageViewer': 'libs/modules/directives/cabin-pageViewer/cabin-pageViewer',
        'cbGrid': 'libs/modules/directives/cabin-grid/cabin-grid',
        'cbComboBox': 'libs/modules/directives/cabin-comboBox/cabin-comboBox',
        'cbMaskNumber': 'libs/modules/directives/cabin-mask/cabin-mask-number',
        'cbSocketStatus': 'libs/modules/directives/cabin-socketStatus/cabin-socketStatus'
    },
    'shim': {
        'cabinDirectivesModule' : ['libs','cabin-core'],
        'cbBehavior': ['libs', 'cabinDirectivesModule'],
        'cbSplitter': ['libs', 'cabinDirectivesModule'],
        'cbNotify': ['libs', 'cabinDirectivesModule'],
        'cbComboBox': ['libs', 'cabinDirectivesModule'],
        'cbTopMenuBar': ['libs', 'cabinDirectivesModule'],
        'cbGrid': ['libs', 'cabinDirectivesModule'],
        'cbPageViewer': ['libs', 'cabinDirectivesModule'],
        'cbSideBar': ['libs', 'cabcabinDirectivesModulein']
    }
});

define([
    // *** directive preload ***
    'cabinDirectivesModule',
    'cbBehavior',
    'cbComboBox',
    'cbSplitter',
    'cbMaskNumber',
    'cbPageViewer',
    'cbGrid',
    'cbNotify'
], function(libs, cabinDirectivesModule) {
    console.log('cabin-directives-libs Initialized');
});
