import Home from '../views/Home';
import Detail from '../views/Detail';
import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { createHashHistory } from 'history';
const history = createHashHistory();

class RouterConfig extends React.Component {
	render() {
		return (
			<Router history={history}>
				<Switch>
					<Route path="/" exact render={() => <Redirect to="/Page1/123" />} />
					<Route path="/Page1/:id" component={Home} />
					<Route path="/Page2" component={Detail} />
				</Switch>
			</Router>
		);
	}
}
export default RouterConfig;
