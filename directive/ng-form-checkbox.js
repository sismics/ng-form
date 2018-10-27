'use strict';

angular
    .module('ngForm')
    .component('formCheckbox', {
        bindings: {
            id: '@',
            label: '@',
            required: '@',
            state: '@',
            val: '='
        },
        require: {
            form: '^ngForm'
        },
        controller: function($translate, $filter) {
            var ctrl = this;
            ctrl.tooltip = {
                title: $translate.instant($filter('translateToBlank')(ctrl.label + '_tooltip'))
            };
            ctrl.isRead = function() {
                return ctrl.state && ctrl.state == 'read' || ctrl.form.state == 'read';
            };
        },
        templateUrl: 'vendor/@sismics/ng-form/partial/form-checkbox.html'
    });
