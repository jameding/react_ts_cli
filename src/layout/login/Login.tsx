import React from 'react';
import { connect } from 'react-redux';
import { Modal, Form, Input, Button, Row, Col } from 'antd';
import { FormInstance } from 'antd/lib/form';
import './Login.less';
import { sendSms, userLogin } from '../../server/api';

// 接口声明
export interface LoginProps {
	compiler?: string;
	framework?: string;
	selectSong?: object;
}
export interface LoginState {
	sms_code_status: number;
	countdown_seconds: number;
}
// 创建form对象
const formRef = React.createRef<FormInstance>();
// let form: any;
let validateType = ''; //触发验证的按钮是哪个：getCode、login
let register_status = true; //按钮开关防止重复点击
let interval: any; //倒计时的标记
let alreadyGetCode = false; //是否获取过验证码
// 组件类方法
class Login extends React.Component<LoginProps, LoginState> {
	constructor(props: any) {
		super(props);
		this.state = {
			sms_code_status: 0, //短信验证码获取状态，0未获取，1获取中，2再来一次
			countdown_seconds: 10 //倒计时秒
		};
	}
	componentDidMount() {}
	// 点击获取验证码或者登录按钮
	async onFinish(active: string) {
		if (!register_status) return; //如果按钮是关闭状态，直接忽略操作
		console.log('操作了', active);
		// 设置触发验证的按钮
		validateType = active;
		// 通过ref拿到form对象
		let form: any = formRef['current'];
		console.log('进入判断');
		try {
			const values = await form.validateFields();
			console.log('Success:', values);
			register_status = false; //关闭操作按钮，进行剩余操作
			if (validateType === 'getCode') {
				// 获取验证码操作
				this.getMobileCode(values.phone);
			} else {
				// 登录操作
				this.registerUser(values.phone, values.code);
			}
		} catch (errorInfo) {
			console.log('Failed:', errorInfo);
		}
	}
	//获取手机号验证码
	async getMobileCode(phone: string) {
		try {
			// 设置为获取中的装填
			this.setState({ sms_code_status: 1 });
			let res = await sendSms({ phoneNumber: phone });
			register_status = true; //打开操作按钮，可以再次进行网络请求了
			console.log('获取验证码的结果', res);
			if (res.code === '200') {
				alreadyGetCode = true; //设置为已经获取过验证码
				//获取成功，开始倒计时
				this.countdown();
			} else {
				//获取验证码错误
				this.setState({ sms_code_status: 2 });
				//登录错误
				console.error(res.msg);
			}
		} catch (error) {
			register_status = true; //打开操作按钮，可以再次进行网络请求了
			//获取验证码错误
			this.setState({ sms_code_status: 2 });
			//登录错误
			console.error('网络错误，请充实');
		}
	}
	//验证码倒计时方法
	countdown() {
		interval = setInterval(() => {
			if (this.state.countdown_seconds <= 0) {
				//如果倒计时结束，重置秒数和获取状态
				this.setState({ sms_code_status: 2, countdown_seconds: 60 });
				clearInterval(interval);
			} else {
				this.setState({ countdown_seconds: this.state.countdown_seconds - 1 });
			}
		}, 1000);
	}
	//点击开始注册用户
	async registerUser(phone: string, code: string) {
		console.log('开始登录', phone, code);
		//开始关闭验证码获取按钮，成功后开始计时
		register_status = false;
		try {
			let res = await userLogin({
				phoneNumber: phone,
				code: code
			});
			console.log('注册成功后的啊,', res);
			register_status = true; //打开操作按钮，可以再次进行网络请求了
			if (res.code === '200') {
				//保存token到cookie里
				// setToken(res.token);
				//去来源页面
				// if (this.$route.query && this.$route.query.redirect) {
				// 	let params = { ...this.$route.query };
				// 	delete params.redirect; //redirect字段是进入字段，也没啥用了
				// 	delete params.token; //因为token已经失效，如果路径里有token，直接删掉
				// 	this.$store.commit('user/set_user_load', true);
				// 	this.$router.replace({
				// 		path: this.$route.query.redirect,
				// 		query: params
				// 	});
				// } else {
				// 	console.log('来由来源页面，去首页面');
				// 	Toast('登录成功，重新进入网页进行操作');
				// }
			} else {
				//登录错误
				console.log('登录错误', res);
				// Toast(res.msg);
				register_status = true; //打开操作按钮，可以再次进行网络请求了
			}
		} catch (error) {
			// Toast('网络错误，请重试');
			console.log(error);
			register_status = true; //打开操作按钮，可以再次进行网络请求了
		}
	}
	render() {
		return (
			<Modal
				bodyStyle={{ padding: '40px 60px 50px' }}
				className={'login-page'}
				centered
				footer={null}
				visible={true}
				width={450}
				closable={false}
			>
				<div className={'tc'}>
					<img className={'login-icon'} src={require('../../assets/img/logo_2.png')} alt="" />
				</div>
				<Form name="basic" ref={formRef}>
					<Row className={'input-box mb30 mt50'}>
						<Col span={12}>
							<Form.Item
								name="phone"
								rules={[
									({ getFieldValue }) => ({
										validator(rule, value) {
											if (!value) {
												// 空的情况
												return Promise.reject('请输入手机号');
											} else {
												var myreg = /^[1][0-9][0-9]{9}$/;
												if (!myreg.test(value)) {
													return Promise.reject('请输入正确的手机号');
												} else {
													if (alreadyGetCode || validateType === 'getCode') {
														// 已经获取过验证码，通过考核
														return Promise.resolve();
													} else {
														// 没有获取过验证码，不考核
														return Promise.reject('请先获取验证码');
													}
												}
											}
										}
									})
								]}
							>
								<Input bordered={false} placeholder="请输入手机号" className={'input'} />
							</Form.Item>
						</Col>
						<Col span={12}>
							{this.state.sms_code_status === 1 ? (
								<div className={'get-code-button flex-ajc'}>
									（{this.state.countdown_seconds}）重新获取
								</div>
							) : (
								<div
									className={'get-code-button flex-ajc curpin'}
									onClick={() => {
										this.onFinish('getCode');
									}}
								>
									获取验证码
								</div>
							)}
						</Col>
					</Row>
					<Row className={'input-box mb50'}>
						<Col span={24}>
							<Form.Item
								name="code"
								rules={[
									({ getFieldValue }) => ({
										validator(rule, value) {
											// getFieldValue('phone')    // 获取手机号
											if (validateType === 'getCode') {
												// 这是获取验证码，所以不验证是否填写了验证码
												return Promise.resolve();
											} else {
												// 这是登录操作，要验证验证码是否填写
												if (value === undefined || value.length !== 4) {
													return Promise.reject('请输入4位验证码');
												} else {
													return Promise.resolve();
												}
											}
										}
									})
								]}
							>
								<Input bordered={false} placeholder="请输入验证码" className={'input'} />
							</Form.Item>
						</Col>
					</Row>
					<div className={'user-rule-box font-14-20'}>
						登录即表示你已经同意
						<a href="" target="_blank">
							《鲸小爱用户协议》
						</a>
					</div>
					<Button
						type="primary"
						onClick={() => {
							this.onFinish('login');
						}}
						className={'login-button wi mt10 button-primary'}
					>
						登录
					</Button>
				</Form>
			</Modal>
		);
	}
}

//【焦点】需要渲染什么数据
function mapState(state: any) {
	return {
		selectSong: state.selectSong
	};
}

export default connect(mapState, null)(Login);
