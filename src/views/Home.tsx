import React from 'react';
import { connect } from 'react-redux';
import { changeSongNum } from '../redux/actions/index';
import { songClasslist } from '../server/api';

function Home(props: any) {
	// console.log(props);
	console.log(songClasslist());
	// setTimeout(() => {
	// 	props.changeSongNum(props.selectSong.songNum + 1);
	// }, 1000);
	return (
		<div className="App">
			<header className="App-header">这是Homeyem {props.selectSong.songNum}</header>
		</div>
	);
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
