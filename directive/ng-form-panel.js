'use strict';

angular
    .module('ngForm')
    .component('formPanel', {
        bindings: {
            id: '@',
            label: '@',
            styles: '@'
        },
        transclude: true,
        require: {
            form: '^ngForm'
        },
        controller: function() {
            this.$onInit = function() {
                this.classes = this.form.panelStyles[this.styles || '2col'];
            };
        },
        templateUrl: 'vendor/@sismics/ng-form/partial/form-panel.html'
    });
