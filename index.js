/**
 * Created by xieshi on 2017/5/19.
 */
var xsCityPicker = require('./src/citypicker/citypicker');
var xsImgPreview = require('./src/imgPreview/xsImgPreview');
var xsImgSlide = require('./src/imgFullScreenSlide/imgFullScreenSlide');
var xsImgLazyLoad = require('./src/imgLazyLoad/imgLazyLoad');
var xsIonicModule = {
    xsCityPicker : xsCityPicker,
    xsImgPreview : xsImgPreview,
    xsImgSlide : xsImgSlide,
    xsImgLazyLoad : xsImgLazyLoad
};
module.exports = xsIonicModule;