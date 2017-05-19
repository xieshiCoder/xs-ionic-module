
# ionic公用组件
>本项目基于基于angular1.5.3和ionic1.3.2进行开发

## [github地址](https://github.com/xieshiCoder/xs-ionic-module)

## 安装

### Step One

```
npm install xs-ionic-module --save
或者：
npm install https://github.com/xieshiCoder/xs-ionic-module.git --save
```

### Step Two
```
import xsIonicModule from 'xs-ionic-module';
```

### Step Three
```
在需要的模块中对组件进行依赖
例：
angular.module('app',[xsIonicModule.xsCityPicker,         //地市滚动选择组件
  xsIonicModule.xsImgPreview,         //图片视频展示组件
  xsIonicModule.xsImgSlide,           //图片全屏滑动展示组件
  xsIonicModule.xsImgLazyLoad])       //列表图片懒加载
```

## 使用

### 1、地市滚动选择组件使用
>参数说明和演示：  

 ![参数说明](https://github.com/xieshiCoder/xs-ionic-module/blob/master/Screenshot/citypicker2.png) ![演示](https://github.com/xieshiCoder/xs-ionic-module/blob/master/Screenshot/citypicker1.gif)     
```
核心代码：
<xs-city-picker tag='-' cancel-text='取消' confirm-text='确定' title='地市选择' sel-val='$myController.selVal'></xs-city-picker>

```
### 2、图片视频展示组件
![演示](https://github.com/xieshiCoder/xs-ionic-module/blob/master/Screenshot/lazyload.gif)
```
核心代码
<xs-img-lazy-load delegate-handle="newsScroll" img-url="{{mynew.thumbnail_pic_s}}"></xs-img-lazy-load>

示例代码：
<ion-view view-title="登录" class="login-view">
  <style>
    .klitem{
      width: 95%;
      display: flex;
      height: 120px;
      margin: 0 auto;
      border-bottom: 1px solid #ccc;
    }
    .klitem .lazy-left{
      width: 120px;
    }
    .klitem .lazy-right{
      flex:1;
      padding:10px 0;
      position: relative;
    }
    .klitem .lazy-right .title{
      font-size: 16px;
      font-weight: 400;
      margin: 0;
      padding: 0;
      color: #000;
      position: absolute;
      left: 0;
      top:12px;
    }
    .klitem .lazy-right .author{
      position: absolute;
      bottom: 15px;
      left: 0;
    }
    .klitem .lazy{
      height: 100px;
      width: 100px;
      margin-top: 10px;
      margin-left: 10px;
      border: 1px solid #ccc;
    }

  </style>
  <ion-content delegate-handle="newsScroll" on-scroll-complete="$login.complete()">
    <div class='klitem' ng-repeat="mynew in $login.news">
      <div class="lazy-left">
        <xs-img-lazy-load class="lazy" delegate-handle="newsScroll" img-url="{{mynew.thumbnail_pic_s}}"></xs-img-lazy-load>
      </div>
      <div class="lazy-right">
        <div class="title">{{mynew.title}}</div>
        <div class="author">{{mynew.author_name}}</div>
      </div>
    </div>
  </ion-content>
</ion-view>
```
### 3、图片全屏滑动展示组件

### 4、列表图片懒加载

