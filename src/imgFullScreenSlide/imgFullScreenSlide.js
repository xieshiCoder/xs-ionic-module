/**
 * Created by xieshi on 2017/5/19.
 */
/**
 * Created by xieshi on 2017/5/15.
 */
function xsImgSlide($ionicModal,$ionicSlideBoxDelegate,$timeout){
    return{
        scope : {
            imgArr : '=imgArr',
            currentIndex : '=currentIndex'
        },
        template : '<img ng-src="{{vm.imgUrl}}" ng-click="vm.openImgSlideView()">',
        link : function(scope,element,attrs){
            var vm = scope.vm = {};
            vm.imgArr = scope.imgArr;
            vm.currentIndex = scope.currentIndex;
            vm.imgUrl = vm.imgArr[vm.currentIndex];
            scope.modal = $ionicModal.fromTemplate(require('./img-slide.html'), {
                scope: scope,
            });
            vm.openImgSlideView = function(){
                event.preventDefault();
                if(scope.modal.isShown()) {
                    return;
                }else {
                    scope.modal.show();
                }
                vm.navNum = (vm.currentIndex+1)+'/'+vm.imgArr.length;
                $ionicSlideBoxDelegate.$getByHandle('imgslide').slide(vm.currentIndex);
            }
            vm.closeModal = function(){
                $timeout(function() {
                    scope.modal.hide();
                },100);
            }
            vm.slideHasChanged = function(index){
                vm.navNum = (index+1)+'/'+vm.imgArr.length;
            }
        }
    }
}

xsImgSlide.$inject = ['$ionicModal','$ionicSlideBoxDelegate','$timeout'];

module.exports = angular.module('directive.xsImgSlide',[])
    .directive('xsImgSlide',xsImgSlide)
    .name;
