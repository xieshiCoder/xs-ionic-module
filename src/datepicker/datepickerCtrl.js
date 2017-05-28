/**
 * Created by xieshi on 2017/5/27.
 */
var dateformat = require('dateformat');
var uuid = require('uuid');
module.exports = class XsDatePickerCtr{
  constructor($scope,$ionicModal, $timeout, $ionicScrollDelegate){
    this.$timeout = $timeout;
    this.$ionicModal = $ionicModal;
    this.$ionicScrollDelegate = $ionicScrollDelegate;
    this.$scope = $scope;
    this.vm = this.$scope.vm = {};
    this.vm.format = this.$scope.format || 'yyyy-MM-dd HH:mm';
    this.vm.cancelText = this.$scope.cancelText || '取消';
    this.vm.confirmText = this.$scope.confirmText || '确认';
    this.vm.title = this.$scope.title || '日期选择';
    this.vm.months = ['01','02','03','04','05','06','07','08','09','10','11','12'];
    this.vm.hours = ['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23'];
    this.vm.minutes = ['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','57','58','59'];
    this.spareDays = {
      spare28 : ['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28'],
      spare29 : ['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29'],
      spare30 : ['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30'],
      spare31 : ['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31']
      }
    this.vm.scroll1 = uuid.v1().replace(/-/g,'');
    this.vm.scroll2 = uuid.v1().replace(/-/g,'');
    this.vm.scroll3 = uuid.v1().replace(/-/g,'');
    this.vm.scroll4 = uuid.v1().replace(/-/g,'');
    this.vm.scroll5 = uuid.v1().replace(/-/g,'');
    this.init();
  }
  init() {
    let date = new Date();
    if(this.$scope.selVal){
      date = Date.parse(this.$scope.selVal);
    }
    this.vm.selScroll1 = dateformat(date,'yyyy');
    this.vm.selScroll2 = dateformat(date,'mm');
    this.vm.selScroll3 = dateformat(date,'dd');
    this.vm.selScroll4 = dateformat(date,'HH');
    this.vm.selScroll5 = dateformat(date,'MM');
    this.vm.showValue = this.$scope.selVal = dateformat(date,'yyyy-mm-dd HH:MM');
    let thisMonth = Number(this.vm.selScroll2);
    let thisYear = Number(this.vm.selScroll1);
    this.vm.years = [];
    for(let i=-5;i<6;i++){
      this.vm.years.push(thisYear+i+'');
    }
    if(thisMonth === 1 || thisMonth === 3 || thisMonth === 5 || thisMonth === 7 || thisMonth === 8 || thisMonth === 10 || thisMonth === 12){
      this.vm.days = this.spareDays.spare31;
    }else if(thisMonth === 4 || thisMonth === 6 || thisMonth === 9 || thisMonth === 11){
      this.vm.days = this.spareDays.spare30;
    }else{
      if(thisYear % 4 === 0){
        this.vm.days = this.spareDays.spare29;
      }else {
        this.vm.days = this.spareDays.spare28;
      }
    }
    this.vm.years.forEach((item,index)=>{
      if(this.vm.selScroll1 === item){
        this.vm.scrollIndex1 = index;
      }
    });
    this.vm.months.forEach((item,index)=>{
      if(this.vm.selScroll2 === item){
        this.vm.scrollIndex2 = index;
      }
    });
    this.vm.days.forEach((item,index)=>{
      if(this.vm.selScroll3 === item){
        this.vm.scrollIndex3 = index;
      }
    });
    this.vm.hours.forEach((item,index)=>{
      if(this.vm.selScroll4 === item){
        this.vm.scrollIndex4 = index;
      }
    });
    this.vm.minutes.forEach((item,index)=>{
      if(this.vm.selScroll5 === item){
        this.vm.scrollIndex5 = index;
      }
    });
  }
  animation(handle,step){
    let lis = angular.element(document.querySelector("ion-scroll[delegate-handle='"+handle+"']")).find('li');
    for(let k=0,i=step-3;i<=step+3;i++){
      let fs = "",color = '';
      if(lis[i]){
        switch (k){
          case 0:
            fs = 'scale(0.7, 0.7)';
            color = '#000';
            break;
          case 1:
            fs = 'scale(0.8, 0.8)';
            color = '#000';
            break;
          case 2:
            fs = 'scale(0.9, 0.9)';
            color = '#000';
            break;
          case 3:
            fs = 'scale(1, 1)';
            color = '#47a7d7';
            break;
          case 4:
            fs = 'scale(0.9, 0.9)';
            color = '#000';
            break;
          case 5:
            fs = 'scale(0.8, 0.8)';
            color = '#000';
            break;
          case 6:
            fs = 'scale(0.7, 0.7)';
            color = '#000';
            break;
        }
        angular.element(lis[i]).css({'transform':fs,'transition-duration':'0.4s','color':color});
      }
      k++;
    }
  }
  swipe(val){
    let height = this.$ionicScrollDelegate.$getByHandle(val).getScrollView().__maxScrollTop;
    let top = this.$ionicScrollDelegate.$getByHandle(val).getScrollPosition().top;
    top=top<0?1:top;
    if(top>height){
      top=height;
    }
    var step = Math.round(top / 30);
    this.animation(val,step);
  };
  release(val,dex){
    let height = this.$ionicScrollDelegate.$getByHandle(val).getScrollView().__maxScrollTop;
    let top = this.$ionicScrollDelegate.$getByHandle(val).getScrollPosition().top;
    top=top<0?1:top;
    if(top>height){
      top=height;
    }
    var step = Math.round(top / 30);
    this.$ionicScrollDelegate.$getByHandle(val).scrollTo(0, step * 30, true);
    this.animation(val,step);
    let index = Number(dex);
    this.rectify(index,step);

  }
  rectify(index,step){
    index===3 && (this.vm.selScroll3=this.vm.days[step],this.vm.scrollIndex3=step);
    index===4 && (this.vm.selScroll4=this.vm.hours[step],this.vm.scrollIndex4=step);
    index===5 && (this.vm.selScroll5=this.vm.minutes[step],this.vm.scrollIndex5=step);
    if(index===2){
      this.vm.selScroll2=this.vm.months[step];
      this.vm.scrollIndex2=step;
      let thisMonth = Number(this.vm.selScroll2);
      if(thisMonth === 1 || thisMonth === 3 || thisMonth === 5 || thisMonth === 7 || thisMonth === 8 || thisMonth === 10 || thisMonth === 12){
        this.vm.days = this.spareDays.spare31;
      }else if(thisMonth === 4 || thisMonth === 6 || thisMonth === 9 || thisMonth === 11){
        this.vm.days = this.spareDays.spare30;
      }else{
        if(Number(this.vm.selScroll1) % 4 === 0){
          this.vm.days = this.spareDays.spare29;
        }else {
          this.vm.days = this.spareDays.spare28;
        }
      }
      if(Number(this.vm.selScroll3)>Number(this.vm.days[this.vm.days.length-1])){
        this.vm.selScroll3 = this.vm.days[this.vm.days.length-1];
        this.vm.scrollIndex3 = this.vm.days.length-1;
        this.$timeout(()=>{
          this.$ionicScrollDelegate.$getByHandle(this.vm.scroll3).scrollTo(0, this.vm.scrollIndex3 * 30, true);
          this.animation(this.vm.scroll3,this.vm.scrollIndex3);
        },100);
      }
    }else if(index === 1){
      this.vm.selScroll1=this.vm.years[step];
      this.vm.scrollIndex1=step;
      if(this.vm.selScroll2 === '02'){
        if(Number(this.vm.selScroll1) % 4 === 0){
          this.vm.days = this.spareDays.spare29;
        }else{
          this.vm.days = this.spareDays.spare28;
        }
        if(Number(this.vm.selScroll3)>Number(this.vm.days[this.vm.days.length-1])){
          this.vm.selScroll3 = this.vm.days[this.vm.days.length-1];
          this.vm.scrollIndex3 = this.vm.days.length-1;
          this.$timeout(()=>{
            this.$ionicScrollDelegate.$getByHandle(this.vm.scroll3).scrollTo(0, this.vm.scrollIndex3 * 30, true);
            this.animation(this.vm.scroll3,this.vm.scrollIndex3);
          },100);
        }
      }
    }
  }


  static get $inject() {
    return ['$scope','$ionicModal', '$timeout', '$ionicScrollDelegate'];
  }
}
