'use strict';

angular
    .module('ngForm')
    .directive('formColorPicker', function ($filter, $translate) {
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
            controller: function($scope) {
                $scope.tooltip = {
                    title: $translate.instant($filter('translateToBlank')($scope.label + '_tooltip'))
                };
                $scope.isRead = function() {
                    return $scope.state && $scope.state == 'read' || $scope.$parent.state == 'read';
                };
            },
            templateUrl: 'vendor/@sismics/ng-form/partial/form-color-picker.html'
        };
    });
