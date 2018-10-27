'use strict';

angular
    .module('ngForm')
    .component('formLocale', {
        bindings: {
            val: '='
        },
        require: {
            form: '^ngForm'
        },
        controller: function() {
            this.$onInit = function() {
                // FIXME query locale
                this.options = [
                    {id: 'fr', label: 'Français'},
                    {id: 'en', label: 'English'}
                ];
                this.val = this.options[0];
            };
        },
        templateUrl: 'vendor/@sismics/ng-form/partial/form-locale.html'
    });
