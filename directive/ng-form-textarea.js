'use strict';

angular
    .module('ngForm')
    .component('formTextarea', {
        bindings: {
            id: '@',
            label: '@',
            required: '@',
            maxlength: '@',
            state: '@',
            val: '='
        },
        require: {
            form: '^ngForm'
        },
        controller: function($translate, $filter) {
            this.tooltip = {
                title: $translate.instant($filter('translateToBlank')(this.label + '_tooltip'))
            };
            this.isRead = function() {
                return this.state && this.state == 'read' || this.form.state == 'read';
            };
        },
        templateUrl: 'vendor/@sismics/ng-form/partial/form-textarea.html'
    });
