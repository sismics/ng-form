'use strict';

angular
    .module('ngForm')
    .component('formDocumentDropbox', {
        bindings: {
            id: '@',
            label: '@',
            required: '@',
            state: '@',
            showInline: '@',
            val: '='
        },
        require: {
            form: '^ngForm'
        },
        controller: function($filter, $translate, Env, $timeout, $scope) {
            var ctrl = this;
            ctrl.startUpload = function() {
                ctrl.val = [];
                ctrl.upload(ctrl.filesToUpload);
            };
            ctrl.$onInit = function() {
                ctrl.showProgress = false;
            };
            ctrl.setPercentComplete = function (percentComplete) {
                if (percentComplete == null) {
                    ctrl.showProgress = false;
                } else {
                    ctrl.progressLabel = $translate.instant('form_document_sending') + ' ' + percentComplete + '%';
                    ctrl.progressBarStyle = {
                        'width': percentComplete + '%'
                    };
                }
            };
            ctrl.upload = function(files) {
                if (!files || files.length < 1) {
                    $scope.$apply(function() {
                        ctrl.finishUpload();
                    });
                    return;
                }
                var file = files.pop();
                ctrl.showProgress = true;
                ctrl.inputDisabled = true;
                ctrl.progressLabel = $translate.instant('form_document_sending');
                ctrl.progressBarStyle = {
                    'width': '0%'
                };

                var formData = new FormData();
                formData.append('file', file);
                ctrl.currentUpload = $.ajax({
                    url: Env.apiUrl + 'document/upload',
                    type: 'POST',
                    data: formData,
                    processData: false,
                    contentType: false,
                    dataType: 'json',
                    cache: false,
                    headers: {
                        'Authorization': 'Basic ' + btoa(Env.apiLogin + ':' + Env.apiPassword)
                    },
                    xhr: function () {
                        var xhr = new window.XMLHttpRequest();
                        xhr.upload.addEventListener("progress", function (evt) {
                            if (evt.lengthComputable) {
                                $scope.$apply(function() {
                                    ctrl.setPercentComplete(Math.round(100. * evt.loaded / evt.total));
                                });
                            }
                        }, false);
                        return xhr;
                    },
                    success: function (data) {
                        ctrl.addDocument(data.document);
                        $scope.$apply(function() {
                            ctrl.finishUpload();
                            ctrl.progressLabel = $translate.instant('form_document_done');
                        });
                        ctrl.upload(files);
                    },
                    fail: function (data) {
                        $scope.$apply(function() {
                            ctrl.finishUpload();
                        });
                        alert('Error uploading document');
                        ctrl.upload(files);
                    }
                });
            };
            this.finishUpload = function() {
                ctrl.inputDisabled = false;
                ctrl.setPercentComplete(null);
            };
            this.tooltip = {
                title: $translate.instant($filter('translateToBlank')(this.label + '_tooltip'))
            };
            this.isRead = function() {
                return this.state && this.state == 'read' || this.form.state == 'read';
            };
            this.addDocument = function(document) {
                $scope.$apply(function() {
                    ctrl.val.push({
                        id: document.id,
                        filename: document.filename,
                        createDate: new Date().getTime(),
                        length: document.length,
                        temporary: true,
                        ngTransformer: 'listItem'
                    });
                });
            };
            this.deleteDocument = function(document) {
                this.val = {};
            };
        },
        templateUrl: 'vendor/@sismics/ng-form/partial/form-document-dropbox.html'
    });
