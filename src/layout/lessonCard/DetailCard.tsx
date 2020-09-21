import React from 'react';
import './DetailCard.less';
import { numberToChinese } from '../../utils/utils';

// 接口声明
export interface DetailCardProps {
	coursesInfo: {
		pageUrl: string;
		viewTimes: number;
		videoCount: number;
		price: number;
		seasonNum: number;
		viewTimesStr: string;
		name: string;
		intro: string;
	};
}

function DetailCard(props: DetailCardProps) {
	return (
		<div className={'detail-card-page clearfix mb30 curpin'}>
			{/* 左边封面图 */}
			<div className={'lesson-img-box'}>
				<img className={'wi he'} src={props.coursesInfo.pageUrl} alt="" />
				<div className={'play-num flex-ajc' + (props.coursesInfo.viewTimes === 0 ? ' none' : '')}>
					{props.coursesInfo.viewTimesStr}次观看
				</div>
			</div>
			<div className={'lesson-info he flex-ac flex-col'}>
				<div className={'wi font-wei lesson-title line-clamp-2'}>
					{props.coursesInfo.name} 第{numberToChinese(props.coursesInfo.seasonNum)}季
				</div>
				<div className={'flex-1'}></div>
				<div className={'wi font-14-20'}>{props.coursesInfo.intro}</div>
				<div className={'wi font-14-20'}>
					<span>{props.coursesInfo.videoCount}集全｜</span>
					<span className={'price'}>
						¥{props.coursesInfo.price === 0 ? 0 : (props.coursesInfo.price / 100).toFixed(2)}
					</span>
				</div>
			</div>
		</div>
	);
}

export default DetailCard;
