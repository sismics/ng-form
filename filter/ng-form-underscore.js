'use strict';

angular
    .module('ngForm')
    .filter('underscore', function() {
        return function(text) {
            return text.replace(/\./g, '_');
        };
    });
