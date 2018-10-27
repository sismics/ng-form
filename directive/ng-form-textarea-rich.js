'use strict';

angular
    .module('ngForm')
    .component('formTextareaRich', {
        bindings: {
            id: '@',
            label: '@',
            required: '@',
            maxlength: '@',
            state: '@',
            val: '=',
            error: '='
        },
        require: {
            form: '^ngForm'
        },
        controller: function($filter, $translate) {
            this.tooltip = {
                title: $translate.instant($filter('translateToBlank')(this.label + '_tooltip'))
            };
            this.isRead = function() {
                return this.state && this.state == 'read' || this.form.state == 'read';
            };
            this.tinymceOptions = {
                skin : 'light',
                resize: false,
                plugins: 'textcolor link anchor table visualblocks',
                menubar: false,
                toolbar1: "undo redo | bold italic underline strikethrough | forecolor backcolor | visualblocks | alignleft aligncenter alignright alignjustify | formatselect",
                toolbar2: "outdent indent blockquote | bullist numlist | link unlink anchor | undo redo | table | hr",
                toolbar_items_size: 'small',
                statusbar: false
            };
        },
        templateUrl: 'vendor/@sismics/ng-form/partial/form-textarea-rich.html'
    });
