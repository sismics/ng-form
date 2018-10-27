'use strict';

angular
    .module('ngForm')
    .directive('formInplaceMoney', function ($filter, $state, $timeout, Auth) {
        return {
            restrict: 'E',
            scope: {
                write: '@',
                state: '@',
                val: '=',
                param: '=',
                onSubmit: '&'
            },
            controller: function($scope, $element) {
                $scope.$watch('val', function(v) {
                    if (v != null) {
                        if (typeof v == 'number') {
                            $scope.value = $filter('currency')(v, '');
                        } else {
                            $scope.value = v;
                        }
                    }
                });
                $scope.isEditing = false;
                $scope.isRead = function() {
                    return $scope.state && $scope.state == 'read' ||
                        $scope.write && !Auth.check($scope.write);
                };
                $scope.edit = function(e) {
                    if ($scope.isRead()) {
                        return;
                    }
                    $element.find('input').maskMoney(angular.extend({
                        thousands: "'",
                        allowZero: true
                    }, $scope.param));
                    $element.find('input').maskMoney('mask');
                    e.stopPropagation();
                    $scope.oldVal = $scope.val;
                    $scope.triggerFocus = true;
                    $scope.isEditing = true;
                };
                $scope.cancelEdit = function(e) {
                    if (!$scope.isEditing) {
                        return;
                    }
                    $element.find('input').maskMoney('destroy');
                    $scope.val = $scope.oldVal;
                    $scope.value = $filter('currency')($scope.oldVal, '');
                    if (e != null) {
                        e.stopPropagation();
                    }
                    $scope.isEditing = false;
                };
                $scope.focusEdit = function(e) {
                    e.stopPropagation();
                };
                $scope.submitEdit = function() {
                    $scope.val = $scope.value;
                    $scope.isEditing = false;
                    $scope.onSubmit();
                    $element.find('input').maskMoney('destroy');
                };
                $scope.keyUp = function(e) {
                    if (e.keyCode == 13) {
                        $scope.submitEdit();
                    } else if (e.keyCode == 27) {
                        $scope.cancelEdit();
                    } else {
                        $scope.val = $(e.target).val();
                    }
                    e.stopPropagation();
                }
            },
            link: function(scope, element) {
                scope.$watch('triggerFocus', function(value) {
                    if (value === true) {
                        $timeout(function() {
                            element.find('input:first').selectAll();
                            scope.triggerFocus = false;
                        });
                    }
                });
            },
            templateUrl: 'vendor/@sismics/ng-form/partial/form-inplace-text.html'
        };
    });
