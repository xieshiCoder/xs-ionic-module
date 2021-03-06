/**
 * Created by xieshi on 2017/5/19.
 */
require('./src/common.css');
var xsCityPicker = require('./src/citypicker/citypicker');
var xsImgSlide = require('./src/imgFullScreenSlide/imgFullScreenSlide');
var xsImgLazyLoad = require('./src/imgLazyLoad/imgLazyLoad');
var xsDatePicker = require('./src/datepicker')
var xsIonicModule = {
    xsCityPicker : xsCityPicker,
    xsImgSlide : xsImgSlide,
    xsImgLazyLoad : xsImgLazyLoad,
    xsDatePicker : xsDatePicker
};
module.exports = xsIonicModule;