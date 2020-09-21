import React from 'react';
import { connect } from 'react-redux';
import './VideoDetai.less'

class VideoDetai extends React.Component {
	constructor(props:any) {
		super(props);
		this.state = {};
	}
	render(){
		return (
			<div className={"video-detail-page"}>
				{/* 视频播放窗口 */}
				<div className={'contaner lesson-video-box he'}>
					<div className={'video-box he'}>
						<div className={'video-play'}>
							视频播放窗口
						</div>
						<div className={'video-info font-14-20'}>全36集
						<span>5089次观看</span></div>
					</div>
					<div className={'lesson-select he'}>
						{/* 视频名称，高度55px */}
						<div className={'lesson-video-name wi font-wei'}>用英语讲中国故事大课堂  第四季</div>
						{/* 如果购买了就不展示了，高度70px */}
						<div className={'lesson-video-buy wi clearfix'}>
							<div className={'lesson-price fl flex-ac'}><span>优惠价：</span><span>￥99</span></div>
							<div className={'lesson-buy-button fr button flex-ajc tc'}>购买课程</div>
						</div>
						{/* 选集列表 */}
						<div className={'lesson-list he'}>
							<div className={'lession-item free play'}>
								<img className={'free-buy-icon free-icon'} src={require('../../assets/img/free_icon.png')} alt=""/>
								<img className={'free-buy-icon buy-icon'} src={require('../../assets/img/buy_icon.png')} alt=""/>
								<div className={'lession-item-info'}>
									<span className={'lesson-num'}>第一集</span>
									<span className={'lesson-name'}>中国古风：竹之韵</span>
								</div>
							</div>
							<div className={'lession-item buy '}>
								<img className={'free-buy-icon free-icon'} src={require('../../assets/img/free_icon.png')} alt=""/>
								<img className={'free-buy-icon buy-icon'} src={require('../../assets/img/buy_icon.png')} alt=""/>
								<div className={'lession-item-info'}>
									<img className={'lesson-play'} src={require('../../assets/img/play_status.gif')} alt=""/>
									<span className={'lesson-num'}>第一集</span>
									<span className={'lesson-name'}>中国古风：竹之韵</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* 当前转移的名字 */}
				<div className={'contaner lesson-title-name flex-ac font-wei'}>
					<span>用英语讲中国故事大课堂  第四季：</span>
					<span className={'name'}>第一集  中国古风：竹之韵</span>
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

export default connect(mapState, null)(VideoDetai);
