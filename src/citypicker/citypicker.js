/**
 * Created by xieshi on 2017/5/19.
 */
function xsCityPicker(cityPickerService,$ionicModal,$timeout,$ionicScrollDelegate){
    return {
        scope : {
            tag : '@tag',
            title: '@title',
            cancelText : '@cancelText',
            confirmText : '@confirmText',
            selVal : '=selVal',
        },
        template : '<span ng-click="vm.show()">{{vm.showValue}}</span>',
        link : function(scope,element,attrs){
            var vm = scope.vm = {};
            vm.tag = scope.tag || '-';//地市之间的连接符
            vm.showValue = scope.selVal || '请选择地市';//显示的文字
            vm.cancelText = scope.cancelText || '取消';
            vm.confirmText = scope.confirmText || '确认';
            vm.title = scope.title || '地市选择';
            vm.sources = cityPickerService.getCitys();
            scope.modal = $ionicModal.fromTemplate(`
            <ion-modal-view class="xs-picker city-picker">
                <style>
                    .xs-picker{
                        z-index: 1;
                        background-color: rgba(38,38,38,0.5);
                    }
                    .xs-picker .picker-bg{
                        width: 100%;
                        height: 100%;
                        position: absolute;
                        z-index: 2;
                    }
                    .xs-picker .main-box{
                        width: 100%;
                        height: 250px;
                        position: absolute;
                        bottom: 0;
                        background-color: #fff;
                        z-index: 3;
                    }
                    .xs-picker .main-box .nav-box{
                        width: 100%;
                        height: 40px;
                        line-height: 40px;
                        position: relative;
                        text-align: center;
                    }
                    .xs-picker .main-box .nav-box:after{
                        content: '';
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        width: 100%;
                        height: 1px;
                        transform: scale(1,.5);
                        background: #ccc;
                    }
                    .xs-picker .main-box .nav-box .left-button{
                        padding-left: 10px;
                        float: left;
                    }
                    .xs-picker .main-box .nav-box h4{
                        display: inline-block;
                    }
                    .xs-picker .main-box .nav-box .right-button{
                        padding-right: 10px;
                        float: right;
                    }
                    .xs-picker .main-box .main{
                        position:relative;
                        width: 100%;
                        height: 210px;
                    }
                    .xs-picker .main-box .main .picker-center-highlight{
                        position: absolute;
                        top:0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        display: -webkit-flex;
                        display: flex;
                        pointer-events: none;
                    }
                    .xs-picker .main-box .main .picker-center-highlight:before {
                        height: 100%;
                        margin: 0 auto;
                        z-index: 3;
                        background-image: -webkit-linear-gradient(top,hsla(0,0%,100%,.95),hsla(0,0%,100%,.6)),-webkit-linear-gradient(bottom,hsla(0,0%,100%,.95),hsla(0,0%,100%,.6));
                        background-image: linear-gradient(180deg,hsla(0,0%,100%,.95),hsla(0,0%,100%,.6)),linear-gradient(0deg,hsla(0,0%,100%,.95),hsla(0,0%,100%,.6));
                        background-position: top,bottom;
                        background-size: 100% 90px;
                        background-repeat: no-repeat;
                        position: absolute;
                        left: 0;
                        top: 0;
                        content: '';
                        width: 100%;
                    }
                    .xs-picker .main-box .main .picker-center-highlight:after {
                        content: '';
                        width: 100%;
                        height: 30px;
                        position: absolute;
                        left: 0;
                        top: 50%;
                        margin-top:-16px;
                        z-index: 3;
                        background-image: -webkit-linear-gradient(top,#d0d0d0,#d0d0d0,transparent,transparent),-webkit-linear-gradient(bottom,#d0d0d0,#d0d0d0,transparent,transparent);
                        background-image: linear-gradient(180deg,#d0d0d0,#d0d0d0,transparent,transparent),linear-gradient(0deg,#d0d0d0,#d0d0d0,transparent,transparent);
                        background-position: top,bottom;
                        background-size: 100% 1px;
                        background-repeat: no-repeat;
                    }
                    .xs-picker .main-box .main .picker-center-highlight .highlight-tag{
                        flex : 1;
                        -webkit-flex : 1;
                        position: relative;
                        height: 30px;
                        margin-top: 90px;
                    }
                    .xs-picker .main-box .main .picker-center-highlight .highlight-tag2{
                        flex : 2;
                        -webkit-flex: 2;
                    }
                    .xs-picker .main-box .main .picker-center-highlight .highlight-tag .msg-tag{
                        position: absolute;
                        right: 0;
                        top:5px;
                        font-size: 18px;
                    }
                    .xs-picker .main-box .main .main-workarea{
                        width: 100%;
                        height: 100%;
                        display: -webkit-flex;
                        display: flex;
                    }
                    .xs-picker .main-box .main .main-workarea .picker-col{
                        flex: 1;
                        -webkit-flex: 1;
                    }
                    .xs-picker .main-box .main .main-workarea .picker-col-2{
                        flex: 2;
                        -webkit-flex: 2;
                    }
                    .xs-picker .main-box .main .main-workarea .ionic-scroll{
                        height: 210px;
                    }
                    .xs-picker .main-box .main .main-workarea .ionic-scroll .scroll{
                        margin: 90px 0;
                    }
                    .xs-picker .main-box .main .main-workarea .picker-col li{
                        width: 100%;
                        height: 30px;
                        text-align: center;
                        font-size: 17px;
                        line-height: 30px;
                    }
                </style>
                <div class="picker-bg" ng-click="vm.close()"></div>
                <div class="main-box">
                    <div class="nav-box">
                        <div class="left-button default-color" ng-click="vm.close()">{{vm.cancelText}}</div>
                        <h4>{{vm.title}}</h4>
                        <div class="right-button default-color" ng-click="vm.confirm()">{{vm.confirmText}}</div>
                    </div>
                    <div class="main">
                        <div class="picker-center-highlight"></div>
                        <div class="main-workarea">
                            <div class="picker-col">
                                <ion-scroll delegate-handle='scroll1' scrollbar-y="false" on-drag="vm.swipe('scroll1')" on-release="vm.release('scroll1')">
                                    <ul>
                                        <li ng-repeat="province in vm.sources">{{province.name}}</li>
                                    </ul>
                                </ion-scroll>
                            </div>
                            <div class="picker-col">
                                <ion-scroll delegate-handle='scroll2' scrollbar-y="false" on-drag="vm.swipe('scroll2')" on-release="vm.release('scroll2')">
                                    <ul>
                                        <li ng-repeat="city in vm.selScroll1.sub">{{city.name}}</li>
                                    </ul>
                                </ion-scroll>
                            </div>
                            <div class="picker-col picker-col-2">
                                <ion-scroll delegate-handle='scroll3' scrollbar-y="false" on-drag="vm.swipe('scroll3')" on-release="vm.release('scroll3')">
                                    <ul>
                                        <li ng-repeat="region in vm.selScroll2.sub">{{region.name}}</li>
                                    </ul>
                                </ion-scroll>
                            </div>
                        </div>
                    </div>
                </div>
            </ion-modal-view>
`, {
                scope: scope,
            });
            let initData = function(){
                if(scope.selVal){
                    let selArr = scope.selVal.split(vm.tag);
                    vm.sources.forEach((item,index)=>{
                        if(item.name === selArr[0]){
                            vm.selScroll1 = item;
                            vm.scrollIndex1 = index;
                        }
                    });
                    vm.selScroll1.sub.forEach((item,index)=>{
                        if(item.name === selArr[1]){
                            vm.selScroll2 = item;
                            vm.scrollIndex2 = index;
                        }
                    });
                    vm.selScroll2.sub.forEach((item,index)=>{
                        if(item.name === selArr[2]){
                            vm.selScroll3 = item;
                            vm.scrollIndex3 = index;
                        }
                    });
                }else{
                    vm.selScroll1 = vm.sources[0];
                    vm.scrollIndex1 = 0;
                    vm.selScroll2 = vm.selScroll1.sub[0];
                    vm.scrollIndex2 = 0;
                    vm.selScroll3 = vm.selScroll2.sub[0];
                    vm.scrollIndex3 = 0;
                }
            }
            vm.show = function(){
                if(scope.modal.isShown()) {
                    return;
                }else {
                    scope.modal.show();
                }
                initData();
                $ionicScrollDelegate.$getByHandle('scroll1').scrollTo(0, vm.scrollIndex1 * 30, true);
                $ionicScrollDelegate.$getByHandle('scroll2').scrollTo(0, vm.scrollIndex2 * 30, true);
                $ionicScrollDelegate.$getByHandle('scroll3').scrollTo(0, vm.scrollIndex3 * 30, true);
                animation('scroll1',vm.scrollIndex1);
                animation('scroll2',vm.scrollIndex2);
                animation('scroll3',vm.scrollIndex3);
            }
            vm.close = function(){
                $timeout(function() {
                    scope.modal.hide();
                },100)
            }
            vm.confirm = function(){
                scope.selVal = vm.selScroll1.name+vm.tag+vm.selScroll2.name+vm.tag+vm.selScroll3.name;
                vm.showValue = scope.selVal;
                vm.close();
            }
            let animation = function(handle,step){
                let lis = angular.element(document.querySelector("ion-scroll[delegate-handle='"+handle+"']")).find('li');
                for(let k=0,i=step-3;i<=step+3;i++){
                    let fs = "";
                    if(lis[i]){
                        switch (k){
                            case 0:
                                fs = 'scale(0.7, 0.7)';
                                break;
                            case 1:
                                fs = 'scale(0.8, 0.8)';
                                break;
                            case 2:
                                fs = 'scale(0.9, 0.9)';
                                break;
                            case 3:
                                fs = 'scale(1, 1)';
                                break;
                            case 4:
                                fs = 'scale(0.9, 0.9)';
                                break;
                            case 5:
                                fs = 'scale(0.8, 0.8)';
                                break;
                            case 6:
                                fs = 'scale(0.7, 0.7)';
                                break;
                        }
                        angular.element(lis[i]).css({'transform':fs,'transition-duration':'0.4s'});
                    }
                    k++;
                }
            }
            vm.swipe = function(val){
                let height = $ionicScrollDelegate.$getByHandle(val).getScrollView().__maxScrollTop;
                let top = $ionicScrollDelegate.$getByHandle(val).getScrollPosition().top;
                top=top<0?1:top;
                if(top>height){
                    top=height;
                }
                var step = Math.round(top / 30);
                animation(val,step);
            };
            vm.release = function(val){
                let height = $ionicScrollDelegate.$getByHandle(val).getScrollView().__maxScrollTop;
                let top = $ionicScrollDelegate.$getByHandle(val).getScrollPosition().top;
                top=top<0?1:top;
                if(top>height){
                    top=height;
                }
                var step = Math.round(top / 30);
                $ionicScrollDelegate.$getByHandle(val).scrollTo(0, step * 30, true);
                let index = Number(val.substr(-1));
                rectify(index,step);
                for(let i=index+1;i<=3;i++){
                    $timeout(()=>{
                        let handle = 'scroll'+i;
                        $ionicScrollDelegate.$getByHandle(handle).scrollTo(0, 0, true);
                        animation(handle,0);
                    },100);
                }
            }
            let rectify = function(index,step){
                index===1 && (vm.selScroll1 = vm.sources[step],vm.scrollIndex1=step,vm.selScroll2 = vm.selScroll1.sub[0],vm.scrollIndex2=0,vm.selScroll3 = vm.selScroll2.sub[0],vm.scrollIndex3=0);
                index===2 && (vm.selScroll2 = vm.selScroll1.sub[step],vm.scrollIndex2=step,vm.selScroll3 = vm.selScroll2.sub[0],vm.scrollIndex3=0);
                index===3 && (vm.selScroll3 = vm.selScroll2.sub[step],vm.scrollIndex3=step);
            }
            initData();
        }
    }
}
xsCityPicker.$inject = ['cityPickerService','$ionicModal','$timeout','$ionicScrollDelegate'];

