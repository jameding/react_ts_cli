// import axiosIns from './axiosIns'
import axiosIns from '../utils/request';

/**
 * 故事类2.0api接口
 */
// 故事课程列表页页面数据接口
export const courseListPageInfo = () => axiosIns.get(`/v3/chineseStory2/courseListPageInfo`);
// 故事课程详情页页面数据接口
export const courseDetailPageInfo = (data: object) => axiosIns.post(`/v3/chineseStory2/courseDetailPageInfo`, data);
// 故事课程详情观看统计
export const appendVideoWatchTime = (data: any) => axiosIns.post(`/v3/chineseStory2/appendVideoWatchTime`, data);
// 英语故事2.0购买订单页面数据
export const getChineseStory2GoodsInfo = (data: any) => axiosIns.post(`/v3/chineseStory2/getGoodsInfo`, data);

/**
 * 登录类api接口
 */
// 注册接口，获取验证码：phoneNumber
export const sendSms = (data: object) => axiosIns.post(`/sendSms`, data);
// 注册接口，通过验证码登录：code,phoneNumber
export const userLogin = (data: object) => axiosIns.post(`/userLogin`, data);
