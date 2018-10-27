'use strict';

angular
    .module('ngForm')
    /**
     * Use this directive in addition to bs-typeahead.
     * The default behavious of bs-typeahead is to bind the value of the text field to a string when there is only a query string,
     * and to an object when the value is found.
     * The goal of this directive is to store the value in a consistent type, always object.
     */
    .directive('typeAheadParser', function() {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attrs, ngModelCtrl) {
                var parser = function(text) {
                    return typeof text == 'string' ? {
                        search: text
                    } : text;
                };
                ngModelCtrl.$parsers.push(parser);
            }
        };
    });
