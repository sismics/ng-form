'use strict';

angular
    .module('ngForm')
    .component('formSelect', {
        bindings: {
            id: '@',
            label: '@',
            required: '@',
            state: '@',
            detail: '@',
            detailSref: '@',
            labelKey: '@',
            styles: '@',
            val: '=',
            error: '=',
            options: '='
        },
        require: {
            form: '^ngForm'
        },
        controller: function($filter, $translate, $state, Auth) {
            this.$onInit = function() {
                this.classes = this.form.styles[this.styles || 'full'];
            };
            this.labelKey = this.labelKey || 'label';
            this.tooltip = {
                title: $translate.instant($filter('translateToBlank')(this.label + '_tooltip'))
            };
            this.isRead = function() {
                return this.state && this.state == 'read' || this.form.state == 'read';
            };
            this.detailHref = function() {
                return this.val && this.val.id && $state.href(this.detailSref, {id: this.val.id});
            };
            this.isDetail = function() {
                return this.detail && Auth.check(this.detail);
            };
        },
        templateUrl: 'vendor/@sismics/ng-form/partial/form-select.html'
    });
