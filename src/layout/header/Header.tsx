import React from 'react';
import { connect } from 'react-redux';
import Login from '../login/Login';
import './Header.less';
import { addEvent, removeEvent } from '../../utils/utils';

// 接口声明
export interface HeaderProps {
	compiler?: string;
	framework?: string;
	selectSong?: object;
}
export interface HeaderState {
	style: object;
}
// 初始化头部的透明度
const opacity = 0.29;
const scrollHeight = 900; //滚动到多高时候，变成不透明
// 组件类方法
class Header extends React.Component<HeaderProps, HeaderState> {
	constructor(props: any) {
		super(props);
		this.state = {
			style: {
				// backgroundColor: `rgba(28, 36, 51,`+opacity+')'
				backgroundColor: `rgba(0, 0, 0,` + opacity + ')'
			}
		};
		this.handleScroll = this.handleScroll.bind(this);
	}
	// 组件已经建立
	componentDidMount() {
		addEvent(window, 'scroll', this.handleScroll);
	}
	handleScroll = () => {
		//滚动条高度
		let scrollTop = document.documentElement.scrollTop; //滚动条滚动高度
		// 计算透明度
		scrollTop = scrollTop > 900 ? 900 : scrollTop < 0 ? 0 : scrollTop;
		let colorOpacity = opacity + ((1 - opacity) * scrollTop) / scrollHeight;
		this.setState({
			style: {
				// backgroundColor: `rgba(28, 36, 51,`+colorOpacity+')'
				backgroundColor: `rgba(0, 0, 0,` + colorOpacity + ')'
			}
		});
	};
	// 组件将要销毁
	componentWillUnmount() {
		removeEvent(window, 'scroll', this.handleScroll);
	}
	render() {
		return (
			<div className={'header-page wi'} style={this.state.style}>
				<Login></Login>
				<div className={'contaner he flex-ac'}>
					<a href="/">
						<img className={'logo-icon'} src={require('../../assets/img/logo_1.png')} alt="" />
					</a>
					<div className={'flex-1'}></div>
					<div className={'login-box he flex-ac'}>
						<div className={'login-button flex-ajc button'}>登录</div>
					</div>
				</div>
			</div>
		);
	}
}

//【焦点】需要渲染什么数据
function mapState(state: any) {
	return {
		selectSong: state.selectSong
	};
}

export default connect(mapState, null)(Header);
