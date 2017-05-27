/**
 * Created by xieshi on 2017/5/26.
 */
var XsDatePickerCtrl = require('./datepickerCtrl');

module.exports = {
  controller: XsDatePickerCtrl,
  controllerAs: 'ctrl',
  scope : {
    format: '@format',
    title: '@title',
    cancelText: '@cancelText',
    confirmText: '@confirmText',
    selVal: '=selVal',
  },
  template : '<span ng-click="linkvm.show()">{{ctrl.vm.showValue}}</span>',
  link : function(scope,ele,attrs,ctrl){
      let linkvm = scope.linkvm = {};
      linkvm.modal = ctrl.$ionicModal.fromTemplate(require('./date-picker.html'), {
          scope: scope,
      });
      //显示
      linkvm.show = function(){
          if(linkvm.modal.isShown()) {
              return;
          }else {
              linkvm.modal.show();
          }
          ctrl.init();
          ctrl.$ionicScrollDelegate.$getByHandle(ctrl.vm.scroll1).scrollTo(0, ctrl.vm.scrollIndex1 * 30, true);
          ctrl.$ionicScrollDelegate.$getByHandle(ctrl.vm.scroll2).scrollTo(0, ctrl.vm.scrollIndex2 * 30, true);
          ctrl.$ionicScrollDelegate.$getByHandle(ctrl.vm.scroll3).scrollTo(0, ctrl.vm.scrollIndex3 * 30, true);
          ctrl.$ionicScrollDelegate.$getByHandle(ctrl.vm.scroll4).scrollTo(0, ctrl.vm.scrollIndex4 * 30, true);
          ctrl.$ionicScrollDelegate.$getByHandle(ctrl.vm.scroll5).scrollTo(0, ctrl.vm.scrollIndex5 * 30, true);
          ctrl.animation(ctrl.vm.scroll1,ctrl.vm.scrollIndex1);
          ctrl.animation(ctrl.vm.scroll2,ctrl.vm.scrollIndex2);
          ctrl.animation(ctrl.vm.scroll3,ctrl.vm.scrollIndex3);
          ctrl.animation(ctrl.vm.scroll4,ctrl.vm.scrollIndex4);
          ctrl.animation(ctrl.vm.scroll5,ctrl.vm.scrollIndex5);
      };
      //关闭
      linkvm.close= function(){
          ctrl.$timeout(()=>{
              linkvm.modal.hide();
          },100)
      }
      //确定
      linkvm.confirm= function(){
          ctrl.vm.showValue = ctrl.$scope.selVal=ctrl.vm.selScroll1+"-"+ctrl.vm.selScroll2+"-"+ctrl.vm.selScroll3+" "+ctrl.vm.selScroll4+":"+ctrl.vm.selScroll5;
          linkvm.close();
      }

  }
}