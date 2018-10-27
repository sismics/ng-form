'use strict';

angular
    .module('ngForm')
    .directive('formPageTitle', function($rootScope, $timeout, $translate) {
        return {
            restrict: 'A',
            link: function(scope, element) {
                $rootScope.$on('$stateChangeStart', function(event, toState) {
                    var titleKey = 'app_title';
                    if (toState.data && toState.data.pageTitle) {
                        titleKey = toState.data.pageTitle;
                    }

                    // Set asynchronously so page changes before title does
                    $timeout(function() {
                        element.text($translate.instant(titleKey));
                    });
                });
            }
        };
    });
