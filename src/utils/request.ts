import axios from 'axios';
// import Qs from 'qs';
// import { Toast } from 'vant';
// import store from '@/store'
// import { getToken, removeToken } from './token';
// import Toast from '../components/toast/Index';

// create an axios instance
const service = axios.create({
	// baseURL: process.env.REACT_APP_API,
	baseURL: 'https://test.jinghangapps.com/jingxiaoai',
	// baseURL: '',
	// withCredentials: true, // send cookies when cross-domain requests
	timeout: 15000, // request timeout
	// responseType: 'blob'
	headers: {
		// 'Content-Type': 'application/json;charset=UTF-8'
		'Content-Type': 'multipart/form-data'
	}
});

// request拦截器，每次发起请求都会调用这个方法
service.interceptors.request.use(
	config => {
		// config.headers['authorization'] = 'j ' + getToken();
		config.headers['authorization'] =
			'j eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6IjE4OTExODUxMTQzIiwiaWQiOjUwOTMsImlhdCI6MTYwMDU3NzczNCwiZXhwIjoxNjAzMTY5NzM0fQ.InNRVlaQc3GMaQ7xGbEcBJHQ0TxRmuV_CTZ6V3s-2Ps';
		// 通过post形式传参
		// if (xxxx) {
		// 	config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
		// 	config.data = Qs.stringify(config.data);
		// }
		//如果是鲸小爱app的接口，是通过FormData传参的，在这里统一处理下header头
		if (Object.prototype.toString.call(config.data) === '[object FormData]') {
			//后端接口要求是formData格式，更改下header
			config.headers['Content-Type'] = 'multipart/form-data';
		}
		return config;
	},
	error => {
		console.log(error); // for debug
		return Promise.reject(error);
	}
);

// response 拦截器
service.interceptors.response.use(
	response => {
		if (response.status === 200) {
			return response.data;
		}
	},
	error => {
		// Toast('请求错误：' + error)
		// console.log('err:' + error); // for debug
		return Promise.reject(error);
	}
);

// export default service;
function apiAxios(method: any, url: string, params: object | undefined): any {
	let formData = new FormData();
	if (params) {
		//如果传入的是数组，就讲数据转成formData
		for (let key in params) {
			formData.append(key, params[key]);
		}
	}
	// 开始执行查询操作
	return new Promise((resolve, reject) => {
		service({
			method: method,
			url: url,
			data: (method === 'POST' || method === 'PUT') && params ? formData : null, //post形式传传参
			params: method === 'GET' || method === 'DELETE' ? params : null //get形式传参
		})
			.then(function (res: any) {
				if (res.code === '200') {
					resolve(res);
				} else if (res.code === '403') {
					console.error('未登录：', res.msg);
					// removeToken();
					// Toast('登录信息未通过验证，请重新登录');
					// if (window.location.href.indexOf('register') > 0) return; //如果当前页是login则不再跳转
					//跳转到登录页面，并且带着上个页面的信息，支持会跳回去
					alert('未登录');
					// let redirect =
					// 	window.location.pathname + window.location.search + window.location.hash;
					// redirect = redirect.replace(process.env.BASE_URL, '/');
					// window.location.href = process.env.BASE_URL + `register?redirect=${redirect}`;
					// return response.data;
				} else {
					console.error('接口返回错误：', res);
					// Toast('请求错误：' + response.data.code + '----' + response.data.msg);
					reject(res);
				}
			})
			.catch(function (error) {
				window.console.log('接口网络错误', error, error.response);
				// Toast.error('网络请求失败，请返回上页重试');
				//判断是否断网，如果断网就去断网页面，不做其他处理了
				if (error.response) {
					// 请求已发出，但服务器响应的状态码不在 2xx 范围内,弹出错误信息
					console.error(error.response.status);
					// reject(error.response.status);
				} else {
					//超时的情况下，走这个
					window.console.log('Error', error.message);
					// reject(error);
				}
			});
	});
}

export default {
	get: function (url: string, params?: object): any {
		return apiAxios('GET', url, params);
	},
	post: function (url: string, params: object): any {
		return apiAxios('POST', url, params);
	},
	put: function (url: string, params: object): any {
		return apiAxios('PUT', url, params);
	},
	delete: function (url: string, params: object): any {
		return apiAxios('DELETE', url, params);
	}
};
