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
            scope.modal = $ionicModal.fromTemplate(`
            <ion-modal-view class="img-slide">
                <style>
                    .img-slide{
                        background: #000;
                    }
                    .img-slide .bar.bar-assertive{
                        border:none;
                        background: transparent;
                    }
                    .img-slide .imgs-container{
                        width: 100%;
                        height: 80%;
                        top: 10%;
                        overflow: hidden;
                    }
                    .img-slide .imgs-container .slider,.img-slide .imgs-container .slider .slider-slides .slider-slide{
                        height: 100%;
                    }
                    .img-slide .imgs-container .slider .slider-slides .slider-slide img{
                        width: 100%;
                        height: auto;
                        max-height: 100%;
                        vertical-align: middle;
                    }
                    .img-slide .imgs-container .slider .slider-slides .slider-slide span{
                        display:inline-block;
                        height:100%;
                        vertical-align:middle;
                    }
                </style>
                <ion-header-bar class="bar-assertive">
                    <div class="buttons">
                        <button class="button back-button header-item button-clear" ng-click="vm.closeModal()">
                            <i class="icon ion-arrow-left-c"></i>
                        </button>
                    </div>
                    <h1 class="title"></h1>
                    <div class="buttons">
                        <button class="button back-button header-item button-clear">
                            {{vm.navNum}}
                        </button>
                    </div>
                </ion-header-bar>
                <ion-content class="imgs-container" overflow-scroll="true">
                    <ion-slide-box show-pager="false" on-slide-changed="vm.slideHasChanged($index)" delegate-handle="imgslide">
                        <ion-slide ng-repeat="imgUrl in vm.imgArr">
                            <img ng-src="{{imgUrl}}"><span></span>
                        </ion-slide>
                    </ion-slide-box>
                </ion-content>
            </ion-modal-view>
`, {
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
