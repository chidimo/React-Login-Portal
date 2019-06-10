import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { PrivateRoute } from './PrivateRoute.js';
import { history } from './helpers';
// import { alertActions } from './actions';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import ErrorBoundary from './components/ErrorBoundary';

export class App extends React.Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        history.listen((location, action) => {
        });
    }

    render() {
        return (
            <Router history={history}>
              <div className="container">
                  <div className="col-sm-8 col-sm-offset-2">
                        <Switch>
                            <PrivateRoute exact path='/' component={ HomePage } />
                            <Route exact path='/register' component={ RegisterPage } />
                            <Route exact path='/login' component={ LoginPage } />
                            <Route component={ErrorBoundary}/>
                        </Switch>
                  </div>
              </div>
            </Router>
        );
    }
}

function mapStateToProps({ alert }) {
    return { alert };
}

export default connect(mapStateToProps)(App)
