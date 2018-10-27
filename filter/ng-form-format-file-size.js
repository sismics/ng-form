'use strict';

angular
    .module('ngForm')
    .filter('formatFileSizeBinary', function() {
        return function(bytes, precision) {
            if (isNaN(parseFloat(bytes)) || !isFinite(bytes)) {
                return '-';
            }
            if (typeof precision === 'undefined') {
                precision = 1;
            }
            var units = ['B', 'kiB', 'MiB', 'GiB', 'TiB', 'PiB'],
            number = Math.floor(Math.log(bytes) / Math.log(1024));
            return (bytes / Math.pow(1024, Math.floor(number))).toFixed(precision) +  ' ' + units[number];
        }
    })
    .filter('formatFileSize', function() {
        return function(bytes, precision) {
            if (isNaN(parseFloat(bytes)) || !isFinite(bytes)) {
                return '-';
            }
            if (typeof precision === 'undefined') {
                precision = 1;
            }
            var units = ['B', 'kB', 'MB', 'GB', 'TB', 'PB'],
            number = Math.floor(Math.log(bytes) / Math.log(1000));
            if (isNaN(parseFloat(number)) || !isFinite(number)) {
                return '0 ' + units[0];
            }
            return (bytes / Math.pow(1000, Math.floor(number))).toFixed(precision) + ' ' + units[number];
        }
    });
