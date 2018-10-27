'use strict';

angular
    .module('ngForm')
    .filter('formatThousands', function() {
        return function(bytes, precision) {
            if (isNaN(parseFloat(bytes)) || !isFinite(bytes)) {
                return '-';
            }
            if (typeof precision === 'undefined') {
                precision = 0;
            }
            var units = ['', 'k', 'M', 'G', 'T', 'P'],
            number = Math.floor(Math.log(bytes) / Math.log(1000));
            return (bytes / Math.pow(1000, Math.floor(number))).toFixed(precision) +  ' ' + units[number];
        }
    });
