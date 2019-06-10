import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { userActions } from '../actions';

export class HomePage extends Component {

    _logout = (e) => {
        e.preventDefault()
        this.props.dispatch(userActions.logout())
        this.props.history.push('/')
    }

    render() {
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2 align="center">Welcome! You have successfully logged in.</h2>
                <p align="center">
                <Link to={'/login'} onClick={e => this._logout(e)}>Logout</Link>
                </p>
            </div>
        );
    }
}

function mapStateToProps({ authentication }) {
    const { loggedIn } = authentication
    return { loggedIn }    
};

export default connect()(HomePage)
