import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './style/main.less';
// import App from './views/App';
import * as serviceWorker from './serviceWorker';
import RouterConfig from './router/index';
import store from './redux/store/index';
// console.log(process.env);

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterConfig />
		</Provider>
	</React.StrictMode>,
	// <React.StrictMode>
	// 	<App />
	// </React.StrictMode>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
