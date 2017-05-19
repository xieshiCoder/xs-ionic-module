/**
 * Created by xieshi on 2017/5/19.
 */
function xsImgPreview($ionicModal,$timeout,$sce){
    return{
        scope : {
            imgRemarks : '@imgRemarks',//备注信息
            videoRemarks : '@videoRemarks',//视频备注信息
            imgArr : '=imgArr',
            videoArr : '=videoArr'
        },
        template : '<span ng-click="vm.preview()">预览</span>',
        link: function(scope, element, attrs) {
            var vm = scope.vm = {};
            //初始化
            vm.initData = function(){
                vm.imgRemarks = scope.imgRemarks;
                vm.videoRemarks = scope.videoRemarks;
                vm.imgArr = scope.imgArr;
                vm.videoArr = [];
                if(scope.videoArr && scope.videoArr.length>0){
                    scope.videoArr.filter(item=>{
                        vm.videoArr.push($sce.trustAsResourceUrl(item));
                    })
                }
            };
            //模态框
            scope.modal = $ionicModal.fromTemplate(`
            <ion-modal-view class="preview-modal">
                <style>
                    .preview-modal .bar .buttons .right-btn{
                        position: absolute;
                        right: 0;
                    }
                    .preview-modal .bar .button.button-clear .icon:before{
                        font-size: 24px;
                    }
                    .preview-container{
                        width: 100%;
                        background: #fff;
                        margin-top: 10px;
                    }
                    .preview-container .preview-title{
                        color: #fff;
                        padding-left: 3%;
                        background: #8c8a8a;
                    }
                    .preview-container .preview-imgs,.preview-container .preview-videos{
                        width: 95%;
                        margin:10px auto;
                    }
                    .preview-container .preview-imgs .img-item{
                        position: relative;
                        width: 33.33%;
                        padding-bottom:33.33%;
                        float: left;
                        border: 1px solid #fff;
                    }
                    .preview-container .preview-imgs .img-item .del-img{
                        width: 100%;
                        height: 100%;
                        position: absolute;
                        left: 0;
                        top:0;
                        z-index: 2;
                        background: #000;
                        opacity: 0.8;
                        text-align: center;
                    }
                    .preview-container .preview-imgs .img-item .del-img img{
                        width: 40%;
                        margin-top: 30%;
                    }
                    .preview-container .preview-imgs .img-item  xs-img-slide,.preview-container .preview-imgs .img-item  xs-img-slide img{
                        position: absolute;
                        top:0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                    }
                    .preview-container .preview-videos .video-item{
                        width: 100%;
                        height: 200px;
                        position: relative;
                        margin-top: 10px;
                    }
                    .preview-container .preview-videos .video-item .del-video{
                        width: 100%;
                        height: 100%;
                        position: absolute;
                        left: 0;
                        top:0;
                        z-index: 2;
                        background: #000;
                        opacity: 0.8;
                        text-align: center;
                    }
                    .preview-container .preview-videos .video-item .del-video img{
                        width: 20%;
                        margin-top: 10%;
                    }
                    .preview-container .preview-videos video{
                        width: 100%;
                        height: 100%;
                        background-color:#000
                    }
                </style>
                <ion-header-bar class="bar-assertive">
                    <div class="buttons">
                        <button class="button back-button header-item button-clear" ng-click="vm.closeModal()">
                            <i class="icon ion-chevron-down"></i>
                        </button>
                    </div>
                    <h1 class="title">图片预览</h1>
                    <div class="buttons">
                        <button class="button back-button header-item button-clear right-btn" ng-if='!vm.editFlag' ng-click="vm.edit()">编辑</button>
                        <button class="button back-button header-item button-clear right-btn" ng-if='vm.editFlag' ng-click="vm.edit()">完成</button>
                    </div>
                </ion-header-bar>
                <ion-content class="has-header">
                    <div class="preview-container" ng-if="vm.imgArr && vm.imgArr.length>0">
                        <div class="preview-title">
                            <span>照片</span>
                            <span ng-if="vm.imgRemarks">({{vm.imgRemarks}})</span>
                        </div>
                        <div class="preview-imgs">
                            <div class="img-item" ng-repeat="img in vm.imgArr">
                                <div class="del-img" ng-if="vm.editFlag && img" ng-click="vm.delete(0,$index)">
                                    <img src="data:image/png;base64,AAABAAEAHh4AAAEAIACwDgAAFgAAACgAAAAeAAAAPAAAAAEAIAAAAAAAEA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADt5N3v7eTd/+3k3f/t5N3/7eTd/+3k3f/t5N3/7eTd/+3k3f/t5N3/7eTd/+3k3f/t5N3/7eTd/+3k3f/t5N3/7eTd/+3k3e8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADt5N7/7eTe/+3k3v/t5N7/7eTe/+3k3v/t5N7/7eTe/+3k3v/t5N7/7eTe/+3k3v/t5N7/7eTe/+3k3v/t5N7/7eTe/+3k3v8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADu5t//7ubf/+7m3//u5t//AAAAAO7m3//u5t//AAAAAO7m3//u5t//AAAAAO7m3//u5t//AAAAAO7m3//u5t//7ubf/+7m3/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADv5+H/7+fh/+/n4f/v5+H/AAAAAO/n4f/v5+H/AAAAAO/n4f/v5+H/AAAAAO/n4f/v5+H/AAAAAO/n4f/v5+H/7+fh/+/n4f8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADw6OL/8Oji//Do4v/w6OL/AAAAAPDo4v/w6OL/AAAAAPDo4v/w6OL/AAAAAPDo4v/w6OL/AAAAAPDo4v/w6OL/8Oji//Do4v8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADx6eT/8enk//Hp5P/x6eT/AAAAAPHp5P/x6eT/AAAAAPHp5P/x6eT/AAAAAPHp5P/x6eT/AAAAAPHp5P/x6eT/8enk//Hp5P8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADx6+X/8evl//Hr5f/x6+X/AAAAAPHr5f/x6+X/AAAAAPHr5f/x6+X/AAAAAPHr5f/x6+X/AAAAAPHr5f/x6+X/8evl//Hr5f8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADy7Of/8uzn//Ls5//y7Of/AAAAAPLs5//y7Of/AAAAAPLs5//y7Of/AAAAAPLs5//y7Of/AAAAAPLs5//y7Of/8uzn//Ls5/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADz7en/8+3p//Pt6f/z7en/AAAAAPPt6f/z7en/AAAAAPPt6f/z7en/AAAAAPPt6f/z7en/AAAAAPPt6f/z7en/8+3p//Pt6f8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD07ur/9O7q//Tu6v/07ur/AAAAAPTu6v/07ur/AAAAAPTu6v/07ur/AAAAAPTu6v/07ur/AAAAAPTu6v/07ur/9O7q//Tu6v8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD18Oz/9fDs//Xw7P/18Oz/AAAAAPXw7P/18Oz/AAAAAPXw7P/18Oz/AAAAAPXw7P/18Oz/AAAAAPXw7P/18Oz/9fDs//Xw7P8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD18e3/9fHt//Xx7f/18e3/AAAAAPXx7f/18e3/AAAAAPXx7f/18e3/AAAAAPXx7f/18e3/AAAAAPXx7f/18e3/9fHt//Xx7f8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD28u//9vLv//by7//28u//AAAAAPby7//28u//AAAAAPby7//28u//AAAAAPby7//28u//AAAAAPby7//28u//9vLv//by7/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD38/D/9/Pw//fz8P/38/D/AAAAAPfz8P/38/D/AAAAAPfz8P/38/D/AAAAAPfz8P/38/D/AAAAAPfz8P/38/D/9/Pw//fz8P8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD49PL/+PTy//j08v/49PL/AAAAAPj08v/49PL/AAAAAPj08v/49PL/AAAAAPj08v/49PL/AAAAAPj08v/49PL/+PTy//j08v8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD59vP/+fbz//n28//59vP/AAAAAPn28//59vP/AAAAAPn28//59vP/AAAAAPn28//59vP/AAAAAPn28//59vP/+fbz//n28/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD69/X/+vf1//r39f/69/X/+vf1//r39f/69/X/+vf1//r39f/69/X/+vf1//r39f/69/X/+vf1//r39f/69/X/+vf1//r39f8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD6+Pf/+vj3//r49//6+Pf/+vj3//r49//6+Pf/+vj3//r49//6+Pf/+vj3//r49//6+Pf/+vj3//r49//6+Pf/+vj3//r49/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPz7+v/8+/r//Pv6//z7+v/8+/r//Pv6//z7+v/8+/r//Pv6//z7+v/8+/r//Pv6//z7+v/8+/r//Pv6//z7+v/8+/r//Pv6//z7+v/8+/r/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP38+//9/Pv//fz7//38+//9/Pv//fz7//38+//9/Pv//fz7//38+//9/Pv//fz7//38+//9/Pv//fz7//38+//9/Pv//fz7//38+//9/Pv/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP7+/v8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD+/f3/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/+/v///v7///7+///+/v///v7///7+///+/v///v7/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD////8/////P////z8AAD8/AAA/PwkkPz8JJD8/CSQ/PwkkPz8JJD8/CSQ/PwkkPz8JJD8/CSQ/PwkkPz8JJD8/CSQ/PwkkPz8JJD8/AAA/PwAAPz////8+AAAfPgAAHz/79/8/+Af/P////z////8/////P////w=">
                                </div>
                                <xs-img-slide img-arr="vm.imgArr" current-index="$index"></xs-img-slide>
                            </div>
                            <div style="clear:both"></div>
                        </div>
                    </div>
                    <div class="preview-container"  ng-if="vm.videoArr && vm.videoArr.length>0">
                        <div class="preview-title">
                            <span>视频</span>
                            <span ng-if="vm.videoRemarks">({{vm.videoRemarks}})</span>
                        </div>
                        <div class="preview-videos">
                            <div class='video-item' ng-repeat="video in vm.videoArr">
                                <div class="del-video" ng-if="vm.editFlag" ng-click="vm.delete(1,$index)">
                                    <img src="data:image/png;base64,AAABAAEAHh4AAAEAIACwDgAAFgAAACgAAAAeAAAAPAAAAAEAIAAAAAAAEA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADt5N3v7eTd/+3k3f/t5N3/7eTd/+3k3f/t5N3/7eTd/+3k3f/t5N3/7eTd/+3k3f/t5N3/7eTd/+3k3f/t5N3/7eTd/+3k3e8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADt5N7/7eTe/+3k3v/t5N7/7eTe/+3k3v/t5N7/7eTe/+3k3v/t5N7/7eTe/+3k3v/t5N7/7eTe/+3k3v/t5N7/7eTe/+3k3v8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADu5t//7ubf/+7m3//u5t//AAAAAO7m3//u5t//AAAAAO7m3//u5t//AAAAAO7m3//u5t//AAAAAO7m3//u5t//7ubf/+7m3/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADv5+H/7+fh/+/n4f/v5+H/AAAAAO/n4f/v5+H/AAAAAO/n4f/v5+H/AAAAAO/n4f/v5+H/AAAAAO/n4f/v5+H/7+fh/+/n4f8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADw6OL/8Oji//Do4v/w6OL/AAAAAPDo4v/w6OL/AAAAAPDo4v/w6OL/AAAAAPDo4v/w6OL/AAAAAPDo4v/w6OL/8Oji//Do4v8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADx6eT/8enk//Hp5P/x6eT/AAAAAPHp5P/x6eT/AAAAAPHp5P/x6eT/AAAAAPHp5P/x6eT/AAAAAPHp5P/x6eT/8enk//Hp5P8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADx6+X/8evl//Hr5f/x6+X/AAAAAPHr5f/x6+X/AAAAAPHr5f/x6+X/AAAAAPHr5f/x6+X/AAAAAPHr5f/x6+X/8evl//Hr5f8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADy7Of/8uzn//Ls5//y7Of/AAAAAPLs5//y7Of/AAAAAPLs5//y7Of/AAAAAPLs5//y7Of/AAAAAPLs5//y7Of/8uzn//Ls5/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADz7en/8+3p//Pt6f/z7en/AAAAAPPt6f/z7en/AAAAAPPt6f/z7en/AAAAAPPt6f/z7en/AAAAAPPt6f/z7en/8+3p//Pt6f8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD07ur/9O7q//Tu6v/07ur/AAAAAPTu6v/07ur/AAAAAPTu6v/07ur/AAAAAPTu6v/07ur/AAAAAPTu6v/07ur/9O7q//Tu6v8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD18Oz/9fDs//Xw7P/18Oz/AAAAAPXw7P/18Oz/AAAAAPXw7P/18Oz/AAAAAPXw7P/18Oz/AAAAAPXw7P/18Oz/9fDs//Xw7P8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD18e3/9fHt//Xx7f/18e3/AAAAAPXx7f/18e3/AAAAAPXx7f/18e3/AAAAAPXx7f/18e3/AAAAAPXx7f/18e3/9fHt//Xx7f8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD28u//9vLv//by7//28u//AAAAAPby7//28u//AAAAAPby7//28u//AAAAAPby7//28u//AAAAAPby7//28u//9vLv//by7/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD38/D/9/Pw//fz8P/38/D/AAAAAPfz8P/38/D/AAAAAPfz8P/38/D/AAAAAPfz8P/38/D/AAAAAPfz8P/38/D/9/Pw//fz8P8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD49PL/+PTy//j08v/49PL/AAAAAPj08v/49PL/AAAAAPj08v/49PL/AAAAAPj08v/49PL/AAAAAPj08v/49PL/+PTy//j08v8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD59vP/+fbz//n28//59vP/AAAAAPn28//59vP/AAAAAPn28//59vP/AAAAAPn28//59vP/AAAAAPn28//59vP/+fbz//n28/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD69/X/+vf1//r39f/69/X/+vf1//r39f/69/X/+vf1//r39f/69/X/+vf1//r39f/69/X/+vf1//r39f/69/X/+vf1//r39f8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD6+Pf/+vj3//r49//6+Pf/+vj3//r49//6+Pf/+vj3//r49//6+Pf/+vj3//r49//6+Pf/+vj3//r49//6+Pf/+vj3//r49/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPz7+v/8+/r//Pv6//z7+v/8+/r//Pv6//z7+v/8+/r//Pv6//z7+v/8+/r//Pv6//z7+v/8+/r//Pv6//z7+v/8+/r//Pv6//z7+v/8+/r/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP38+//9/Pv//fz7//38+//9/Pv//fz7//38+//9/Pv//fz7//38+//9/Pv//fz7//38+//9/Pv//fz7//38+//9/Pv//fz7//38+//9/Pv/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP7+/v8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD+/f3/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/+/v///v7///7+///+/v///v7///7+///+/v///v7/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD////8/////P////z8AAD8/AAA/PwkkPz8JJD8/CSQ/PwkkPz8JJD8/CSQ/PwkkPz8JJD8/CSQ/PwkkPz8JJD8/CSQ/PwkkPz8JJD8/AAA/PwAAPz////8+AAAfPgAAHz/79/8/+Af/P////z////8/////P////w=">
                                </div>
                                <video controls="controls">
                                    <source ng-src={{video}} type="video/mp4"/>
                                </video>
                            </div>
                        </div>
                    </div>
                </ion-content>
            </ion-modal-view>`, {
                scope: scope,
            });
            //打开模态框
            vm.preview = function(){
                event.preventDefault();
                vm.initData();
                if((!vm.imgArr || vm.imgArr.length === 0) && (!vm.videoArr || vm.videoArr.length === 0)){
                    window.plugins && window.plugins.toast.show('没有可预览的内容', 'short', 'center');
                    return;
                }
                if(scope.modal.isShown()) {
                    return;
                }else {
                    scope.modal.show();
                }
            }
            //关闭模态框
            vm.closeModal = function(){
                vm.editFlag = false;
                $timeout(function() {
                    scope.modal.hide();
                },100);
            }
            //打开或关闭编辑模式
            vm.edit = function(){
                vm.editFlag = !vm.editFlag;
            }
            //进行删除操作
            vm.delete = function(flag,index){
                if(flag === 0){
                    scope.imgArr.splice(index,1);
                }else if(flag === 1){
                    scope.videoArr.splice(index,1);
                }
            }
        }
    }
}
xsImgPreview.$inject = ['$ionicModal','$timeout','$sce'];

module.exports = angular.module('directive.xsImgPreview',[])
    .directive('xsImgPreview',xsImgPreview)
    .name;
