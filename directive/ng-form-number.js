'use strict';

angular
    .module('ngForm')
    .directive('formNumber', function ($filter, $translate) {
        return {
            restrict: 'E',
            scope: {
                id: '@',
                label: '@',
                required: '@',
                minValue: '@',
                maxValue: '@',
                state: '@',
                param: '=',
                val: '=',
                error: '='
            },
            controller: function($scope, $element) {
                $scope.tooltip = {
                    title: $translate.instant($filter('translateToBlank')($scope.label + '_tooltip'))
                };
                $scope.isRead = function() {
                    return $scope.state && $scope.state == 'read' || $scope.$parent.state == 'read';
                };
            },
            templateUrl: 'vendor/@sismics/ng-form/partial/form-number.html'
        };
    });
