import Home from '../views/Home';
import Detail from '../views/Detail';
import React from 'react';
import { Router, Route, Switch, Redirect} from 'react-router-dom';
import { createHashHistory } from 'history';
const history = createHashHistory();

class RouterConfig extends React.Component {
	render() {
		return (
			<Router history={history}>
				<Switch>
					<Route path="/" exact render={() => <Redirect to="/home" />} />
					<Route path="/home" component={Home} />
					<Route path="/detail/:id" component={Detail} /> 
				</Switch>
			</Router>
		);
	}
}
export default RouterConfig;
