import React from 'react';
import Header from '../layout/header/Header';
import Footer from '../layout/footer/Footer';
import DetailCard from '../layout/lessonCard/DetailCard';
import VideoDetai from '../layout/videoPlay/VideoDetai';
import { addEvent, removeEvent } from '../utils/utils';
import { courseDetailPageInfo } from '../server/api';
import './style/Detail.less';

// 接口声明
export interface DetailProps {}
export interface DetailState {
	videoRefs: any;
	fixedTop: boolean;
	coursesRecommend: [];
	seasonInfo: object;
}

let scrollHeight = 0; //滚动到多高时候，变成不透明
class Detail extends React.Component<DetailProps, DetailState> {
	constructor(props: any) {
		super(props);
		this.state = {
			videoRefs: React.createRef(),
			fixedTop: false,
			coursesRecommend: [],
			seasonInfo: {}
		};
		this.handleScroll = this.handleScroll.bind(this);
	}
	// 将要加载页面模块
	componentWillMount() {
		this.courseDetailPageInfo();
	}
	// 更新后
	componentDidMount() {
		scrollHeight = this.state.videoRefs.current.scrollHeight;
		addEvent(window, 'scroll', this.handleScroll);
	}
	//获取详情数据
	async courseDetailPageInfo() {
		try {
			let res = await courseDetailPageInfo({ videoId: 1 });
			console.log('故事详情数据', res);
			this.setState({
				coursesRecommend: res.coursesRecommend
			});
		} catch (e) {
			console.log('查询错误');
		}
	}
	handleScroll = () => {
		//滚动条高度
		let scrollTop = document.documentElement.scrollTop + 60; //滚动条滚动高度
		if (scrollTop >= scrollHeight && !this.state.fixedTop) {
			this.setState({
				fixedTop: true
			});
		} else if (scrollTop < scrollHeight && this.state.fixedTop) {
			this.setState({
				fixedTop: false
			});
		}
	};
	// 组件将要销毁
	componentWillUnmount() {
		removeEvent(window, 'scroll', this.handleScroll);
	}
	render() {
		return (
			<div className="detail-page">
				<Header></Header>
				<div ref={this.state.videoRefs}>
					<VideoDetai></VideoDetai>
				</div>
				<div className={'contaner mt30 detail-content clearfix'}>
					<div className={'content-left'}>
						<div className={'content-title mb10 font-wei'}>课程亮点</div>
						<img className={'wi mb30'} src={require('../assets/img/detail/bright_spot.png')} alt="" />
						<div className={'content-title mb10 font-wei'}>课程详情</div>
						<img className={'wi'} src={require('../assets/img/detail/detail_1.png')} alt="" />
						<img className={'wi'} src={require('../assets/img/detail/detail_2.png')} alt="" />
						<img className={'wi'} src={require('../assets/img/detail/detail_3.png')} alt="" />
						<img className={'wi'} src={require('../assets/img/detail/detail_4.png')} alt="" />
						<img className={'wi'} src={require('../assets/img/detail/detail_5.png')} alt="" />
						<img className={'wi'} src={require('../assets/img/detail/detail_6.png')} alt="" />
						<img className={'wi'} src={require('../assets/img/detail/detail_7.png')} alt="" />
						<img className={'wi'} src={require('../assets/img/detail/detail_8.png')} alt="" />
						<img className={'wi'} src={require('../assets/img/detail/detail_9.png')} alt="" />
						<img className={'wi'} src={require('../assets/img/detail/detail_10.png')} alt="" />
					</div>
					<div className={'content-right' + (this.state.fixedTop ? ' fixed-top' : '')}>
						<div className={'content-title mb10 font-wei'}>相关推荐</div>
						{this.state.coursesRecommend.map((item, index) => (
							<DetailCard coursesInfo={item} key={index}></DetailCard>
						))}
					</div>
				</div>
				<Footer></Footer>
			</div>
		);
	}
}

export default Detail;
