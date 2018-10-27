'use strict';

angular
    .module('ngForm')
    .filter('formatJson', function() {
        return function(text) {
            return JSON.stringify(text, null, 4);
        };
    });
