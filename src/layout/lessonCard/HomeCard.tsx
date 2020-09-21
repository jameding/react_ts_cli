import React from 'react';
import './HomeCard.less';
import { numberToChinese } from '../../utils/utils';
import { Button } from 'antd';
import { CaretRightFilled } from '@ant-design/icons';

// 接口声明
export interface HomeCardProps {
	seasonInfo: {
		pageUrl?: string;
		name?: string;
		mainTeacherName?: string;
		seasonNum: number;
		videoList: [];
	};
}

export default function HomeCard(props: HomeCardProps) {
	// 筛选出展示的剧集
	// eslint-disable-next-line array-callback-return
	const showVideoList = props.seasonInfo.videoList.filter((item, index) => {
		if (props.seasonInfo.videoList.length > 14) {
			if (item['episodeNum'] <= 10) {
				return true;
			} else if (props.seasonInfo.videoList.length - item['episodeNum'] < 4) {
				return true;
			} else {
				return false;
			}
		} else {
			return true;
		}
	});
	return (
		<div className={'home-card-page'}>
			<div className={'mb10 font-wei font-20-28'}>第{numberToChinese(props.seasonInfo.seasonNum)}季</div>
			<div className={'card-content flex-ac'}>
				<div className={'card-cover he'}>
					<img className={'wi he'} src={props.seasonInfo.pageUrl} alt="" />
					<div className={'less-num wi font-14-20 flex-ac tr'}>{props.seasonInfo.videoList.length}集全</div>
				</div>
				<div className={'card-info flex flex-col flex-1 he'}>
					<div className={'card-name font-wei font-20-28'}>{props.seasonInfo.name}</div>
					<div className={'flex mt10'}>
						<div className={'lesson-num flex-ajc'}>第{numberToChinese(props.seasonInfo.seasonNum)}季</div>
						<div className={'flex-1'}></div>
					</div>
					<div className={'protagonist font-14-20 mt10'}>领先主讲：{props.seasonInfo.mainTeacherName}</div>
					{/* 集数列表 */}
					<div className={'lesson-item-list'}>
						{showVideoList.map((item, index) => {
							return (
								<div
									className={'lesson-iten fl flex-ajc' + (item['isFree'] ? ' free' : ' buy')}
									key={index}
								>
									{props.seasonInfo.videoList.length > 14 && item['episodeNum'] === 10
										? '...'
										: item['episodeNum']}
									<img className={'buy-icon'} src={require('../../assets/img/buy_icon.png')} alt="" />
									<img
										className={'free-icon'}
										src={require('../../assets/img/free_icon.png')}
										alt=""
									/>
								</div>
							);
						})}
					</div>
					<div className={'flex-1'}></div>
					{props.seasonInfo['lastWatchEpisodeNum'] !== 0 ? (
						<div className={'look-location'}>
							观看至{props.seasonInfo['lastWatchEpisodeNum']}集{' '}
							{props.seasonInfo['lastWatchProgressValue']}
						</div>
					) : (
						''
					)}
					<div className={'look-active mt5 flex'}>
						<Button className={'go-to-look button-primary'} type="primary">
							{/* 是否限制播放按钮 */}
							{props.seasonInfo['lastWatchEpisodeNum'] === 0 ? (
								<>
									<CaretRightFilled style={{ marginRight: '5px' }} />
									立即观看
								</>
							) : (
								'继续观看'
							)}
						</Button>
						<div className={'look-num' + (props.seasonInfo['viewTimes'] > 0 ? '' : ' none')}>
							{props.seasonInfo['viewTimesStr']}次观看
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
