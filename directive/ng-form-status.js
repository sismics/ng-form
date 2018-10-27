'use strict';

angular
    .module('ngForm')
    .component('formStatus', {
        bindings: {
            id: '@',
            label: '@',
            val: '='
        },
        require: {
            form: '^ngForm'
        },
        controller: function($translate, $filter, Form) {
            var ctrl = this;
            this.Form = Form;
            this.tooltip = {
                title: $translate.instant($filter('translateToBlank')(this.label + '_tooltip'))
            };
            this.isError = function() {
                return ctrl.val && !ctrl.val.status
            };
            this.isSuccess = function() {
                return ctrl.val && ctrl.val.status == 'ok'
            }
        },
        templateUrl: 'vendor/@sismics/ng-form/partial/form-status.html'
    });
