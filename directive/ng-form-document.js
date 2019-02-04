'use strict';

angular
    .module('ngForm')
    .component('formDocument', {
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
            var _this = this;
            this.$postLink = function() {
                $timeout(function() {
                    var inputEl = $('#' + _this.id + '_field');
                    var el = $('#' + _this.id);
                    inputEl.change(function (evt) {
                        if (inputEl[0].files.length < 1) {
                            $(el).find('.file-progress').html('');
                            return;
                        }
                        $(el).find('.progress').show();
                        $(this).attr('disabled', 'disabled');
                        $(el).find('.file-progress').html($translate.instant('form_document_sending'));
                        $(el).find('.progress-bar').css({width: '0%'});

                        var setPercentComplete = function (percentComplete) {
                            if (percentComplete == null) {
                                $(el).find('.progress').hide();
                            } else {
                                $(el).find('.file-progress').html($translate.instant('form_document_sending') + ' ' + percentComplete + '%');
                                $(el).find('.progress-bar').css({width: + percentComplete + '%'});
                            }
                        };

                        var formData = new FormData();
                        formData.append('file', $(this)[0].files[0]);
                        _this.currentUpload = $.ajax({
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
                                        setPercentComplete(Math.round(100. * evt.loaded / evt.total))
                                    }
                                }, false);
                                return xhr;
                            },
                            success: function (data) {
                                inputEl.removeAttr('disabled');
                                inputEl.val('');
                                _this.setDocument(data.document);
                                setPercentComplete(null);
                                $(el).find('.file-progress').html($translate.instant('form_document_done'));
                            },
                            fail: function (data) {
                                inputEl.removeAttr('disabled');
                                inputEl.val('');
                                setPercentComplete(null);
                                alert('Error uploading document');
                            }
                        });
                    });
                });
            };
            this.tooltip = {
                title: $translate.instant($filter('translateToBlank')(this.label + '_tooltip'))
            };
            this.isRead = function() {
                return this.state && this.state == 'read' || this.form.state == 'read';
            };
            this.setDocument = function(document) {
                $scope.$apply(function() {
                    _this.val = {
                        id: document.id,
                        filename: document.filename,
                        createDate: new Date().getTime(),
                        length: document.length,
                        temporary: true,
                        ngTransformer: 'listItem'};
                });
            };
            this.deleteDocument = function(document) {
                this.val = {};
            };
        },
        templateUrl: 'vendor/@sismics/ng-form/partial/form-document.html'
    });
