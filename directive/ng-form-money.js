'use strict';

angular
    .module('ngForm')
    .directive('formMoney', function ($filter, $translate) {
        return {
            restrict: 'E',
            scope: {
                id: '@',
                label: '@',
                required: '@',
                state: '@',
                param: '=',
                val: '=',
                error: '='
            },
            controller: function($scope, $element) {
                $scope.isRead = function() {
                    return $scope.state && $scope.state == 'read' || $scope.$parent.state == 'read';
                };
                $scope.tooltip = {
                    title: $translate.instant($filter('translateToBlank')($scope.label + '_tooltip'))
                };
                $scope.$watch("val", function(v) {
                    if (typeof v == 'number') {
                        $scope.val = $filter('currency')(v, '');
                    }
                });
            },
            link: function(scope, el, attr, ctrl) {
                $(el).find('input').maskMoney(angular.extend({
                    thousands: "'",
                    allowZero: true
                }, scope.param));
                $(el).find('input').maskMoney('mask');
            },
            templateUrl: 'vendor/@sismics/ng-form/partial/form-text.html'
        };
    });
