'use strict';

angular
    .module('ngForm')
    .directive('formInplaceSelect', function ($filter, $state, $timeout, Auth) {
        return {
            restrict: 'E',
            scope: {
                write: '@',
                state: '@',
                val: '=',
                options: '=',
                onSubmit: '&'
            },
            controller: function($scope) {
                $scope.$watch('val', function(v) {
                    if (v != null) {
                        $scope.value = v.label;
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
                    if (e != null) {
                        e.stopPropagation();
                    }
                    $scope.val = $scope.oldVal;
                    $scope.isEditing = false;
                };
                $scope.focusEdit = function(e) {
                    e.stopPropagation();
                };
                $scope.submitEdit = function() {
                    $scope.isEditing = false;
                    $scope.onSubmit();
                };
                $scope.keyDown = function(e) {
                    if (e.keyCode == 13) {
                        $scope.submitEdit();
                    } else if (e.keyCode == 27) {
                        $scope.cancelEdit();
                    } else {
                        var id = $scope.val.id;
                        var option = findOptionByAlias(String.fromCharCode(e.keyCode).toLowerCase());
                        if (option == null) {
                            option = findOptionById(id);
                        }
                        if (option != null) {
                            $scope.val = option;
                            $scope.value = option.label;
                            $scope.triggerFocus = true;
                        }
                    }
                    e.preventDefault();
                    e.stopPropagation();
                };
                var findOptionById = function(id) {
                    return _($scope.options).find(function(e) {
                        return e.id == id;
                    });
                };
                var findOptionByAlias = function(c) {
                    return _($scope.options).find(function(e) {
                        return e.alias != null && e.alias.toLowerCase() == c;
                    });
                };
            },
            link: function(scope, element) {
                scope.$watch('triggerFocus', function(value) {
                    if (value === true) {
                        $timeout(function() {
                            element.find('input:first').selectRange(0, 0);
                            scope.triggerFocus = false;
                        });
                    }
                });
            },
            templateUrl: 'vendor/@sismics/ng-form/partial/form-inplace-text.html'
        };
    });
