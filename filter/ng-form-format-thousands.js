'use strict';

angular
    .module('ngForm')
    .filter('formatBoolean', function($translate) {
        return function(v) {
            return v == 1 ?
            $translate.instant('label_yes') : $translate.instant('label_no');
        };
    });
