'use strict';

angular
    .module('ngForm')
    .directive('formTime', function ($filter, $translate) {
        return {
            restrict: 'E',
            scope: {
                id: '@',
                label: '@',
                required: '@',
                state: '@',
                val: '=',
                error: '='
            },
            controller: function($scope, $element) {
                $scope.mask = "99.99";
                $scope.tooltip = {
                    title: $translate.instant($filter('translateToBlank')($scope.label + '_tooltip'))
                };
                $scope.isRead = function() {
                    return $scope.state && $scope.state == 'read' || $scope.$parent.state == 'read';
                };
            },
            templateUrl: 'vendor/@sismics/ng-form/partial/form-text-mask.html'
        };
    });
