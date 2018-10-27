'use strict';

angular
    .module('ngForm')
    .component('formRadioBoolean', {
        bindings: {
            id: '@',
            label: '@',
            required: '@',
            state: '@',
            val: '=',
            error: '='
        },
        require: {
            form: '^ngForm'
        },
        controller: function($filter, $translate) {
            var _this = this;
            this.$onInit = function() {
                this.options = [{
                    value: false,
                    label: $translate.instant('label_no'),
                    ngTransformer: 'boolean'
                }, {
                    value: true,
                    label: $translate.instant('label_yes'),
                    ngTransformer: 'boolean'
                }];

                if (this.val != null && typeof this.val == 'boolean') {
                    var val = _(this.options).find(function (e) {
                        return e.value == _this.val;
                    });
                    if (val != null) {
                        this.val = val;
                    }
                }
            };

            this.tooltip = {
                title: $translate.instant($filter('translateToBlank')(this.label + '_tooltip'))
            };
            this.isRead = function() {
                return this.state && this.state == 'read' || this.form.state == 'read';
            };
        },
        templateUrl: 'vendor/@sismics/ng-form/partial/form-radio.html'
    });
