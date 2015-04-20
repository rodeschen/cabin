'use strict';
require.config({
    'paths': {
        // Directives
        'cabinDirectivesModule': 'libs/modules/directives/module',
        'cbBehavior': 'libs/modules/directives/cabin-behavior/cabin-behavior',
        'cbSplitter': 'libs/modules/directives/cabin-splitter/cabin-splitter',
        'cbNotify': 'libs/modules/directives/cabin-notify/cabin-notify',
        'cbPhrase': 'libs/modules/directives/cabin-phrase/cabin-phrase',
        'cbMarquee': 'libs/modules/directives/cabin-marquee/cabin-marquee',
        'cbCaller': 'libs/modules/directives/cabin-caller/cabin-caller',
        'cbTopMenu': 'libs/modules/directives/cabin-topMenu/cabin-topMenu',
        'cbSideMenu': 'libs/modules/directives/cabin-sideMenu/cabin-sideMenu',
        'cbPageViewer': 'libs/modules/directives/cabin-pageViewer/cabin-pageViewer',
        'cbGrid': 'libs/modules/directives/cabin-grid/cabin-grid',
        'cbComboBox': 'libs/modules/directives/cabin-comboBox/cabin-comboBox',
        'cbMaskNumber': 'libs/modules/directives/cabin-mask/cabin-mask-number',
        'cbSocketStatus': 'libs/modules/directives/cabin-socketStatus/cabin-socketStatus',
        'cbTreeView': 'libs/modules/directives/cabin-treeView/cabin-treeView'



    },
    'shim': {
        'cabinDirectivesModule': ['libs', 'cabin-core'],
        'cbBehavior': ['libs', 'cabinDirectivesModule'],
        'cbSplitter': ['libs', 'cabinDirectivesModule'],
        'cbNotify': ['libs', 'cabinDirectivesModule'],
        'cbPhrase': ['libs', 'cabinDirectivesModule'],
        'cbMarquee': ['libs', 'cabinDirectivesModule'],
        'cbCaller': ['libs', 'cabinDirectivesModule'],
        'cbComboBox': ['libs', 'cabinDirectivesModule'],
        'cbTopMenuBar': ['libs', 'cabinDirectivesModule'],
        'cbGrid': ['libs', 'cabinDirectivesModule'],
        'cbPageViewer': ['libs', 'cabinDirectivesModule'],
        'cbSideBar': ['libs', 'cabcabinDirectivesModulein'],
        'cbTreeView': ['libs', 'cabinDirectivesModule']
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
    'cbNotify',
    'cbMarquee',
    'cbPhrase',
    'cbCaller',
    'cbTreeView',
], function(libs, cabinDirectivesModule) {
    console.log('cabin-directives-libs Initialized');
});
