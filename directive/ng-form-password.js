'use strict';

angular
    .module('ngForm')
    .component('formPassword', {
        bindings: {
            id: '@',
            label: '@',
            required: '@',
            val: '='
        },
        require: {
            form: '^ngForm'
        },
        controller: function($filter, $translate) {
            this.tooltip = {
                title: $translate.instant($filter('translateToBlank')(this.label + '_tooltip'))
            };
            this.placeholder = function() {
                var placeholder = $translate.instant($filter('translateToBlank')(this.label + '_placeholder'));
                if (placeholder == '') {
                    placeholder = $translate.instant(this.label);
                }
                return placeholder;
            };
            this.isRead = function() {
                return this.state && this.state == 'read' || this.form.state == 'read';
            };
        },
        templateUrl: 'vendor/@sismics/ng-form/partial/form-password.html'
    });
