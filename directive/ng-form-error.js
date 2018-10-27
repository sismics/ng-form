'use strict';

angular
    .module('ngForm')
    .directive('error', function () {
        return {
            restrict: 'E',
            scope: {
                error: '='
            },
            templateUrl: 'vendor/@sismics/ng-form/partial/global-error.html'
        };
    });
