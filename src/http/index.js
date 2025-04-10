// 导入axios
import axios from 'axios'

const instance = axios.create({
  //后端url地址
  baseURL: 'http://127.0.0.1:3007',
  // baseURL: 'http://156.245.202.64:3007',
  timeout: 6000,   //设置超时
  // 设置请求头
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
});


// 添加的axios
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response.data;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });
  
// 向外暴露axios
export default instance