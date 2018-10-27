'use strict';

angular
    .module('ngForm')
    .directive('formUpperCase', function(Form) {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, ngModelCtrl) {
                var parser = function (val) {
                    var model = val.toUpperCase();
                    ngModelCtrl.$setViewValue(model);
                    $(element).val(ngModelCtrl.$viewValue);
                    return model;
                };

                ngModelCtrl.$parsers.push(parser);
            }
        };
    });
