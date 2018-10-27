'use strict';

angular
    .module('ngForm')
    .component('formTypeAhead', {
        bindings: {
            id: '@',
            label: '@',
            placeholder: '@',
            required: '@',
            state: '@',
            styles: '@',
            labelKey: '@',
            val: '=',
            error: '=',
            refresh: '='
        },
        require: {
            form: '^ngForm'
        },
        controller: function($filter, $translate) {
            var ctrl = this;
            this.$onInit = function() {
                ctrl.placeholder = ctrl.placeholder || this.label;
                ctrl.classes = ctrl.form.styles[ctrl.styles || 'full'];
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
            this.refreshItems = function(term) {
                if (term == '') {
                    ctrl.items = [];
                    return;
                }
                return ctrl.refresh(term).then(function(response) {
                    ctrl.items = _.map(response, function(e) {
                        return angular.extend(e, {ngTransformer: 'listItem'})
                    });
                });
            };
        },
        templateUrl: 'vendor/@sismics/ng-form/partial/form-type-ahead.html'
    });
