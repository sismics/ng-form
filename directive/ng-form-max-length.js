'use strict';

angular
    .module('ngForm')
    .directive('formMaxlength', function() {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, ngModelCtrl) {
                if (attrs.formMaxlength != '') {
                    var maxlength = Number(attrs.formMaxlength);
                    var fromUser = function(text) {
                        if (text.length > maxlength) {
                            var transformedInput = text.substring(0, maxlength);
                            ngModelCtrl.$setViewValue(transformedInput);
                            ngModelCtrl.$render();
                            return transformedInput;
                        }
                        return text;
                    };
                    ngModelCtrl.$parsers.push(fromUser);
                }
            }
        };
    });
