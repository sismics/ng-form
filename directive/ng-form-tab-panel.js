'use strict';

angular
    .module('ngForm')
    .component('formTabPanel', {
        bindings: {
            tabs: '=',
            activeTab: '@'
        },
        controller: function($translate, $filter) {
        },
        templateUrl: 'vendor/@sismics/ng-form/partial/form-tab-panel.html'
    });
