'use strict';

angular
    .module('ngForm')
    .component('formDateTimePicker', {
        bindings: {
            id: '@',
            label: '@',
            required: '@',
            state: '@',
            val: '=',
            error: '=',
            dateFormat: '@'
        },
        require: {
            form: '^ngForm'
        },
        controller: function($filter, $translate, $locale) {
            var ctrl = this;
            this.$onInit = function() {
                ctrl.dateFormat = ctrl.dateFormat || $locale.DATETIME_FORMATS.dateTimeMinute;
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
            this.format = function(val) {
                return $filter('date')(val, this.dateFormat, 'UTC');
            }
        },
        templateUrl: 'vendor/@sismics/ng-form/partial/form-date-time-picker.html'
    });
