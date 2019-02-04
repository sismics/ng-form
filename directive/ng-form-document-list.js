'use strict';

angular
    .module('ngForm')
    .directive('formDocumentList', function ($filter, $translate, Env) {
        return {
            restrict: 'E',
            scope: {
                id: '@',
                required: '@',
                state: '@',
                val: '=',
                error: '='
            },
            controller: function($scope, $element) {
                $scope.sortableOptions = {
                    handle: '.handle'
                };
                $scope.tooltip = {
                    title: $translate.instant($filter('translateToBlank')($scope.label + '_tooltip'))
                };
                $scope.isRead = function() {
                    return $scope.state && $scope.state == 'read' || $scope.$parent.state == 'read';
                };
                $scope.addDocument = function(document) {
                    if ($scope.val == null) {
                        $scope.val = [];
                    }
                    $scope.val.push({
                        id: document.id,
                        filename: document.filename,
                        createDate: new Date().getTime(),
                        length: document.length,
                        temporary: true,
                        ngTransformer: 'listItem'});
                    $scope.$apply();
                };
                $scope.deleteDocument = function(document) {
                    if ($scope.val == null) {
                        $scope.val = [];
                    }
                    $scope.val = _($scope.val).reject(function(d) {
                        return d.id == document.id;
                    });
                    $scope.val = _($scope.val).reject(function(d) {
                        return d.id == document.id;
                    });
                };
            },
            link: function(scope, el, attr, ctrl) {
                $(el).find('input').change(function(evt) {
                    var inputId = $(this).attr('id');
                    if ($(this)[0].files.length < 1) {
                        $(el).find('.file-progress').html('');
                        return;
                    }
                    $(this).attr('disabled', 'disabled');
                    $(el).find('.file-progress').html($translate.instant('form_document_sending'));

                    var setPercentComplete = function(percentComplete) {
                        scope.percentComplete = percentComplete;
                        scope.$apply();
                    };

                    var formData = new FormData();
                    formData.append('file', $(this)[0].files[0]);
                    scope.currentUpload = $.ajax({
                        url: Env.apiUrl + 'document/upload',
                        type: 'POST',
                        data: formData,
                        processData: false,
                        contentType: false,
                        dataType: 'json',
                        cache: false,
                        xhr: function() {
                            var xhr = new window.XMLHttpRequest();
                            xhr.upload.addEventListener("progress", function(evt) {
                                if (evt.lengthComputable) {
                                    setPercentComplete(Math.round(100. * evt.loaded / evt.total))
                                }
                            }, false);
                            return xhr;
                        },
                        success: function(data) {
                            $(el).find('input').removeAttr('disabled');
                            $(el).find('input').val('');
                            scope.addDocument(data.document);
                            $(el).find('.file-progress').html($translate.instant('form_document_done'));
                            setPercentComplete(null);
                        },
                        fail: function(data) {
                            $(el).find('input').removeAttr('disabled');
                            $(el).find('input').val('');
                            setPercentComplete(null);
                            alert('Error uploading document');
                        },
                        always: function() {
                            $(el).find('input').removeAttr('disabled');
                            $(el).find('input').val('');
                            setPercentComplete(null);
                        }
                    });
                });
            },
            templateUrl: 'vendor/@sismics/ng-form/partial/form-document.html'
        };
    });
