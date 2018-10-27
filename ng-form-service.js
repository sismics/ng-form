'use strict';

angular
    .module('ngForm', [])
    .service('Form', function($filter, $locale, $translate, $rootScope, $alert) {
        /**
         * Returns the error label to display.
         *
         * @param data The errors
         * @param key Field key
         * @returns {string} Label to display
         */
        var label = function(data, key) {
            if (data.data[key] != null) {
                return data.data[key][0]['message'];
            }
            return '';
        };

        /**
         * Returns the variables of the error label.
         *
         * @param data The errors
         * @param key Field key
         * @returns {string} Variables
         */
        var variables = function(data, key) {
            if (data.data[key] != null) {
                var v = data.data[key][0]['variables'];
                if (v != null) {
                    return _.zipObject(_(_.range(v.length)).map(function (e) {
                        return "variable_" + e;
                    }).value(), v);
                }
            }
            return '';
        };

        var codes = {
            alpha: /[^a-z0-9]/gi,
            alphaDash: /[^a-z\-0-9]/gi
        };

        return {
            /**
             * Parse errors for a form and returns the association of all fields with the corresponding error label.
             *
             */
            parseError: function(data) {
                return {
                    /**
                     * Returns true if the field has an error.
                     *
                     * @param key Field key
                     * @returns Field has an error
                     */
                    hasError: function(key) {
                        return data.data[key] != null;
                    },

                    label: function(key) {
                        return label(data, key)
                    },

                    variables: function(key) {
                        return variables(data, key)
                    },

                    getClass: function(key) {
                        return this.hasError(key) ? 'error' : '';
                    }
                }
            },

            /**
             * Parse errors and returns error messages to display as a list.
             *
             */
            parseErrorList: function(data) {
                return {
                    all: function() {
                        return _(_(data.data).pairs()).map(function(e) {
                            var key = e[0];
                            return $translate.instant($filter('underscore')(label(data, key)), variables(data, key));
                        });
                    }
                }
            },

            formatIban: function(text) {
                var res = "";
                if (text != null) {
                    for (var i = 0; i < text.length; i++) {
                        res += text[i];
                        if (i % 4 == 3) {
                            res += " ";
                        }
                    }
                }
                return res;
            },

            yesNoOptions: function() {
                return [{
                    id: 'false',
                    title: $translate.instant('label_no'),
                    ngTransformer: 'boolean'
                }, {
                    id: 'true',
                    title: $translate.instant('label_yes'),
                    ngTransformer: 'boolean'
                }];
            },

            resetError: function() {
                $rootScope.error = {};
            },
            
            globalError: function() {
                $('#modal-confirm-delete').modal('hide'); // FIXME BAD, use directive
                $alert({
                    content: $translate.instant($filter('underscore')($rootScope.error.label('global')), $rootScope.error.variables('global')),
                    type: 'danger'
                });
            },

            codes: codes,

            toCode: function(str, codeAllow) {
                if (str == null) {
                    return null;
                }
                if (codeAllow == null) {
                    codeAllow = codes.alpha;
                }
                str = str.toLowerCase();
                str = str.replace(/[àáâãäå]/g, "a");
                str = str.replace(/[ìíïî]/g, "i");
                str = str.replace(/[èéêë]/g, "e");
                return str.replace(codeAllow, '');
            }
        };
    })
    .run(function($rootScope, $state, $stateParams, $timeout, Form) {
        $rootScope.Form = Form;
        $state.reload = function($scope) {
            return $state.transitionTo($state.current, $stateParams, {
                reload: true
            }).then(function() {
                $scope.hideContent = true;
                return $timeout(function() {
                    return $scope.hideContent = false;
                }, 1);
            });
        };
    });