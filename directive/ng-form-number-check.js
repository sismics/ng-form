'use strict';

angular
    .module('ngForm')
    .directive('formNumberCheck', function() {
        return {
            require: 'ngModel',
            restrict: 'A',
            scope: {
                param: '='
            },
            link: function (scope, element, attrs, ngModelCtrl) {
                var param = scope.param || {};
                var pattern = new RegExp('^' +
                    (param.allowNegative ? '-?' : '') +
                    '[0-9]*' +
                    (param.allowDecimal ? '\.?[0-9]{0,2}' : '') +
                    '$');
                var minValue = attrs.minValue != '' ? Number(attrs.minValue) : null;
                var maxValue = attrs.maxValue != '' ? Number(attrs.maxValue) : null;
                ngModelCtrl.$parsers.push(function(viewValue) {
                    if (viewValue == null || param.allowNegative && viewValue == "-") {
                        return viewValue;
                    }
                    if (typeof viewValue == 'number' || viewValue.match(pattern)) {
                        if ((minValue == null || viewValue >= minValue) && (maxValue == null || viewValue <= maxValue)) {
                            return viewValue;
                        }
                    }
                    ngModelCtrl.$setViewValue(ngModelCtrl.$modelValue);
                    ngModelCtrl.$render();
                    return ngModelCtrl.$modelValue;
                });
            }
        };
    });
