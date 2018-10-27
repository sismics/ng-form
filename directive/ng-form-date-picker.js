'use strict';

angular
    .module('ngForm')
    .component('formDatePicker', {
        bindings: {
            id: '@',
            label: '@',
            required: '@',
            state: '@',
            val: '=',
            error: '='
        },
        require: {
            form: '^ngForm'
        },
        controller: function($filter, $translate) {
            this.isRequired = function() {
                return this.$eval(this.required);
            };
            this.tooltip = {
                title: $translate.instant($filter('translateToBlank')(this.label + '_tooltip'))
            };
            this.isRead = function() {
                return this.state && this.state == 'read' || this.form.state == 'read';
            };
            this.open = function($event) {
                $($event.target).closest('.input-group').find('input:first').focus();
            }
        },
        templateUrl: 'vendor/@sismics/ng-form/partial/form-date-picker.html'
    });
