'use strict';

angular
    .module('ngForm')
    .filter('translateToBlank', function($translate) {
        return function(key) {
            var translation = $translate.instant(key);
            if (translation == key) {
                return "";
            } else {
                return translation;
            }
        };
    });
