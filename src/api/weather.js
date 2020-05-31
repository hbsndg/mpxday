import request from '../utils/request';
var amapkey = '';//先注册高德地图api开发者账号，获取key

export default class Devices {
  // 获取装置列表
  static getCurrentPositionByIP(data) {
    return request.get('https://restapi.amap.com/v3/ip',{
      key: amapkey
    });
  }
  // 获取全国所有县级、市、区名称、拼音
  static getAllCityInfo() {
    return request.get('https://mainsite-restapi.ele.me/v1/cities', {
      type: 'group'
    })
  }

  // 获取热门城市
  static getHotCityInfo() {
    return request.get('https://mainsite-restapi.ele.me/v1/cities', {
      type: 'hot'
    })
  }

  // 根据城市编码获取天气信息
  static getWeatherByCityCode(code, extensions) {
    return request.get('https://restapi.amap.com/v3/weather/weatherInfo', {
      key: amapkey,
      city: code,
      extensions: extensions
    })
  }
}
