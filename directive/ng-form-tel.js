'use strict';

angular
    .module('ngForm')
    .service('FormTel', function() {
        /**
         * Format a phone number according to a single mask.
         *
         * @param tel Phone number to format
         * @param mask Mask
         * @returns {string} Formatted phone number
         */
        var applyMask = function(tel, mask) {
            var i = 0;
            var j = 0;
            var s = '';
            while (i < tel.length && j < mask.length) {
                if (mask[j] == ' ') {
                    s += ' ';
                    j++;
                } else {
                    s += tel[i];
                    i++;
                    j++;
                }
            }
            return s;
        };

        /**
         * Detect a telephone prefix and formats the number accordingly.
         *
         * @param tel Phone number to format (ex. +41123456789)
         * @returns {*} Formatted phone number (ex. +41 12 345 67 89)
         */
        var formatTel = function(tel) {
            if (tel == null) {
                return null;
            }
            var formats = [
                { pattern: /^\+41\d+$/, mask:'+99 99 999 99 99' },
                { pattern: /^\+33\d+$/, mask:'+99 9 99 99 99 99' }
            ];
            for (var i = 0; i < formats.length; i++) {
                if (tel.match(formats[i].pattern)) {
                    return applyMask(tel, formats[i].mask);
                }
            }
            return tel;
        };

        return {
            formatTel: formatTel
        };
    })
    .directive('formTel', function ($filter, $translate, $timeout) {
        return {
            restrict: 'E',
            scope: {
                id: '@',
                label: '@',
                required: '@',
                state: '@',
                val: '=',
                error: '='
            },
            controller: function($scope) {
                $scope.tooltip = {
                    title: $translate.instant($filter('translateToBlank')($scope.label + '_tooltip'))
                };
                $scope.isRead = function() {
                    return $scope.state && $scope.state == 'read' || $scope.$parent.state == 'read';
                };
                $scope.onFocus = function(e) {
                    if ($scope.val == null || typeof $scope.val == 'string' && $scope.val.trim() == '') {
                        $scope.val = '+';
                        $scope.triggerFocus = true;
                    }
                    e.stopPropagation();
                };
                $scope.onBlur = function(e) {
                    if (typeof $scope.val == 'string' && $scope.val.trim() == '+') {
                        $scope.val = null;
                    }
                    e.stopPropagation();
                };
            },
            link: function(scope, e) {
                scope.$watch('triggerFocus', function(value) {
                    if (value === true) {
                        $timeout(function() {
                            $(e).find('input').moveCursorToEnd();
                            scope.triggerFocus = false;
                        });
                    }
                });
            },
            templateUrl: 'vendor/@sismics/ng-form/partial/form-tel.html'
        };
    })
    .directive('formTelFormat', function(FormTel) {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, ngModelCtrl) {
                var parser = function (val) {
                    var model = val
                        .replace(/([^\d\+]+)/g, '')
                        .substr(0, 14);
                    var viewValue = FormTel.formatTel(model);
                    ngModelCtrl.$setViewValue(viewValue);
                    $(element).val(ngModelCtrl.$viewValue);
                    return viewValue.replace(/([^\d\+]+)/g, '');
                };

                var formatter = function (val) {
                    return FormTel.formatTel(val);
                };

                ngModelCtrl.$parsers.push(parser);
                ngModelCtrl.$formatters.push(formatter);
            }
        };
    });