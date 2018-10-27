'use strict';

angular
    .module('ngForm')
    .component('formTypeAheadMultiple', {
        bindings: {
            id: '@',
            label: '@',
            required: '@',
            state: '@',
            labelKey: '@',
            placeholderKey: '@',
            val: '=',
            error: '=',
            refresh: '=',
            tagging: '='
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
                var placeholderKey = ctrl.placeholderKey || this.label + '_placeholder';
                var placeholder = $translate.instant($filter('translateToBlank')(placeholderKey));
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
                if (term == '' || _.isUndefined(ctrl.refresh)) {
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
        templateUrl: 'vendor/@sismics/ng-form/partial/form-type-ahead-multiple.html'
    });
