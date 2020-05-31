import Axios from 'axios';
import * as com from "@/common/js/common";
var amapkey = 'aae6dedce5ce28720ce3b24af85e83bf';
/**
 * IP定位API获取当前大致所在城市，使用高德地图api
 * @return object  返回promise对象
 */
var getCurrentPositionByIP = () => {
    const url = 'https://restapi.amap.com/v3/ip?key='+amapkey;
    return new Promise((resolve, reject) => {
        Axios.get(url).then(res => {
            res = res.data
            resolve(res);
        });
    });
}


/**
 * 获取全国所有县级、市、区json对象
 * @return object  返回promise对象
 */
var getAllCity = () => {
    return Axios.get('/api/citycode');
}

/**
 * 获取全国所有县级、市、区名称、拼音
 * @return object  返回promise对象
 */
var getAllCityInfo = (key) => {
    if (com.queryData(key)) {
        return new Promise(resolve => {
            resolve(com.queryData(key));
        });
    } else {
        return new Promise(resolve => {
            Axios.get('https://mainsite-restapi.ele.me/v1/cities?type=group').then(res => {
                com.addData(key, res.data)
                resolve(res.data);
            });
        });
    }
}

/**
 * 获取所有热门城市
 * @return object  返回promise对象
 */
var getHotCityInfo = (key) => {
    if (com.queryData(key)) {
        return new Promise(resolve => {
            resolve(com.queryData(key));
        });
    } else {
        return new Promise(resolve => {
            Axios.get('https://mainsite-restapi.ele.me/v1/cities?type=hot').then(res => {
                com.addData(key, res.data)
                resolve(res.data);
            });
        });
    }
}

/**
 * 根据城市代码请求相应城市的天气信息
 * @param  城市代码
 * @return object  返回promise对象
 */
var getWeatherByCityCode = (code) => {
    let URL = "http://wthrcdn.etouch.cn/weather_mini?citykey=" + code;
    return Axios.get(URL);
}


/**
 * 根据城市名称获取天气信息
 * @param cityName  城市名
 * @return Promise
 */
var getWeatherInfo = (cityName) => {
    return new Promise((resolve, reject) => {
        // 等两个函都获取到数据
        Axios.all([getAllCity(), getCurrentPositionByIP()])
            .then(Axios.spread(function(city, position) {
                let citys = city.data.data;
                let cityNameByIp = '';
                if(cityName !== undefined && cityName !== '' && cityName !== null) {
                  cityNameByIp = cityName;
                }else {
                  cityNameByIp = position.city;
                }
                position.city;
                let weatherData = '';
                // 遍历城市json对象获取城市代码
                citys.zone.forEach(province => {
                    province.zone.forEach(city => {
                        city.zone.forEach(area => {
                            if (cityNameByIp.includes(area.name)) {
                                // 根据城市代码获取天气信息
                                getWeatherByCityCode(area.code).then(data => {
                                    resolve(data.data.data);
                                });
                            }

                        });
                    });
                })
            }));
    });
}

export { getWeatherInfo, getAllCityInfo, getHotCityInfo };
