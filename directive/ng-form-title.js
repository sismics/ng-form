'use strict';

angular
    .module('ngForm')
    .directive('formTitle', function () {
        return {
            restrict: 'E',
            transclude: true,
            templateUrl: 'vendor/@sismics/ng-form/partial/form-title.html'
        };
    });
