'use strict';

angular
    .module('ngForm')
    .filter('formatDate', function(FormDate) {
        return function(text, showTimeZone) {
            return FormDate.formatDate(text, showTimeZone);
        };
    });
