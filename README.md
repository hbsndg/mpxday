**mpxday**

基于mpx开发的天气预报微信小程序

前提
* 了解微信小程序整个架构、语法，参见[微信小程序官方文档](https://developers.weixin.qq.com/miniprogram/dev/framework/)

* 了解mpx架构、语法,参加[mpx官方文档](https://didi.github.io/mpx/)

* 本项目为了方便您学习掌握mpx

安装使用
```bash

# 打开项目文件夹
cd mpxday

# 安装mpx脚手架工具
npm i -g @mpxjs/cli

# 安装依赖包
npm install

# 注册高德地图开发者账号，获取key
修改/mpxday/src/weather.js文件，
var amapkey = '';//高德地图api开发者账号key

# 编译，会生成dist文件夹
npm run build

# 开发环境下运行，可以实时观察修改后的结果
npm run watch

# 使用微信开发者工具导入项目文件夹下dist中对应平台的文件夹即可预览效果。
```

运行后效果

![运行图片](http://i1.fuimg.com/720116/2ae4fd5c3821055a.png)


**感谢您的咖啡**

![感谢您的咖啡](http://i2.tiimg.com/720116/da636b46a59c1320.jpg)









