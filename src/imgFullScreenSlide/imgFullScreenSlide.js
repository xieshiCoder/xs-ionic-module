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
                    $timeout(()=>{
                        //恢复
                        angular.element(document.querySelectorAll('.imgs-container')).css('transform',"translate3d(0,0,0)");
                        angular.element(document.querySelectorAll('.slidebg')).css('background','rgba(0,0,0,1)');
                    },100);
                }
                vm.navNum = (vm.currentIndex+1)+'/'+vm.imgArr.length;
                $ionicSlideBoxDelegate.$getByHandle('imgslide').slide(vm.currentIndex);
            }
            vm.touch = function(){
                event.preventDefault();
                let touch = event.gesture.touches[0];
                let target = touch.target;
                !target.style.transform && (target.style.transform = "translate3d(0,0,0)");
                vm.start = {
                    x : touch.pageX,
                    y : touch.pageY
                }
                vm.bg = 1;
            }
            vm.drag = function(){
                event.preventDefault();
                let touch = event.gesture.touches[0];
                let offsetHeight = touch.target.offsetHeight;
                let sy = touch.pageY - vm.start.y;
                this.bg-=0.03;
                sy>0 && (
                    angular.element(document.querySelectorAll('.imgs-container')).css('transform',"translate3d(0,"+sy+"px,0)"),
                    angular.element(document.querySelectorAll('.slidebg')).css('background','rgba(0,0,0,'+this.bg+')')
                );
            }
            vm.release = function(){
                event.preventDefault();
                let touch = event.gesture.touches[0];
                let offsetHeight = touch.target.offsetHeight;
                let re = document.querySelector('.imgs-container').style.transform.match(/\((.+),(.+),(.+)\)/);
                let nowY = Number(re[2].match(/-?[0-9]*[0-9]*[0-9]/)[0]);
                if(nowY>=(offsetHeight/3)){
                    angular.element(document.querySelectorAll('.slidebg')).css('background','rgba(0,0,0,0)');
                    vm.closeModal();
                }else{
                    angular.element(document.querySelectorAll('.imgs-container')).css('transform',"translate3d(0,0,0)");
                    angular.element(document.querySelectorAll('.slidebg')).css('background','rgba(0,0,0,1)');
                }
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
