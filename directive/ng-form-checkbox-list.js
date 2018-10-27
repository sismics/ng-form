'use strict';

angular
    .module('ngForm')
    .component('formCheckboxList', {
        bindings: {
            id: '@',
            label: '@',
            required: '@',
            state: '@',
            labelKey: '@',
            val: '=',
            error: '=',
            options: '='
        },
        require: {
            form: '^ngForm'
        },
        controller: function($filter, $translate) {
            this.labelKey = this.labelKey || 'label';
            this.tooltip = {
                title: $translate.instant($filter('translateToBlank')(this.label + '_tooltip'))
            };
            this.isRead = function() {
                return this.state && this.state == 'read' || this.form.state == 'read';
            };
            this.isChecked = function(option) {
                var findElement = function(e) {
                    return e.id == option.id;
                };
                return _(this.val).find(findElement);
            };
            this.toggle = function(option) {
                var findElement = function(e) {
                    return e.id == option.id;
                };
                var e = _(this.val).find(findElement);
                if (e != null) {
                    this.val = _(this.val).reject(findElement);
                } else {
                    this.val.push({id: option.id});
                }
            }
        },
        templateUrl: 'vendor/@sismics/ng-form/partial/form-checkbox-list.html'
    });
