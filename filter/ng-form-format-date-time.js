'use strict';

angular
    .module('ngForm')
    .filter('formatDateTime', function(FormDate) {
        return function(text, showTimeZone) {
            return FormDate.formatDateTime(text, showTimeZone);
        };
    });
