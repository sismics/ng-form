'use strict';

angular
    .module('ngForm')
    .component('formGauge', {
        bindings: {
            id: '@',
            label: '@',
            val: '=',
            value: '=',
            valueFormatted: '=',
            maxValue: '=',
            maxValueFormatted: '=',
            gaugeType: '='
        },
        controller: function($translate, $filter, $scope, $element) {
            var canvas = $($element[0]).find('canvas')[0];
            var ctrl = this;
            ctrl.animationTime = 5;
            var normalGaugeOption = {
                lines: 12,
                angle: 0.15,
                lineWidth: 0.44,
                pointer: {
                    length: 0.9,
                    strokeWidth: 0.035,
                    color: '#000000'
                },
                limitMax: 'false',
                percentColors : [
                    [0.0, "#a9d70b" ],
                    [0.50, "#f9c802"],
                    [1.0, "#ff0000"]],
                strokeColor: '#E0E0E0'
            };
            var donutGaugeOptions = {
                lines: 12,
                angle: 0.3,
                lineWidth: 0.14,
                pointer: {
                    length: 0.09,
                    strokeWidth: 0.0035,
                    color: '#000000'
                },
                limitMax: 'false',
                strokeColor: '#E0E0E0',
                colorStart: '#a9d70b',
                colorStop: '#ff0000',
                highDpiSupport: true
            };
            ctrl.gaugeOptions = ctrl.gaugeType == 'donut' ?
                    donutGaugeOptions :
                    normalGaugeOption;
        },
        templateUrl: 'vendor/@sismics/ng-form/partial/form-gauge.html'
    });

