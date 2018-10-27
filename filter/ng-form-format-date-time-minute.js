'use strict';

angular
    .module('ngForm')
    .filter('formatDateTimeMinute', function(FormDate) {
        return function(text) {
            return FormDate.formatDateTimeMinute(text);
        };
    });
