/**
 * Created by xieshi on 2017/5/27.
 */
var xsDatePicker = require('./datepicker');
module.exports = angular.module('directive.xsDatePicker', [])
    .directive('xsDatePicker', ()=>xsDatePicker)
    .name;