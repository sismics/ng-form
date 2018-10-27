'use strict';

angular
    .module('ngForm')
    .service('FormDate', function($filter, $locale) {
        /**
         * Return the timezone offset in a readable way.
         *
         * @returns {*} The timezone offset
         */
        var getTimezoneOffset = function() {
            var offset = new Date().getTimezoneOffset();
            if (offset == 0) {
                return 'GMT';
            } else {
                return -offset / 60;
            }
        };

        return {
            /**
             * Format a Date object to the local date format.
             *
             * @param date Date to format
             * @param showTimeZone Show the time zone
             * @returns {*} Formatted date
             */
            formatDate: function(date, showTimeZone) {
                var out = $filter('date')(date, $locale.DATETIME_FORMATS.date);
                if (showTimeZone) {
                    out += " (GMT+" + getTimezoneOffset() + ")";
                }
                return out;
            },

            /**
             * Format a Date object to the local date format.
             *
             * @param date Date to format
             * @returns {*} Formatted date
             */
            formatDateUtc: function(date) {
                return $filter('date')(date, $locale.DATETIME_FORMATS.date, 'UTC');
            },

            /**
             * Format a Date object to the local date/time format.
             *
             * @param date Date to format
             * @param showTimeZone Show the time zone
             * @returns {*} Formatted date/time
             */
            formatDateTime: function(date, showTimeZone) {
                var out = $filter('date')(date, $locale.DATETIME_FORMATS.dateTime);
                if (showTimeZone) {
                    out += " (GMT+" + getTimezoneOffset() + ")";
                }
                return out;
            },

            /**
             * Format a Date object to the local date/time format.
             *
             * @param date Date to format
             * @returns {*} Formatted date/time
             */
            formatDateTimeUtc: function(date) {
                return $filter('date')(date, $locale.DATETIME_FORMATS.dateTime, 'UTC');
            },

            /**
             * Format a Date object to the local date/time format.
             *
             * @param date Date to format
             * @returns {*} Formatted date/time
             */
            formatDateTimeMinute: function(date) {
                return $filter('date')(date, $locale.DATETIME_FORMATS.dateTimeMinute);
            },

            /**
             * Format a Date object to the local date/time format.
             *
             * @param date Date to format
             * @returns {*} Formatted date/time
             */
            formatDateTimeMinuteUtc: function(date) {
                return $filter('date')(date, $locale.DATETIME_FORMATS.dateTimeMinute, 'UTC');
            },

            /**
             * Parse the date provided.
             *
             * @param s The date to parse
             * @returns {*}
             */
            parseDate: function(s) {
                if (s != null && typeof s == 'string') {
                    var parts = s.split('.');
                    if (parts.length == 3) {
                        return new Date(parts[2], parts[1] - 1, parts[0]);
                    }
                }
                return null;
            },

            /**
             * Parse the date time provided.
             *
             * @param s The date time to parse
             * @returns {*}
             */
            parseDateTime: function(s) {
                if (s != null && typeof s == 'string') {
                    var pattern = /(\d+)\.(\d+)\.(\d+) (\d+):(\d+)/;
                    var parts = pattern.exec(s);
                    if (parts != null) {
                        return new Date(parts[3], parts[2] - 1, parts[1], parts[4], parts[5]);
                    }
                }
                return null;
            },

            /**
             * Returns the first day (Jan. 1) of the year.
             *
             * @param year
             * @returns {Date}
             */
            startOfYear: function(year) {
                return new Date(year, 0, 1);
            },

            /**
             * Returns the last day (Dec. 31) of the year.
             *
             * @param year
             * @returns {Date}
             */
            endOfYear: function(year) {
                return new Date(year, 11, 31);
            },

            /**
             * Return today's date.
             *
             * @returns {Date}
             */
            today: function() {
                var today = new Date();
                today.setHours(0,0,0,0);

                return today;
            }

        };
    });
