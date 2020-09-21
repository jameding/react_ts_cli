import React from 'react';
import { connect } from 'react-redux';
import './style/Home.less';
import Header from '../layout/header/Header';
import Footer from '../layout/footer/Footer';
import HomeCard from '../layout/lessonCard/HomeCard';
import { HomeCardProps } from '../layout/lessonCard/HomeCard';
import { changeSongNum } from '../redux/actions/index';
import { courseListPageInfo } from '../server/api';
import { Skeleton } from 'antd';

// 接口声明
export interface DetailProps {}
export interface DetailState {
	topicVideoInfo: object;
	seasonList: Array<HomeCardProps['seasonInfo']>;
	loading: boolean;
}
class Home extends React.Component<DetailProps, DetailState> {
	constructor(props: any) {
		super(props);
		this.state = {
			topicVideoInfo: {},
			seasonList: [
				{
					seasonNum: 1,
					videoList: []
				}
			],
			loading: true
		};
	}
	// 将要加载页面模块
	componentWillMount() {
		this.courseListPageInfo();
	}
	async courseListPageInfo() {
		try {
			let res = await courseListPageInfo();
			console.log('故事列表数据', res);
			if (res.code === 200) {
				this.setState({
					loading: false,
					topicVideoInfo: res.data.topicVideoInfo,
					seasonList: res.data.seasonList
				});
			} else {
				console.log('查询错误', res);
			}
		} catch (e) {
			console.log('查询错误');
		}
	}
	render() {
		return (
			<div className={'home-page'}>
				<Header></Header>
				<div className={'contaner tc'}>
					<img className={'top-font-icon'} src={require('../assets/img/home_banner_font.png')} alt="" />
					<div className={'top-video-box'}></div>
				</div>
				<div className={'contaner home-lesson-list clearfix'}>
					<div className={'lession-title flex-ajc'}>全部课程</div>
					{this.state.seasonList.map((item, index) => (
						<Skeleton
							key={index}
							loading={this.state.loading}
							className={'mb30'}
							avatar={{ size: 100, shape: 'square' }}
							title={{ width: 200 }}
							paragraph
							active
						>
							<HomeCard key={index + 'ss'} seasonInfo={item}></HomeCard>
						</Skeleton>
					))}
				</div>
				<Footer></Footer>
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
function mapDispatch(dispatch: any, props: any) {
	return {
		changeSongNum: (num: number) => dispatch(changeSongNum(num))
	};
}

export default connect(mapState, mapDispatch)(Home);
