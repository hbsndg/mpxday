import mpx from '@mpxjs/core';
import mpxFetch from '@mpxjs/fetch';

mpx.use(mpxFetch);
// 请求拦截器
mpx.xfetch.interceptors.request.use(function(config) {
});

// 处理后台返回数据
function handlerResponseData(response) {
  return response.data;
}

// 判断请求是否成功
function isSuccess(response) {
  return (response.statusCode === 200);
}

// 请求成功拦截器
function interceptorsResponse(response) {
  const responseData = handlerResponseData(response);
  if (isSuccess(response)) {
    return responseData;
  } else {
    return Promise.reject(responseData);
  }
}

mpx.xfetch.interceptors.response.use(interceptorsResponse);

const request = {
  done(url, data = {}, type = 'get') {
    return mpx.xfetch.fetch({
      url: url,
      method: type,
      data: data
    });
  },
  post(url, data = {}) {
    return request.done(url, data, 'POST');
  },
  get(url, data = {}) {
    return request.done(url, data, 'GET');
  }
};

export default request;
