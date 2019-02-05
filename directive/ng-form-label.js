'use strict';

angular
    .module('ngForm')
    .component('formLabel', {
        bindings: {
            label: '@',
            val: '@'
        },
        require: {
            form: '^ngForm'
        },
        controller: function($filter, $translate) {
            var ctrl = this;
            this.tooltip = {
                title: $translate.instant($filter('translateToBlank')(this.label + '_tooltip'))
            };
        },
        templateUrl: 'vendor/@sismics/ng-form/partial/form-label.html'
    });
