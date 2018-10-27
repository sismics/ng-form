'use strict';

angular
    .module('ngForm')
    .component('formTextareaCode', {
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
        controller: function($filter, $translate) {
            var ctrl = this;
            this.tooltip = {
                title: $translate.instant($filter('translateToBlank')(this.label + '_tooltip'))
            };
            this.isRead = function() {
                return ctrl.state && ctrl.state == 'read' || ctrl.form.state == 'read';
            };
            this.editorOptions = {
                lineWrapping : true,
                lineNumbers: true,
                readOnly: ctrl.isRead() ? 'nocursor' : '',
                mode: 'shell'
            };
        },
        templateUrl: 'vendor/@sismics/ng-form/partial/form-textarea-code.html'
    });
