'use strict';

angular
    .module('ngForm')
    .directive('formRadio', function ($filter, $translate) {
        return {
            restrict: 'E',
            scope: {
                id: '@',
                label: '@',
                required: '@',
                state: '@',
                val: '=',
                error: '=',
                options: '='
            },
            controller: function($scope) {
                $scope.$watch('options', function(newValue, oldValue) {
                    if ($scope.val != null) {
                        var val = _(newValue).find(function(e) {
                            return e.id == $scope.val.id;
                        });
                        if (val != null) {
                            $scope.val = val;
                        }
                    }
                });

                $scope.isRead = function() {
                    return $scope.state && $scope.state == 'read' || $scope.$parent.state == 'read';
                };
                $scope.tooltip = {
                    title: $translate.instant($filter('translateToBlank')($scope.label + '_tooltip'))
                };
            },
            templateUrl: 'vendor/@sismics/ng-form/partial/form-radio.html'
        };
    });
