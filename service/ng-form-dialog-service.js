'use strict';

angular
    .module('ngForm')
    .service('FormDialog', function($modal, $rootScope) {
        return {
            confirm: function(param) {
                var ctrl = function() {
                    this.title = param.title;
                    this.label = param.label;
                    this.onConfirm = param.onConfirm;
                    this.item = param.item;
                };
                var modal = $modal(
                    angular.extend({
                        templateUrl: 'vendor/@sismics/ng-form/partial/form-dialog-confirm.html',
                        show: true,
                        onShow: function() {
                            modal.$element.find('.modal-confirm').focus();
                        },
                        controllerAs: '$ctrl',
                        controller: ctrl
                    }, param));
                return modal;
            },
            wait: function(param) {
                var ctrl = function() {
                    this.title = param.title || 'dialog_process_title';
                    this.label = param.label || 'dialog_process_label';
                };
                $rootScope.waitModal = $modal(
                    angular.extend({
                        templateUrl: 'vendor/@sismics/ng-form/partial/form-dialog-wait.html',
                        show: true,
                        keyboard: false,
                        backdrop: 'static',
                        controllerAs: '$ctrl',
                        controller: ctrl
                    },
                    param));
                return $rootScope.waitModal;
            }
        };
    });
