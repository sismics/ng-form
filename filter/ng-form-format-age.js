'use strict';

angular
    .module('ngForm')
    .filter('formatAge', function(FormDate) {
        return function(date) {
            return FormDate.formatAge(date);
        };
    });
