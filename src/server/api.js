// import axiosIns from './axiosIns'
import axiosIns from '../utils/request';

// 拼音搜索歌曲列表
export const songSearchbypy = data => axiosIns.get(`song/searchbypy`, data);
// 分类搜索歌曲列表
export const songGetClassifiedSongList = data => axiosIns.get(`song/getClassifiedSongList`, data);
// 歌曲分类列表
export const songClasslist = data => axiosIns.get(`song/classlist`, data);
// 歌手分类列表
export const artistClasslist = data => axiosIns.get(`artist/classlist`, data);
// 分类歌曲列表接口
export const getClassifiedSongList = data => axiosIns.get(`song/getClassifiedSongList`, data);
// 歌曲详情接口
export const getSongInfoV2 = data => axiosIns.get(`song/getSongInfoV2`, data);
// 发送验证码接口
export const userSendcode = data => axiosIns.get(`user/sendcode`, data);
// 获取用户信息接口
export const userAccountinfo = data => axiosIns.get(`user/accountinfo`, data);
// 用验证码进行注册登录接口
export const userCheckAccountByPhone = data => axiosIns.get(`user/checkAccountByPhone`, data);
// 获取支付的商品列表
export const orderProduct = data => axiosIns.get(`order/product`, data);
// 获取支付二维码
export const orderPaylistwithcode = data => axiosIns.get(`order/paylistwithcode`, data);
// 获取支付结果
export const orderGetpayinfo = data => axiosIns.post(`order/getpayinfo`, data);
// 按照歌手搜索歌曲
export const artistGetArtistSongList = data => axiosIns.get(`artist/getArtistSongList`, data);
// 获取文件内容
export const getLinkData = ({ link, data }) => axiosIns.get(link, data);
export const postLinkData = ({ link, data }) => axiosIns.post(link, data);

// account_id: 700000002
// avatar: ""
// is_vip: 0
// nickname: "18911851150"
// phone: "18911851150"
// token: "06050ac0248d8b0e50619dcb23d20d71"
// vip_expiry_date: ""
// weixin_openid: ""