function cityPickerService(){
    function getCitys(){
        return [{"name":"山西","sub":[{"name":"太原市","sub":[{"name":"迎泽区"},{"name":"小店区"},{"name":"杏花岭区"},{"name":"尖草坪区"},{"name":"万柏林区"},{"name":"晋源区"},{"name":"清徐县"},{"name":"阳曲县"},{"name":"娄烦县"},{"name":"古交市"}]},{"name":"大同市","sub":[{"name":"城区"},{"name":"矿区"},{"name":"南郊区"},{"name":"新荣区（北郊）"},{"name":"开发区"},{"name":"阳高县"},{"name":"天镇县"},{"name":"广灵县"},{"name":"灵丘县"},{"name":"浑源县"},{"name":"左云县"},{"name":"大同县"}]},{"name":"阳泉市","sub":[{"name":"城区"},{"name":"矿区"},{"name":"郊区"},{"name":"开发区"},{"name":"平定县"},{"name":"盂县"}]},{"name":"长治市","sub":[{"name":"城区"},{"name":"郊区"},{"name":"开发区"},{"name":"长治县"},{"name":"襄垣县"},{"name":"屯留县"},{"name":"平顺县"},{"name":"黎城县"},{"name":"壶关县"},{"name":"长子县"},{"name":"武乡县"},{"name":"沁县"},{"name":"沁源县"},{"name":"潞城市"}]},{"name":"晋城市","sub":[{"name":"城区"},{"name":"开发区"},{"name":"沁水县"},{"name":"阳城县"},{"name":"陵川县"},{"name":"泽州县"},{"name":"高平市"}]},{"name":"朔州市","sub":[{"name":"朔城区"},{"name":"平鲁区"},{"name":"开发区"},{"name":"山阴县"},{"name":"应县"},{"name":"右玉县"},{"name":"怀仁县"}]},{"name":"晋中市","sub":[{"name":"榆次区"},{"name":"开发区"},{"name":"榆社县"},{"name":"左权县"},{"name":"和顺县"},{"name":"昔阳县"},{"name":"寿阳县"},{"name":"太谷县"},{"name":"祁县"},{"name":"平遥县"},{"name":"灵石县"},{"name":"介休市"}]},{"name":"运城市","sub":[{"name":"盐湖区"},{"name":"空港区"},{"name":"风陵渡经济开发区"},{"name":"临猗县"},{"name":"万荣县"},{"name":"闻喜县"},{"name":"稷山县"},{"name":"新绛县"},{"name":"绛县"},{"name":"绛县开发区"},{"name":"垣曲县"},{"name":"夏县"},{"name":"平陆县"},{"name":"芮城县"},{"name":"永济市"},{"name":"河津市"}]},{"name":"忻州市","sub":[{"name":"忻府区"},{"name":"开发区"},{"name":"定襄县"},{"name":"五台县"},{"name":"代县"},{"name":"繁峙县"},{"name":"宁武县"},{"name":"静乐县"},{"name":"神池县"},{"name":"五寨县"},{"name":"岢岚县"},{"name":"河曲县"},{"name":"保德县"},{"name":"偏关县"},{"name":"原平市"}]},{"name":"临汾市","sub":[{"name":"尧都区"},{"name":"开发区"},{"name":"曲沃县"},{"name":"翼城县"},{"name":"襄汾县"},{"name":"洪洞县"},{"name":"古县"},{"name":"安泽县"},{"name":"浮山县"},{"name":"吉县"},{"name":"乡宁县"},{"name":"大宁县"},{"name":"隰县"},{"name":"永和县"},{"name":"蒲县"},{"name":"汾西县"},{"name":"侯马市"},{"name":"侯马开发区"},{"name":"霍州市"}]},{"name":"吕梁市","sub":[{"name":"离石区"},{"name":"文水县"},{"name":"交城县"},{"name":"兴县"},{"name":"临县"},{"name":"柳林县"},{"name":"石楼县"},{"name":"岚县"},{"name":"方山县"},{"name":"中阳县"},{"name":"交口县"},{"name":"孝义市"},{"name":"汾阳市"}]}]}];
    }
    return {
        getCitys : getCitys
    }
}
cityPickerService.$inject = [];
module.exports = angular.module('directive.xsCityPicker',[])
    .directive('xsCityPicker',xsCityPicker)
    .factory('cityPickerService',cityPickerService)
    .name;
