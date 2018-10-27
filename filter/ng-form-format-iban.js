'use strict';

angular
    .module('ngForm')
    .filter('formatIban', function(Form) {
        return function(text) {
            return Form.formatIban(text);
        };
    });
