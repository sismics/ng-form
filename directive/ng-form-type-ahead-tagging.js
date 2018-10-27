'use strict';

angular
    .module('ngForm')
    .component('formTypeAheadTagging', {
        bindings: {
            id: '@',
            label: '@',
            required: '@',
            state: '@',
            labelKey: '@',
            val: '=',
            error: '='
        },
        require: {
            form: '^ngForm'
        },
        controller: function($filter, $translate) {
            var ctrl = this;
            this.$onInit = function() {
                ctrl.labelKey = ctrl.labelKey || 'name';
            };
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
            this.items = [];
        },
        templateUrl: 'vendor/@sismics/ng-form/partial/form-type-ahead-tagging.html'
    });
