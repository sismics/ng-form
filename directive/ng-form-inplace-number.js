'use strict';

angular
    .module('ngForm')
    .directive('formInplaceNumber', function ($filter, $state, $timeout, Auth) {
        return {
            restrict: 'E',
            scope: {
                write: '@',
                state: '@',
                param: '=',
                minValue: '@',
                maxValue: '@',
                val: '=',
                onSubmit: '&'
            },
            controller: function($scope) {
                $scope.$watch('val', function(v) {
                    if (v != null) {
                        $scope.value = v;
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
                    e.stopPropagation();
                    $scope.oldVal = $scope.val;
                    $scope.triggerFocus = true;
                    $scope.isEditing = true;
                };
                $scope.cancelEdit = function(e) {
                    if (!$scope.isEditing) {
                        return;
                    }
                    $scope.val = $scope.oldVal;
                    $scope.value = $scope.oldVal;
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
                };
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
            templateUrl: 'vendor/@sismics/ng-form/partial/form-inplace-number.html'
        };
    });
