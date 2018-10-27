'use strict';

angular
    .module('ngForm')
    .component('ngForm', {
        bindings: {
            state: '='
        },
        controller: function() {
            this.showSearch = false;
            this.styles = {
                '1col': {
                    labelClass: 'col-md-2 col-sm-2 col-xs-12',
                    inputClass: 'col-md-3 col-sm-3 col-xs-12'
                },
                'full': {
                    labelClass: 'col-md-3 col-sm-3 col-xs-12',
                    inputClass: 'col-md-6 col-sm-6 col-xs-12'
                }
            }
        }
    });
